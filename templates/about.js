const aboutTemplate = (siteMeta, content, meta) => {
  // console.log('siteMeta', siteMeta.articles, siteMeta)
  //  <a href='/posts/${a.path}'>${a.title}</a>
  // <button>Load more ...</button>
  //${siteMeta.authors[0].bio}
  return `<div class='about'>
    ${content}
  </div>`
}

module.exports = aboutTemplate
