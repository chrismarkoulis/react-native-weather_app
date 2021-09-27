# React Native WeatherApp project

A React Native weather display/forecast app utilizing OpenWeatherMap API

## Setup

1.  Create file `config.js` in `/app/utils/` with the following     content:

    ```
    export const API_BASEURL = "https://api.openweathermap.org/data/2.5";
    export const API_KEY = "your_api_key";

    export const ICONURL = 'https://openweathermap.org/img/wn';
    ```
2.  Install dependencies:

    ```sh
    npm i -g react-native-cli
    npm install
    ```

### Running the application

1.  From project dir, run:

    ```sh
    npm start
    ```

2.  From project dir, on different terminal, run:
    #### iOS

    ```sh
    npm run ios
    ```
    Attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

    #### Android
    ```sh
    npm run android
    ```
    Attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup).