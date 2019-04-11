const lunr = window.lunr

document.getElementById('search').addEventListener('input', e => {
  console.log('changed', e.target.value)
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

  const pages = [
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
  document.getElementById('searchResults').innerHTML = `<div>${resultsEls}</div>`
})
