---
title: "dynamic es-module creation"
authors: Mark Moissette
tags:
  - es javascript jscad dynamic horror jscad
date: "2018-11-26"

---

# dynamic es-module creation

## The basics
So we now have *native* es-modules in [most of the major browsers](https://caniuse.com/#search=module)

This means you can do things like 

```javascript
import {foo} from './bar.js'

foo()

```

The above means that you have a file called 'bar.js' at a relative path from where you are doing the import.

so something like:

* index.html 
 * index.js
 * bar.js 

Which implies that your modules are sitting somewhere on your server, having a nice and cosy time.

But what if you actually need to load 'virtual' (usually user created) modules on the fly ? 
with the following requirements:
- you have a text/js editor in your page
- you want to enable your users to create their own modules and import from other modules, in a ***purely client side way*** , without ***any*** special server side setup

>Note: this are our barebone requirements for OpenJscad, as users can drag & drop files from desktop, or edit design code directly in the browser, with no special tooling other than the most basic http server

If you are impatient, the code is [here](./assets/code)

## Problems

- eval() does not work with es modules (remember, *import* statements need to live at the **top** of your modules's code)
- *import* is not a function (do not get me started on that)
- as far as I know (and I would love to be proven wrong), there is no cannonical / well documentated way to create custom loaders

## The answer ?

After spending weeks (actually months, sporadically) and not finding ANY information at all about how to solve this, and then I found [this](https://salomvary.com/es6-modules-in-browsers.html#custom-loaders-with-service-workers) excellent article by accident

- the gist of it all is this
> Service Workers can intercept Fetch API requests. This comes in handy as ES6 import uses fetch behind the scenes.
- so this means you can also intercept calls to **non existing modules** aka your own 'dynamic' modules
  * you need a **service worker** to handle the interception of fetch calls
  * you also need a mechanism to send and store your 'dynamic' module's code to the webworker (so that the worker has the necessary data to create responses)

### Code

More in depth, it looks something like this:

In your root index.js: 
```javascipt
const sendMessageToSW = msg => {
  return new Promise( (resolve, reject) => {
    // Create a Message Channel
    const msg_chan = new MessageChannel()

    // Handler for recieving message reply from service worker
    msg_chan.port1.onmessage =  event => {
      if (event.data.error) {
        reject(event.data.error)
      } else {
        resolve(event.data)
      }
    }
    // Send message to service worker along with port for reply
    navigator.serviceWorker.controller.postMessage(msg, [msg_chan.port2])
  })
}
```

And in the service worker:
Handle the messages that set the **content** and **uris** for our 'virtual' modules

```javascript
self.addEventListener('message', async function (event) {
  if (event.data.name && event.data.name === 'reset') {
    modules = { ...builtIns }
  } else if (event.data.name) {
    modules[event.data.name] = event.data.source
  }
})
```

and handle the fetch requests:
> we are using a prefix to distinguish between the 'normal' modules to fetch (actual files that exists on the server) modules and the virtual ones

```javascript
self.addEventListener('fetch', (event) => {
  const url = event.request.url
  let path = url.replace('http://localhost:8080/zborg/', '').replace('http://localhost:8080/', '')
  const ext = path.split('.').pop()
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

```

## Not so fast !

Of course, it would have been too good to be true (by that I mean, hours of trying to figure out what is wrong and having an urge to forget about this for the next few months)
it turns out it does not *quite* work the way I hoped
- once the file is loaded ***once***, even if you make changes to the virtual module's code, the **fetch** call never gets triggered again
- I tried every possible combo I could think of to solve that issue:
 * no cache headers
 * various server settings 
 * destroying and recreating the worker


## Bonus: extension handling

You might be aware of Node's way of handling extensions, ie things like

```javascript
const registerJscadExtension = (fs, _require) => {
  const stripBom = require('strip-bom')
  _require.extensions['.jscad'] = (module, filename) => {
    const content = fs.readFileSync(filename, 'utf8')
    module._compile(stripBom(content), filename)
  }
}
```


## references
https://salomvary.com/es6-modules-in-browsers.html#custom-loaders-with-service-workers
https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
https://github.com/domenic/import-maps
http://craig-russell.co.uk/2016/01/29/service-worker-messaging.html