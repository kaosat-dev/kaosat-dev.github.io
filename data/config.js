const siteMeta = {
  name: 'Kaosat.net',
  description: 'Programming, 3d printing, Gardening, Aquaponics, and lots more',
  navigationEntries: [
    'projects',
    'articles',
    'about'
    // 'contact'
  ],
  authors: [
    {
      name: 'Mark "kaosat-dev" Moissette',
      bio: `
        Dad, living in Germany, gardener of code & plants.
        Passion for 3d (webgl, printing), at the service of actual things (food, health, building etc).
        
        Shamelessly enthusiastic javascripter , occasional C++, Pythonista, Elixir, etc
        
        One of the main developpers/maintainers of https://github.com/jscad/OpenJSCAD.org and proud of it :)
        
        Increasingly minimalist.
        Love people, love to talk :)
      `,
      social: [
        { type: 'email',
          url: 'contact@kaosat.net'
        },
        { type: 'github',
          url: 'https://github.com/kaosat-dev'
        }
      ]
    }
  ],
  tags: [],
  tagOccurences: {}, // occurences per tag
  projects: ['jscad', 'garden'] // tags for projects,
}

module.exports = siteMeta
