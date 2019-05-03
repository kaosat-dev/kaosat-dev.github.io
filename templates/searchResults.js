const searchResultsTemplate = (siteMeta, content, meta) => {
  return `<div class='results'>
  ${content}
    Search results (in posts) :
    <ul id='searchResultsList'><ul>
  </div>`
}

module.exports = searchResultsTemplate
