const builtIns = {
  '@jscad/core': `
  
  export const union = (a, b) => {
    return 'union'
  }
  export const cube = (params) => {
    return 'a cube'
  }
  `
}

let modules = { ...builtIns }
let extensions = {
  '.js':''
}
self.addEventListener('message', async function (event) {
  if (event.data.name && event.data.name === 'reset') {
    modules = { ...builtIns }
  } else if (event.data.name) {
    modules[event.data.name] = event.data.source
  }
})

self.addEventListener('fetch', (event) => {
  const url = event.request.url
  let path = url.replace('http://localhost:8080/zborg/', '').replace('http://localhost:8080/', '')
  const ext = path.split('.').pop()
  // console.log('event', url)
  if (url.includes('zborg') || url.includes('/@jscad')) {
    const module = modules[path]
    console.log('loading module', path, module)
    event.respondWith(
      new Promise((resolve, reject) => {
        const headers = new Headers({
          'Content-Type': 'application/javascript',
          'Cache-Control': 'no-store', // 'no-cache', // attempt at forced invalidation
          'Expires': 'Wed, 21 Oct 2015 07:28:00 GMT' // same
        })
        resolve(new Response(module, { headers }))
      })
    )
  }
})
// These are necessary to force the web worker initialization before
// any modules are imported
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

/* self.addEventListener('install', event => {
  console.log('install inside', event, caches)
  event.waitUntil(
    caches.open('v1').then(cache => {
      console.log('cache', cache)
      return cache.addAll([
        './zbur.js'
      ])
    })
  )
}) */
/*
self.addEventListener('fetch', function(event) {
  console.log('intercept fetch', event)
  event.respondWith(
    // magic goes here
  );
}); */
