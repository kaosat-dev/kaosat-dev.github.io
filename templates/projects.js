const projectsTemplate = (siteMeta, content, meta) => {
  console.log('siteMeta', siteMeta.articles, siteMeta)

  //  <a href='/posts/${a.path}'>${a.title}</a>
  // <button>Load more ...</button>
  // ${siteMeta.authors[0].bio}
  // ![peek-a-printer](/assets/img/mememe.jpg "peek-a-printer")

  return `<div class='projects'>
    <h1>
      Projects, old & new:
    </h1>
    <section>
      <a href='/articles/'>
        <h2>Jscad: code based parametric 2d & 3d design for your browser</h2>
        <span class='fadedImg'>
          <img src='/assets/img/jscad2.jpg'/>
        <span>
      </a>
    </section>

    <section>
      <a href='/articles/'>
        <h2>Gardening: 3d printed tools, code, sensors etc</h2>
        <span class='fadedImg'>
          <img src='/assets/img/onion-tool-2.jpg'/>
        <span>
      </a>
      
    </section>

    <section>
      <a href='/articles/'>
        <h2>Solar passive greenhouse</h2>
        <span class='fadedImg'>
          <img src='/assets/img/greenhouse.png'/>
        <span>
      </a>
    </section>
  </div>`
}

module.exports = projectsTemplate
