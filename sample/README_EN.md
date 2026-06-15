# Tinkercad LED Remote Control Demo

This is a practical demonstration case for the **tinkercad\-serial\-bridge browser extension**\.

Function: With the serial port bridging capability of the extension, **remotely turn on/off the LED of Tinkercad Arduino simulation via a web page** and implement bidirectional serial data communication\.

## 📁 Case File Description

- **led\.js**: Node\.js service script, responsible for sending and receiving commands, status caching, and cross\-domain processing, connecting the extension and frontend page\.

- **index\.html**: Frontend control page, supports one\-click LED state switching and automatically synchronizes the latest simulation device status\.

- **LED\.ino**: Tinkercad Arduino simulation program, used to receive serial port control commands and report device status regularly\.

## 🧩 Runtime Dependencies

- The **tinkercad\-serial\-bridge** browser extension is installed and configured correctly

- Runtime environment supports Node\.js execution

- Normal access to the Tinkercad online simulation platform

## 🚀 Complete Operation Steps

### 1\. Start the Service

Open a terminal in the project directory and run the following command:

```Plain Text
node led.js
```

Default service address: `http://localhost:8080`

### 2\. Enable Extension Bridge

Click the extension icon to open the configuration panel and complete the settings:

- Fill in the service address: `http://localhost:8080`

- Turn on the **Enable Bridge** switch

- Save settings to activate serial port bridging

### 3\. Run Tinkercad Simulation

Copy the `LED.ino` code to your Tinkercad Arduino project and start the simulation\.

### 4\. Control Simulation via Web Page

Open `index.html` in a browser to realize interactive control:

- Click the button to remotely switch the LED state in Tinkercad simulation

- The page automatically polls for device status and synchronizes simulation data in real time
