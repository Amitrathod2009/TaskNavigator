# Task Navigator

## Overview
Task Navigator is a React Native CLI application that helps users manage their to-do tasks efficiently. It integrates authentication, CRUD operations, deep linking, offline caching, and testing while using the GoRest API for backend operations.

## Features
- **Authentication**: Users input their GoRest token to log in and access to-do functionalities.
- **CRUD Operations**: Users can create, read, update, and delete to-dos via the GoRest API.
- **Deep Linking**: Supports deep linking (e.g., `tasknavigator://todo/:todoId`) to open specific to-do details.
- **Offline Caching**: Caches to-dos locally using AsyncStorage and optionally syncs offline changes.
- **State Management**: Utilizes Redux Toolkit for efficient state handling.
- **Navigation**: Implements React Navigation for seamless screen transitions.
- **UI/UX**: Uses React Native Paper for an enhanced visual experience.
- **Testing**: Includes unit testing using Jest.

## Project Structure
```
TaskNavigator/
│-- src/
│   ├── components/
│   ├── navigation/
│   ├── redux/
│   ├── screens/
│   ├── utils/
│   ├── App.js
│-- __tests__/
│-- package.json
│-- README.md
```

## Installation
### Prerequisites:
- Node.js & npm/yarn
- React Native CLI
- Android Studio/Xcode (for emulators)

### Steps:
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd TaskNavigator
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the Metro bundler:
   ```sh
   npx react-native start
   ```
4. Run on Android:
   ```sh
   npx react-native run-android
   ```
   or iOS:
   ```sh
   npx react-native run-ios
   ```

## Usage
1. Open the app and enter your GoRest API token on the Login Screen.
2. View, create, edit, and delete to-dos.
3. Use deep linking (`tasknavigator://todo/:todoId`) to navigate directly to specific to-do details.
4. Work offline with cached data that syncs once online.

## Dependencies
- React Native
- React Navigation
- Redux Toolkit
- Axios
- AsyncStorage
- React Native Paper
- React Native Picker
- Jest (for testing)

## Testing
Run unit tests using:
```sh
npm test
```


