---
title: "Building a Repstrap (8) its ALIIIVE! also , improvements!"
date: "2010-10-21"
link: "http://www.kaosat.net/?p=1187"
tags:
- 2010
- Doboz
- DobozRap
- extruder
- first prints
- Python
- Reprap
- Reprap/Repstrap
- repstrap
- skeinforge
- YARP
coverImage: "reprap.jpg"
archived: true
---



# Building a Repstrap (8) its ALIIIVE! also , improvements! 

[![](./assets/reprap.jpg "Doboz Done")](./assets/reprap.jpg)

First things first : it's **ALIIIIIVE MWHAHAHA** ! That being said: progress has been moving along a a faster rate in the last few weeks, and beside a few Things to add and adjust on the software side , the machine is 99% complete.

## Finished/improved :

- **Mechanical**:
    - the general frame is done and cleaned, some of the plexiglass side panels have been installed ![](./assets/imag0956_5095810851_o.jpg) ![](./assets/imag1033_5141993315_o.jpg) ![](./assets/imag1032_5142596422_o.jpg)
    - the extruder drive mechanism was redone from scratch ![](./assets/imag1036_5141994901_o.jpg)
    - the heater head / extruder broke down after a few tries and was redone as well![](./assets/imag1019_5141995745_o.jpg)

- **Electronics:**
    - the electronics rack and adapted connections was finished ( very practical whenever you need to make bigger adjustments or repairs on the electronics)
    - the cabling was cleaned up completely (no more "whooops i just destroyed the whole thing by accidently ripping out cables.."you KNOW it can happen) ![](./assets/imag0953_5096409630_o.jpg) ![](./assets/imag0954_5096407920_o.jpg)
    - the heated bed was redone from scratch aswell, now using a set of 3 nichrome (heating) wires in parallel on the Tip120 controlled 12V pwm line, taped with kapton tape to an aluminum thin sheet and with a plexiglass (2.5mm thick) + kapton tape upper layer : temperatures can now easily reach 50 to 80 °C on demand, with a nice even temperature on the surface ![](./assets/imag0983_5142000993_o.jpg)   ![](./assets/imag1034_5141994089_o.jpg)

- **Software**:
    
    - a custom firmware ( based on bit and pieces from both the 5D Gcode interpreter and the Makerbot firmware) is implimented
    
    - the lcd display/ keyboard combo's software was developed ![](./assets/imag0909_5096411062_o.jpg)
    - The Pc side host software, in charge of reading the gcode files and sending the commands to the machine was cleaned up, debugged and improved![](./assets/5142052299_70894324ed_o.jpg)
    - Also , what is this, could it be the premise of a **3d scan** ? ![](./assets/5142660012_80bc5eb8d8_o.jpg)

## The results:

- lets be honest first: the machine still requires **a lot of adjustements / improvements** (mostly on the software side of things, but not only) before the print quality is acceptable
- i have been steadilly improving the build quality, adjusting parameter in [Skeinforge](http://www.bitsfrombytes.com/wiki/index.php?title=Skeinforge) (the program that converts a 3d model file into a set of commands the machine can understand and print the object accordingly) and tweeking the extruder mostly (by far the most unreliable part of the machine for now, that is why it will be replaced in due time)
- Here you can see what a bit of adjustment in Skeinforge can achieve:
    - First tries: ![](./assets/imag0975_5141999469_o.jpg)
    - Progressive adjustements: (those closest to the camera are the more refined ones)![](./assets/imag0976_5142602056_o.jpg)
- After a while i tried bigger/ more complex prints: Not quite there yet ! but getting damn close to something workable, and quality will improve greatly once i change the extruder![](./assets/imag1003_5141996559_o.jpg) ![](./assets/imag0974_5142605512_o.jpg) ![](./assets/imag1028_5141992031_o.jpg) ![](./assets/imag1029_5141994587_o.jpg)

And as a bonus , some videos of all these elements:

[![bonus](http://img.youtube.com/vi/J8mDe6kd9p0/0.jpg)](http://www.youtube.com/watch?v=J8mDe6kd9p0)
