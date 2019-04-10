const articlesTemplate = (siteMeta, content, meta) => {

  console.log('siteMeta', siteMeta.articles)
  // const maxArticles = 5
  const articlesList = siteMeta.articles.map(a => {
    return `
    <li>
    <span>${a.date}</span> <a href='/posts/${a.path}'>${a.title}</a>
    </li>`
  }).join('')
  // <button>Load more ...</button>
  return `<div class='articles'>
    <ul>
      ${articlesList}
    </ul>
    
  </div>`
}

module.exports = articlesTemplate
