const lunr = window.lunr

window.onload = () => {
  if (window.location.pathname === '/searchResults.html') {
    const urlParams = new URLSearchParams(window.location.search)
    let searchCriteria = urlParams.get('search')
    if (searchCriteria) {
      searchCriteria = searchCriteria.length > 0 ? searchCriteria + '*' : searchCriteria
      window.fetch('/searchIndex')
        .then(response => response.text())
        .then(text => {
          const searchIndex = lunr.Index.load(JSON.parse(text))
          const searchResults = searchIndex.search(searchCriteria)
          console.log('results', searchResults)
          const resultsEl = document.getElementById('searchResultsList')
          if (resultsEl) {
            const resultsList = searchResults
              .map(r => {
                const name = r.ref.replace('/posts/', '').replace('index.html', '')
                return `<li><a href=${r.ref}>${name}</a></li>`
              })
              .join('')
            // console.log('resultsList', resultsList)
            resultsEl.innerHTML = resultsList
          }
        })
    }
  }
}

document.getElementById('search').addEventListener('keydown', e => {
  if (e.keyCode === 13) {
    // console.log('changed', e.target.value, window.location, window.location.origin)
    const searchCriteria = e.target.value
    window.searchCriteria = searchCriteria
    window.location.href = `/searchResults.html?search=${searchCriteria}`
  }
  //
  /* const summaryInclude = 60
  const fuseOptions = {
    shouldSort: true,
    includeMatches: true,
    threshold: 0.0,
    tokenize: true,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 3,
    keys: [
      { name: 'title', weight: 0.8 },
      { name: 'contents', weight: 0.5 },
      { name: 'tags', weight: 0.3 },
      { name: 'categories', weight: 0.3 }
    ]
  } */

  /* const fuse = new Fuse(pages, fuseOptions)
  console.log('fuse', fuse)
  var result = fuse.search(e.target.value) */

  /* const pages = [
    { name: 'electronics are cool', contents: 'arduino', tags: ['arduino'], categories: [] },
    { name: 'plants are cool', contents: 'aquaponics', tags: ['aquaponics'], categories: [] }
  ]

  var documents = [
    {
      'name': 'Lunr',
      'text': 'Like Solr, but much smaller, and not as bright.',
      'id': 0
    },
    {
      'name': 'React',
      'text': 'A JavaScript library for building user interfaces.',
      'id': 1
    }, {
      'name': 'Lodash',
      'text': 'A modern JavaScript utility library delivering modularity, performance & extras.',
      'id': 2
    }]

  var idx = lunr(function () {
    this.ref('id')
    this.field('name')
    this.field('text')

    documents.forEach(function (doc) {
      this.add(doc)
    }, this)
  })
  const searchText = e.target.value.length > 0 ? e.target.value + '*' : e.target.value
  const results = idx.search(searchText)

  console.log('results', results, 'searchText', searchText)
  const resultsEls = results.map(r => {
    const id = parseInt(r.ref)
    const d = documents.find(x => x.id === id)
    return `<span>${d.name}</span>`
  })
  console.log('foo', document.getElementById('searchResults'))
  document.getElementById('searchResults').innerHTML = `<div>${resultsEls}</div>` */
})
