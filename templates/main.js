// <link rel="stylesheet"
// href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/styles/atom-one-dark.min.css">
// <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/highlight.min.js"></script>
const mainTemplate = (siteMeta, content, meta) => {
  const navigation = siteMeta.navigationEntries.map(x => `<span> <a href="/pages/${x}.html">${x}</a></span>`).join(' ')

  const template = `
    <html>
      <head>
        <title>Kaosat.dev: ${meta.title}</title>
        <link rel="stylesheet" href="/style.css">
        <link rel="stylesheet" href="/github-markdown.css">

        
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">
      </head>

      <body>
        <div class="grid">
          <header class="header grid-central">
            <section class="infos">
              <h1><a href="/"> ${siteMeta.name}</a> </h1>
              <h2>${siteMeta.description}</h2>
            </section>
            <section id="navigation" class='navigation'>
              ${navigation}
              <span>
                <input type='text' placeholder='search' id='search'></input>
                <div id='searchResults'></div>
              </span>
              <a href='${siteMeta.authors[0].social[0].url}' target="_blank" rel="noopener" class='icon' >
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 192 192" width="24px" height="24px"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,192v-192h192v192z" fill="none"/><g fill="#000000"><path d="M87.2,16.8c-36.8,4 -66.4,33.6 -70.4,69.6c-4,37.6 17.6,71.2 50.4,84c2.4,0.8 4.8,-0.8 4.8,-4v-12.8c0,0 -3.2,0.8 -7.2,0.8c-11.2,0 -16,-9.6 -16.8,-15.2c-0.8,-3.2 -2.4,-5.6 -4.8,-8c-2.4,-0.8 -3.2,-0.8 -3.2,-1.6c0,-1.6 2.4,-1.6 3.2,-1.6c4.8,0 8.8,5.6 10.4,8c4,6.4 8.8,8 11.2,8c3.2,0 5.6,-0.8 7.2,-1.6c0.8,-5.6 3.2,-11.2 8,-14.4c-18.4,-4 -32,-14.4 -32,-32c0,-8.8 4,-17.6 9.6,-24c-0.8,-1.6 -1.6,-5.6 -1.6,-11.2c0,-3.2 0,-8 2.4,-12.8c0,0 11.2,0 22.4,10.4c4,-1.6 9.6,-2.4 15.2,-2.4c5.6,0 11.2,0.8 16,2.4c10.4,-10.4 22.4,-10.4 22.4,-10.4c1.6,4.8 1.6,9.6 1.6,12.8c0,6.4 -0.8,9.6 -1.6,11.2c5.6,6.4 9.6,14.4 9.6,24c0,17.6 -13.6,28 -32,32c4.8,4 8,11.2 8,18.4v20.8c0,2.4 2.4,4.8 5.6,4c29.6,-12 50.4,-40.8 50.4,-74.4c0,-48 -40.8,-85.6 -88.8,-80z"/></g></g></svg>
              </a>
            </section>
          </header>
          <section class="content grid-central">
            ${content}
          </section>
        </div>

        <script>hljs.initHighlightingOnLoad();</script>
        <script src='/scripts/fuse.min.js'></script>
        <script src='/scripts/lunr.js'></script>
        <script src = '/scripts/search.js'></script>
      </body>
    </html>
    `
  return template
}

module.exports = mainTemplate
