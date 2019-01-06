
import * as api from './geom/index.js'
import {booleans, primitives} from './geom/index.js'
import toto from './geom/foo.stl'
// import {union} from './geom/booleans.js'
// import {cube, sphere} from './geom/primitives.js'
const {cube, sphere} = primitives

console.log('api', api.booleans, api.primitives)
console.log('booleans', booleans, 'primitives', primitives)
console.log('union', union, 'cube', cube, 'sphere', sphere)


const setupWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker-test.js').then(function (reg) { //, { scope: './' }
      if (reg.installing) {
        console.log('Service worker installing')
      } else if (reg.waiting) {
        console.log('Service worker installed')
      } else if (reg.active) {
        console.log('Service worker active')
      }
    }).catch(function (error) {
      // registration failed
      console.log('Registration failed with ' + error)
    })
  }
}

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

const createModule = (name, source) => {
  if (source.includes(`'@jscad`)) {
    source = source.replace(`from '@jscad/core'`, `from './@jscad/core'`)
  }

  /* const script = document.createElement('script')
  script.text = source
  script.type = 'module'

  // script.src = './main.js'
  // script.name = 'main'
  document.body.appendChild(script) */
  sendMessageToSW({ name, source })
}

document.getElementById('createModule').addEventListener('click', async function () {
  console.log('foo', navigator.serviceWorker, window.caches)

  setupWorker()
  sendMessageToSW({ name: 'reset' })
  document.getElementById('consoleOut').innerText = ''
  // const oldConsole = console.log

  /*console.log = (...bla) => {
    console.debug('foo')
    document.getElementById('consoleOut').innerText += `${JSON.stringify(bla)}\n`
  }*/
  // console.log('module', window)
  const othermoduleContent = document.getElementById('secondDynamicModule').value
  createModule('other.js', othermoduleContent)

  const moduleContent = document.getElementById('mainDynamicModule').value
  createModule('index.js', moduleContent)

  const designRoot = await import('./zborg/index.js')
  console.log('designRoot', designRoot.main())
})