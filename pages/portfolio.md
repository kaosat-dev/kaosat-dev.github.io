---
title: "portfolio"
template: "portfolio"
---

# Why a portfolio/showcase ?

I have worked on a lot of projects in the past decade, on a lot of 3D/webgl/CAD/3D printing etc, quite visual (very often web, based) projects, so it recently dawned on me: let's have a nice visual showcase ! I love learning, challenges, finding the right tools for the job, as you can see in the list below.

* 3D modeling, scanning & visualisation:
  * [Jam/usco](#jam--usco)
  * [OpenJscad](#openjscad-jscad)
  * [Simple-scan](#simple-scan)

* 3d Printing, electronics & robotics
  * [3d printing](#3d-printing)
  * [robotics](#electronics-robotics)

* Game developement & Ecs:
  * [Blenvy: Blender + gltf + Bevy](#blenvy-bevy-engine--blender-integration)
  * [Custom engine](#custom-game-engine-tech-exploration)


 
## Jam / usco 

A very modular, multi platform Webgl app for collaborative editing & sharing of 3d designs for Ultimaker/Youmagine.com for 3D printing & more

![Jam](/assets/img/portfolio/jam/MoreMultiEdit.gif "Jam")

<details>
  <summary>Click to learn more!</summary>

***Key points:***

  * blazingly fast , streaming parsing for various 3d formats (stl, amf, 3mf)
  * mobile (UM3 app), Web, and backend (thumbnail generation using Headless webgl rendering)
  * bill of materials, shared 3d designs and a LOT more !

***Showcase:***

![Jam](/assets/img/portfolio/jam/RenderServer.gif "Jam")

![Jam](/assets/img/portfolio/jam/video.gif "Jam")

</details>

<br>

## OpenJscad/ Jscad

A procedural, code based 3d modeling tool, for the browser, desktop, CLI & more ! Ie: write some code, get a 3d printable design !
A project with a huge scope and possibilities

![jscad](/assets/img/portfolio/jscad/Screenshot%20from%202021-03-01%2011-22-05.png "Jscad")

<details>
  <summary>Click to learn more!</summary>

  ***Key points:***

For Over 5 years I was a core developer/maintainer of [OpenJscad](https://github.com/jscad/OpenJSCAD.org) 

* Upgrade to modern Es-next, development of core features & UI of parametric 2D/3D modeling program (Javascript, Node.js)
* development of core modeling & maths features, UI
* migration from monolithic code to node modules
* setup and addition of a huge amount of unit test
* I did [a talk](https://www.youtube.com/watch?v=PLA8VPRRi6A) at HannoverJs a few years back that explains the scope and challenges of my work on the project
* I also created [Electron based experimental Desktop app](https://www.youtube.com/watch?v=nJyede1Ah9k&list=PLCiWVcSJ1UJSghHdQcTsAaXOBDkX0Nmx9)
* latest versions also support decentralized design sharing using the [dat protocol](https://dat.foundation/) / [beaker browser](https://beakerbrowser.com/)

***Showcase:***

![jscad](/assets/img/portfolio/jscad/Screenshot%20from%202021-03-01%2009-39-15.png "Jscad")

![jscad](/assets/img/portfolio/jscad/emitter-internal.png "Jscad")


- Using the principle of 'dogfooding' (actually use the software you are developing), I often used the software to create robots, pcb housings, gardening tools etc
### Variations

#### Signed distance field modeling

At some point I also experimented with purely GPU based rendering based on signed distance fields as a possible frontend/renderer alternative
![jscad](/assets/img/portfolio/jscad/df-csg-16.gif "Jscad")

![jscad](/assets/img/portfolio/jscad/ShapeFu-openscad.gif "Jscad")

![jscad](/assets/img/portfolio/jscad/3d-sdf1.gif "Jscad")


#### Coffeescad

I also worked on a fork in CoffeeScript for a while called ... Coffeescad !
There is an [interview](https://www.golem.de/news/coffeescad-3d-druckmodellierung-im-browser-1305-99271.html) I did about it for the German It/tech journal Golem 

</details>

<br>

## Simple-scan

A full blown 3d scanning app in the browser , with connected dedicated hardware ! It was done for the KIT in Germany, Karslruhe

![scan](/assets/img/portfolio/simple-scan/0ceca305-6b8d-4b69-8ee9-951658f5fff3.png "scan")

<details>
  <summary>Click to learn more!</summary>

***Key points:***

  * polymer.js / web component based
  * hardware connection
  * pleasant, easy to use user interface
  * ported c bindings to enable use of native libraries for camera/hardware access

***Showcase:***

  ![scan](/assets/img/portfolio/simple-scan/87544581-b6f2-4d7f-b41b-7143ad69033d.png "scan")

  ![scan](/assets/img/portfolio/simple-scan/b659faff-af75-43b1-9d56-026ffc3e7846.png "scan")

</details>

<br>


## 3d printing

A long standing passion & work of mine is 3d printing, in all its aspects: software, hardware, electronics, processes

  ![3dp](/assets/img/portfolio/3dp/video.gif "3dp")


<details>
  <summary>Click to learn more!</summary>

***Key points:***

  * design & build of multiple 3D printers
  * custom firmware development (C/C++/Arduino)
  * front end / UI development in Python & Js
  * 10 + years of experience both for 3d printing Companies (Ultimaker) & personally
  * 3D printing workshop organization for adults & children

***Showcase:***

![3dp](/assets/img/portfolio/3dp/3DR2%20-%201.jpg "3dp")

![3dp](/assets/img/portfolio/3dp/317.jpg "3dp")

![3dp](/assets/img/portfolio/3dp/320.jpg "3dp")

![3dp](/assets/img/portfolio/3dp/2014%20-%207.jpg "3dp")

![3dp](/assets/img/portfolio/3dp/2014%20-%208.jpg "3dp")



</details>

<br>


## Electronics/ Robotics

  A lot of my hardware projects also revolve around, or have included electronics/sensors actuators !

  ![robotics](/assets/img/portfolio/robotics/kiwikee.jpg "robotics")

<details>
  <summary>Click to learn more!</summary>

***Key points:***

  * [ parametric versions](https://github.com/PiRo-bots/kiwikee) of 3D printable robots
  * custom electronics, with home made PCB designs 
  * lots of experience with using off the shelf components for sensors, actuators, etc (Arduino, Esp8266, Raspberry Pi)
  * coding custom firmware (c/c++/Arduino/PlatformIo) for robots, sensor networks (Mqtt...)
  * [live coding video series](https://www.youtube.com/watch?v=o5OMGnLj5-I&list=PLCiWVcSJ1UJRSipDN3YPTuBrR8wG8bjks) mixing Hardware/Firmware & web dev
  

***Showcase:***

  ![robotics](/assets/img/portfolio/robotics/overview.png "robotics")

  ![robotics](/assets/img/portfolio/robotics/repBug_0.1.jpg "robotics")

  ![robotics](/assets/img/portfolio/robotics/robout-pcb.png "robotics")


</details>

<br>


## 3d visualization

In my carreer I have also been working on different types of data visualization in WebGL & 2d

![dataviz](/assets/img/portfolio/dataviz/sensorGraphs.gif "dataviz")


<details>
  <summary>Click to learn more!</summary>

***Key points:***

  * built specifically for client needs
  * performant WebGL (GPU instancing etc)
  * lean/ minimalistic implementations

***Showcase:***

![dataviz](/assets/img/portfolio/dataviz/Screenshot%20from%202021-03-01%2011-13-42.png "dataviz")

![dataviz](/assets/img/portfolio/dataviz/Screenshot%20from%202021-03-01%2011-15-43.png "dataviz")


</details>

<br>

## Blenvy: Bevy engine / Blender integration

![gamedev](/assets/img/portfolio/Blenvy/blenvy.png "gamedev")


I have created & maintained [Blenvy](https://github.com/kaosat-dev/Blenvy) a set of tools to enable [Blender](https://www.blender.org/) to be used as an editor for the amazing [Bevy game engine](https://bevyengine.org/)
I love editor-less and code based approaches, but sometimes you need a good 3d modeling tool, and I use Blender regularly , so why not combine both ?
It enables a [Blender](https://www.blender.org/) (gltf) centric workflow for Bevy, ie defining entites & their components
inside Blender. Aka "Blender as editor for Bevy"

It also allows you to setup 'blueprints' in Blender by using collections etc.

<details>
  <summary>Click to learn more!</summary>

  ***Key points:***

  * Rust on the Bevy side, Python on the Blender side
  * custom UI to add custom components with seamless integration into Bevy's ecs
  * uses glf files with metadata to transfer information
  * automated incremental exports with change detection on the Blender side
  * a LOT more tools

</details>

<br>

## Custom Game engine/ tech exploration


This personal project was a breeding ground to learn/ deepen my understanding about a lot of technologies, and how far you 
can push a 'tool-less' web stack (no build steps, using native esmodules only as much as possible)

![gamedev](/assets/img/portfolio/gamedev/su-proto2.2.png "gamedev")


<details>
  <summary>Click to learn more!</summary>

  ***Key points:***

  * ECS implementations
  * experimentation with Webgl & WebGPU
  * heightmaps, physics, all in vanilla js
  * experimentation with Quick.js / embeded js engines
  * electron app with sound, gamepad etc support
  * python code for Blender add ons

</details>

<br>




