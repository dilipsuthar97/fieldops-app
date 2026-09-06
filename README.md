# FieldOps

An Expo (SDK 57) app that lists work orders.

The UI components and the Tailwind preset both come from
[`react-native-fieldops-ui`](https://www.npmjs.com/package/react-native-fieldops-ui), a
companion library published to npm and installed here as an ordinary dependency —
`tailwind.config.js` registers its preset and scans its files. There is no link step;
`yarn install` is all it takes.

## Running it from a clean clone

You need Node 20.19+ (or 22.12+), Yarn 1.x (the repo ships a `yarn.lock`; npm works too), and
one of: Xcode for the iOS Simulator, Android Studio for an Android emulator, or Expo Go on a
phone.

### 1. Install dependencies

```sh
yarn install
```

### 2. Start the API

The app has no bundled backend. Run the provided `server.js`, from wherever it lives, and
leave it running on port **4000**:

```sh
node server.js
```

### 3. Start the app

```sh
yarn ios       # iOS Simulator
yarn android   # Android emulator
yarn start     # dev server + QR code for Expo Go
```

The simulator and emulator work as-is. On a physical phone, `localhost` is the phone itself,
so open [src/api/client.ts](src/api/client.ts#L25) and change the `default` base URL to your
machine's LAN IP (e.g. `http://192.168.1.20:4000`), with the phone on the same network.
