const marked = require('marked')
const fs = require('fs')
const path = require('path')
const fm = require('front-matter')
const mainTemplate = require('../../templates/main')

const flatten = arr => [].concat(...arr)
const recurseFindPosts = dir => {
  const subDirs = fs.readdirSync(dir)
    .filter(e => fs.statSync(path.join(dir, e)).isDirectory())
  // .filter(e => fs.existsSync(path.join(dir, e, 'index.md')))
  const sub = subDirs.map(subDir => recurseFindPosts(path.join(dir, subDir)))
  const curPostMd = path.join(dir, 'index.md')

  if (fs.existsSync(curPostMd)) {
    return { path: curPostMd, name: path.basename(dir) }
  }
  return sub
}

const postsDir = '/home/ckaos/dev/perso/blog/kaosat-net/posts'
const postsList = flatten(recurseFindPosts(postsDir))
/* fs.readdirSync(postsDir)
  .filter(e => fs.statSync(path.join(postsDir, e)).isDirectory())
  .filter(e => fs.existsSync(path.join(postsDir, e, 'index.md'))) */

const pagesDir = '/home/ckaos/dev/perso/blog/kaosat-net/pages'
const pagesList = fs.readdirSync(pagesDir)
  .filter(e => path.extname(e) === '.md')
console.log('postsList', postsList)
console.log('pagesList', pagesList)

// console.log('FOOOOO', flatten(recurseFindPosts(postsDir)))

const siteMeta = {
  name: 'Kaosat.net',
  description: 'Programming, 3d printing, Gardening, Aquaponics, and lots more',
  navigationEntries: [
    'projects',
    'articles',
    'about'
    // 'contact'
  ],
  authors: [
    {
      name: 'Mark "kaosat-dev" Moissette',
      bio: `
        Dad, living in Germany, gardener of code & plants.
        Passion for 3d (webgl, printing), at the service of actual things (food, health, building etc).
        
        Shamelessly enthusiastic javascripter , occasional C++, Pythonista, Elixir, etc
        
        One of the main developpers/maintainers of https://github.com/jscad/OpenJSCAD.org and proud of it :)
        
        Increasingly minimalist.
        Love people, love to talk :)
      `,
      social: [
        { type: 'email',
          url: 'contact@kaosat.net'
        },
        { type: 'github',
          url: 'https://github.com/kaosat-dev'
        }
      ]
    }
  ],
  tags: [],
  tagOccurences: {}, // occurences per tag
  projects: ['jscad', 'garden'] // tags for projects,
}

// to get metadata etc from a post/page
const processPostMeta = (postDirName, postPath) => {
  // console.log('processPostMeta', postDirName, postPath)
  const data = fs.readFileSync(postPath, 'utf8')
  const content = fm(data)

  const postMeta = content.attributes
  const postTags = postMeta.tags || []
  postTags.forEach(t => {
    siteMeta.tagOccurences[t] = siteMeta.tagOccurences[t] ? siteMeta.tagOccurences[t] + 1 : 1
  })
  const tags = [...new Set(siteMeta.tags.concat(postTags))]
  siteMeta.tags = tags

  postMeta.path = postDirName
  postMeta.fullPath = '/posts/' + path.dirname(postPath).split('/posts/')[1]
  return postMeta
}

// for the output generation
const processPost = (postDirName, postPath) => {
  // console.log('postPath', postPath, postDirName)
  const data = fs.readFileSync(postPath, 'utf8')
  const content = fm(data)

  // console.log('body', content.body)
  // console.log('attributes', content.attributes)
  const postMeta = content.attributes
  // const tags = [...new Set(siteMeta.tags.concat(postMeta.tags))]
  // siteMeta.tags = tags

  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code) {
      return require('highlight.js').highlightAuto(code).value
    },
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
  })

  const postHtml = `<div class='markdown-body'>
  <span>
  ${postMeta.date}
 </span>
  ${marked(content.body)}
  </div>`

  const postTemplate = mainTemplate(siteMeta, postHtml, postMeta)
  const outputFileName = `${path.dirname(postPath)}/index.html`
  fs.writeFileSync(outputFileName, postTemplate)
  console.log('generated', outputFileName)
}

const processPage = (pageFileName, pagePath) => {
  // console.log('pagePath', pageFileName, pagePath)
  const data = fs.readFileSync(pagePath, 'utf8')
  const content = fm(data)

  // console.log('body', content.body)
  // console.log('attributes', content.attributes)
  const postMeta = content.attributes
  const tags = [...new Set(siteMeta.tags.concat(postMeta.tags))]
  siteMeta.tags = tags.filter(t => t !== undefined)

  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code) {
      return require('highlight.js').highlightAuto(code).value
    },
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
  })

  let template = (siteMeta, pageHtml, postMeta) => `<div>
  ${pageHtml}
  </div>`
  if (postMeta.template) {
    console.log('USING', postMeta.template)
    try {
      template = require(`../../templates/${postMeta.template}`)
    } catch (error) {

    }
  }

  const pageHtml = template(siteMeta, marked(content.body), postMeta)

  const wrapperTemplate = mainTemplate(siteMeta, pageHtml, postMeta)
  const outputFileName = `pages/${pageFileName.split('.')[0]}.html`
  fs.writeFileSync(outputFileName, wrapperTemplate)
  console.log('generated', outputFileName)
}
/// //////////
siteMeta.articles = postsList.map(p => processPostMeta(p.name, p.path))

/// //////////
postsList.forEach(post => {
  processPost(post.name, post.path)
})

pagesList.forEach(page => {
  processPage(page, path.join(pagesDir, page))
})
