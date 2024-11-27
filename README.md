# 🚀 Ymlidiwr Simple Task Manager

## 📝 Project Overview

A desktop application that shows the PC component usages

## :movie_camera: Video Demo


## :page_facing_up: Description
  This project is basically a system resource monitoring like the task manager but in much more simpler version, 
it only shows the PC components usages like CPU, RAM, STORAGE, and GPU. The project itself is not that impressive
but in order to compensate for its simplicity I made sure that the project has event handling and CSP for security 
and also I made the IPC is typesafe.

`main.ts` file serves as the main entry point for an Electron application, orchestrating its initialization 
and core functionality. It begins by importing essential modules, including Electron's `app`, `BrowserWindow`, 
and custom utilities for inter-process communication (IPC) and environment checks. When the app is ready, 
it creates the main application window with specific configurations, loading either a local development server 
or a production-ready UI file. It integrates IPC to handle actions like fetching static data and managing 
window operations (close, maximize, minimize). 




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
