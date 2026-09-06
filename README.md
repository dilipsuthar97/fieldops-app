# FieldOps

An Expo (SDK 57) app that lists work orders.

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
