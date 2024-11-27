# 🚀 Ymlidiwr Simple Task Manager

## 📝 Project Overview

A desktop application that shows the PC component usages

## :movie_camera: Video Demo
https://youtu.be/YkKtqJclG8k


## :page_facing_up: Description
This project is basically a system resource monitoring like the task manager but in much simpler version, it only shows the PC components usages like CPU, RAM, STORAGE, and GPU. The project itself is not that impressive but in order to compensate for its simplicity I made sure that the project has event handling and CSP for security and also, I made the IPC type safe. 

 

`main.ts` file serves as the main entry point for an Electron application, orchestrating its initialization and core functionality. It begins by importing essential modules, including Electron's `app`, `BrowserWindow`, and custom utilities for inter-process communication (IPC) and environment checks. When the app is ready, it creates the main application window with specific configurations, loading either a local development server or a production-ready UI file. It integrates IPC to handle actions like fetching static data and managing window operations (close, maximize, minimize).  

  

The `menu.ts` file defines a function, `createMenu`, which is responsible for building and setting up the application menu in an Electron app. It imports necessary modules, including Electron's `Menu`, `BrowserWindow`, and `app`, as well as a utility function `isDev` to check if the app is running in development mode. The function uses `Menu.buildFromTemplate` to define the menu structure, which includes a submenu with options for opening developer tools (visible only in development mode) and quitting the application. On Windows, the menu is labeled "App," while on other platforms, the label is omitted. Once the template is created, it is applied as the application menu using `Menu.setApplicationMenu`, linking it to the main browser window for interaction. This setup ensures a dynamic and platform-aware menu that enhances the app's usability. 

 

The `pathResolver.ts` file provides utility functions to determine the correct file paths for various resources used by an Electron application, accommodating differences between development and production environments. It imports the path module for path manipulation, along with Electron's app module to access the application's base directory. The `getPreloadPath` function resolves the path to the preload script, ensuring it points to `/dist-electron/preload.cjs`, with adjustments depending on whether the app is in development or production mode. Similarly, `getUIPath` generates the path to the main UI file, index.html, located in the `/dist-react directory`. Lastly, `getAssetPath` computes the location of static assets under `/src/ui/assets`, adjusting the base path as needed for different environments. These functions streamline file access and ensure the application functions seamlessly across varying setups. 

`preload.cts` defines a secure preload script in an Electron application, facilitating communication between the renderer and main processes through a restricted API exposed in the global `window.electron` object. Using Electron's `contextBridge`, the script provides methods like `subscribeStatistics` and `subscribeChangeView` to listen for specific IPC events, as well as `getStaticData` and `sendFrameAction` for invoking actions or sending data to the main process. It includes helper functions, such as `ipcInvoke` for invoking events and returning promises, `ipcOn` for setting up and managing event listeners, and `ipcSend` for sending one-way messages. 

 

`resourceManager.ts` monitors system resources and retrieves hardware details in an Electron application. The `pollResources` function collects CPU, RAM, storage, and GPU usage at regular intervals defined by `POLLING_INTERVAL` and sends this data to the renderer process using IPC. The `getStaticData` function gathers information about the system's hardware, including the CPU model, total RAM, total storage, GPU model, and GPU memory size. It uses helper functions to retrieve specific metrics: `getCpuUsage` determines the CPU usage using system commands, `getRamUsage` calculates the percentage of used RAM, `getStorageData` retrieves total and used storage space, and `getGpuUsage` only works with Nvidia GPUs and it fetches GPU utilization using `nvidia-smi` commands. 

 

`tray.ts` defines the `createTray` function, which sets up a system tray icon and context menu for an Electron application. It creates a new `Tray` instance using an icon file located in the assets directory, with the icon's name. The tray menu is built using `Menu.buildFromTemplate`, with two options: **"Show"**, which brings the application window to the foreground and **"Quit"**, which terminates the application. 

 

`tray.test.ts` is a test written using Vitest to verify the behavior of the `createTray` function from the `tray.js` module. It mocks the relevant Electron modules, such as `Tray`, `app`, and `Menu`, to simulate the system tray's functionality without requiring the actual Electron environment. The mock for `Tray` returns an object with a `setContextMenu` method, and the `app` mock provides the `quit` method and `dock.show` method. A mock `mainWindow` object is also created to simulate the `BrowserWindow` and its `show` method. The test then calls `createTray(mainWindow)` and verifies that the tray menu has two items: "Show" and "Quit." It simulates clicks on both items and checks if the correct methods are called, such as `mainWindow.show`, `app.dock.show`, and `app.quit`. This ensures that the tray menu behaves as expected by testing that the actions associated with each menu item are triggered properly. 

`tsconfig.json` which configures the TypeScript compiler options for a project. The configuration specifies that the project should use **strict type-checking** with `"strict": true`, enabling all strict type-checking options. It sets the **target** JavaScript version to **ESNext**, meaning the compiled JavaScript will be compatible with the latest ECMAScript features. The **module** is set to **NodeNext**, indicating that the project uses the Node.js module system with support for both CommonJS and ES modules. The compiled files will be output to the `../../dist-electron` directory, as specified by `"outDir"`. It also skips library checks during the compilation process with `"skipLibCheck": true`, potentially speeding up the build process. Finally, the `"types"` array points to a custom types directory (`../../types`), which allows the project to include additional type definitions not found in node_modules. 

 

`util.ts` defines utility functions for managing inter-process communication (IPC) and ensuring security in an Electron application. The `isDev` function checks if the environment is set to development mode by looking at the `NODE_ENV` variable. The `ipcMainHandle` function registers an asynchronous handler for a specific IPC event, validating the event's frame before calling the handler. Similarly, `ipcMainOn` listens for an IPC event and invokes a handler after validating the event’s source. The `ipcWebContentsSend` function sends messages from the main process to the renderer process with a specific payload. The `validateEventFrame` function ensures that IPC events are coming from a trusted source by verifying the event's frame URL, allowing exceptions only in development mode for events from `localhost:5123`. These functions help secure and streamline the IPC communication in the application by preventing potentially malicious events. 



## 🛠 Technologies Used
![Electron](https://img.shields.io/badge/Electron-33.2.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)

## 📦 Prerequisites

Before you begin, ensure you have met the following requirements:
- Electron 33.2.0
- node js 23.3.0
- React js 18.3.1
- TypeScript 5.7.2

## 🔧 Installation & Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/Ymlidiwr-Simple-Task-Manager.git
cd Ymlidiwr-Simple-Task-Manager
```

2. Install dependencies
```bash
npm i systeminformation
npm i fs
npm i os
npm i os-utils
```

## 💻 Running the Project

### Local Development
```bash
npm run dev
```

### Running Tests
```bash
npm run test:unit
```
