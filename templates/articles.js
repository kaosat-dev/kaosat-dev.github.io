// TODO: filter list of displayed articles by criteria ?

const articlesTemplate = (siteMeta, content, meta) => {
  // console.log('siteMeta', siteMeta.articles, siteMeta)
  // const maxArticles = 5

  const dateSort = (a, b) => {
    let date1 = a.date
    let date2 = b.date
    // date1 = date1.split('-')
    // date2 = date2.split('-')
    // date1 = date1.split('-').reverse().join('')
    // date2 = date2.split('-').reverse().join('')
    return date2.localeCompare(date1)
  }

  const articlesList = siteMeta.articles
    .filter(a => !('archived' in a))
    .sort(dateSort)
    .map(a => {
      return `
    <li>
    <span>${a.date}</span> <a href='${a.fullPath}'>${a.title}</a>
    </li>`
    }).join('')

  const archivesList = siteMeta.articles
    .filter(a => 'archived' in a)
    .sort(dateSort)
    .map(a => {
      return `
    <li>
    <span>${a.date}</span> <a href='${a.fullPath}'>${a.title}</a>
    </li>`
    }).join('')

  const tagsList = siteMeta.tags.map(t => {
    return `
    <li>
    <span> <a href='/pages/articles.html?tag=${t}'>${t} (${siteMeta.tagOccurences[t]})</a> </span>
    </li>`
  }).join('')
  //  <a href='/posts/${a.path}'>${a.title}</a>
  // <button>Load more ...</button>
  return `<div class='articles'>
    <h2>
    Articles: 
    </h2>
    <ul class='articlesList'>
      ${articlesList}
    </ul>
    <h2>
    Archives: 
    </h2>
    <ul class='articlesList'>
      ${archivesList}
    </ul>
    <h2>
    Tags: 
    </h2>
    <ul class='tagsList'>
      ${tagsList}
    </ul>

    <script>
      const url = new URL(window.location);
      const queryTag = url.searchParams.get('tag')
      console.log('bla bla', queryTag)
    </script>
  </div>`
}

module.exports = articlesTemplate
