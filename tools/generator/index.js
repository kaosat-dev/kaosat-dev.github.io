const marked = require('marked')
const fs = require('fs')
const path = require('path')
const fm = require('front-matter')
const lunr = require('lunr')

const mainTemplate = require('../../templates/main')
const siteMeta = require('../../data/config')
const rootDir = '/home/ckaos/dev/perso/blog/kaosat-net/'
let documents = []

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

const postsDir = path.join(rootDir, 'posts')
const postsList = flatten(recurseFindPosts(postsDir))
/* fs.readdirSync(postsDir)
  .filter(e => fs.statSync(path.join(postsDir, e)).isDirectory())
  .filter(e => fs.existsSync(path.join(postsDir, e, 'index.md'))) */

const pagesDir = path.join(rootDir, 'pages')
const pagesList = fs.readdirSync(pagesDir)
  .filter(e => path.extname(e) === '.md')
// console.log('postsList', postsList)
console.log('pagesList', pagesList)

// console.log('FOOOOO', flatten(recurseFindPosts(postsDir)))

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
  const data = fs.readFileSync(postPath, 'utf8')
  const content = fm(data)

  const postMeta = content.attributes
  // const tags = [...new Set(siteMeta.tags.concat(postMeta.tags))]
  // siteMeta.tags = tags

  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: (code) => {
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
  // add content to documents
  const fullPath = '/posts/' + path.dirname(postPath).split('/posts/')[1] + '/index.html'
  documents.push({
    id: documents.length,
    name: postPath,
    path: fullPath,
    text: content.body,
    tags: postMeta.tags.join(' ')
  })
}

const processPage = (pageFileName, pagePath) => {
  const data = fs.readFileSync(pagePath, 'utf8')
  const content = fm(data)

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
    // console.log('USING', postMeta.template)
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

// special case for index
if (pagesList.includes('index.md')) {
  fs.copyFileSync(path.join(pagesDir, 'index.html'), path.join(rootDir, 'index.html'))
}
// special case for 404
if (pagesList.includes('404.md')) {
  fs.copyFileSync(path.join(pagesDir, '404.html'), path.join(rootDir, '404.html'))
}
// special case for searchResults
if (pagesList.includes('searchResults.md')) {
  fs.copyFileSync(path.join(pagesDir, 'searchResults.html'), path.join(rootDir, 'searchResults.html'))
}

// generating index for searching
const searchIndex = lunr(function () {
  // this.ref('id')
  this.ref('path')
  this.field('name')
  this.field('text')
  this.field('tags')

  documents.forEach(function (doc) {
    this.add(doc)
  }, this)
})

fs.writeFileSync('./searchIndex', JSON.stringify(searchIndex))
// just a test
// console.log('SEAAARCH', searchIndex.search('plant'))

// for resumes
try {
  const resumeTemplate = require(`../../templates/resume`)
  const resumes = ['en', 'de', 'fr']
  resumes.forEach(lang => {
    const resume = require(`../../data/resume/resume.${lang}.json`)
    const html = resumeTemplate(siteMeta, undefined, { resume })
    fs.writeFileSync(`./pages/resume-${lang}.html`, html)
  })
} catch (error) {
  console.error('failed to generate resume', error)
}
