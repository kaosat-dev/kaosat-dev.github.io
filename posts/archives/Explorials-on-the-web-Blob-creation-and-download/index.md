---
title: "Explorials: on the web: Blob creation and download "
date: "1970-01-01"
link: "http://www.kaosat.net/?p=2311"
tags:
- Projects"
archived: true
---



# Explorials: on the web: Blob creation and download  


: Benchmarking Twisted + Reprap interactions (1) 

To kick of 2012 with some meaty bits of code and tech ,  I will be writing a series of articles about my exploration /musings of Python as used in my various geeky projects.

So without further ado, here is the first one!

### Foreword:

I have recently resume work on my "Pollapli" project which is based on a Python Twisted backend to manage multiple **Repraps **/ Arduino based devices (amongst other things), so this article will go into details on the results I am getting for the part of the system in charge of parsing and sending gcode files .

- The base assumption is the use of the current "5d" or simimar protocol for communication with reprap machines
- A second key element is that I have **willingly** sacrificed a bit of performance by not using simple "pass-through" handling of commands:

- The 5d protocol is not really one: it just uses text based, relatively inneficient (but human readable)  gcode commands
- Gcode is prevalent today for Repraps , but that might not always be the case , so by introducing an intermediate level, the code will remain future proof : the print\_task already has the option of choosing different kind of input files and therefore, parsers, and the _**protocols/drivers combo**_ in Pollapli will be in charge of converting the commands represented as Python objects to the specific needs of the different hardware (Repraps, Makerbots etc)

- This particular article will deal with the "**reprap\_print\_task**" and its subsidiaries : this is a small task in charge of parsing Gcode command files.  Ie:

-  parsing one command ( a line in the gcode file) into a python datastructure/class
-  sending that parsed  command  to the device and getting its result
-  moving on to the next command

- The tests are run with a mock device class instead of going through a real "driver->serial connection->hardware" pipe to get a better idea of the performance of the task system itself
- To simulate the latency of the driver/hardware communication,  the mock\_device class has a _**command\_delay**_ parameter that leverages Twisted's deferreds , and notably the deferLater method.

### What is the purpose of all this ?

The aim of the project is to provide the ability of driving a greater number of devices in parallel, in a client/server driven approach.

### Results:

After a major refactoring of the "**reprap\_print\_task"**: I ran a series of tests on different machines and platforms to check for potential bottlenecks and issues:

- Without any latency (_**command\_delay=0**_) the bottleneck resides in the efficiency (or lack thereof) of the run method that parses, sends , and waits for commands
- With a latency of _0.008s_ (a guestimate of the back and forth of commands via the usb serial communication + some processing extra) , the execution time per task becomes _**constant**_ !
t would be criminal not to change things, criminal not to fight, criminal to throw optimism aside

## Recommended movies, videos , books :

Here is a short list of favorites, if you ever need to boost your morale, and outlook on the future :

\- The Mars Underground

\- Symphony of science

\- Pale Blue dot
ieved(self,self.buffer\[:results.start()\]) self.buffer=self.buffer\[results.end():\] #self.logger.debug("serial seperator reached : data : %s"%(self.buffer+str(data))) results=None try: results =self.regex.search(self.buffer) except: pass newDataTreated=True

except SerialException: self.logger.critical("serial Error") time.sleep(0.01) Thread.\_\_init\_\_(self)

""" Main funtion for getting the data recievd on the serial port If attemps to get the serial data fail,shutdown """ def get\_data(self): data=None if self.isConnected and self.isRunning: try: waiting=self.serial.inWaiting() if waiting>0: self.logger.debug("waiting for data") data=self.serial.read(waiting) except Exception: self.logger.critical("critical failure while getting serial data") self.currentErrors+=1 #after ten failed attempts , shutdown if self.currentErrors>10: #self.reconnect() self.stop() return data

""" Simple wrapper to send data over serial """ def send\_data(self,data): if self.isConnected: self.logger.debug("sending data to arduino")

try: self.logger.debug("sending %s to arduino",(data)) self.serial.write(data) except OSError: self.logger.critical("arduino not connected or not found on specified port") """ Function to set program into buffered serial mode, spliting recieved data at specified seperator """ def buffer\_until(self,seperator): self.isBuffering=True self.seperator=seperator

""" Clean shutdown function """ def stop(self): self.isConnected=False self.isRunning=False while not self.finished.isSet(): self.finished.set() self.logger.critical("Serial shutting down")

self.serial.close() self.logger.info("Serial shut down") \[/sourcecode\]
