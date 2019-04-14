const indexTemplate = (siteMeta, content, meta) => {
  //  <a href='/posts/${a.path}'>${a.title}</a>
  // <button>Load more ...</button>
  // ${siteMeta.authors[0].bio}
  // profile on github  my cv Cv  core dev of jscad  mentor for kids at CoderDojo
  const articlesCount = 3
  const dateSort = (a, b) => {
    let date1 = a.date
    let date2 = b.date
    return date2.localeCompare(date1)
  }

  const articlesList = siteMeta.articles
    .filter(a => !('archived' in a))
    .sort(dateSort)
    .slice(0, articlesCount)
    .concat([
      { date: '', fullPath: '/pages/articles', title: '...more' }
    ])
    .map(a => {
      return `
    <li>
    <span>${a.date}</span> <a href='${a.fullPath}'>${a.title}</a>
    </li>`
    })
    .join('')

  const projectsList = siteMeta.projects
    .concat([
      '...more'
    ])
    .map(p => {
      return `
    <li>
      <a href='/pages/projects'>${p}</a>
    </li>`
    })
    .join('')

  return `<div class='index'>
    <div>
      ${content}
    </div>

    <br>
    <br>
    <div class='articles'>
      <h2>
        <a href='/pages/articles'>Articles:</a> 
      </h2>
      <ul class='articlesList'>
        ${articlesList}
      </ul>
    </div>
    <div class='projects'>
      <h2>
        <a href='/pages/projects'>Projects:</a> 
      </h2>
      <ul class='projectsList'>
        ${projectsList}
      </ul>
    </div>
  </div>`
}

module.exports = indexTemplate
