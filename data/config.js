const siteMeta = {
  name: 'Kaosat.net',
  description: 'Gardener of code & plants: programming, 3d printing, Gardening, Aquaponics, & lots more',
  navigationEntries: [
    'portfolio',
    // 'projects',
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
  projects: ['jscad', 'garden', 'robots', '3d printing'] // tags for projects,
}

module.exports = siteMeta
