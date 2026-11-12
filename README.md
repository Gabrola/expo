# expo-shared-worker-repro

Minimal reproduction: on Expo web, `new SharedWorker(new URL('./worker.js', import.meta.url))` creates a dedicated `Worker`.

Created with `npx create-expo-app@latest --template blank` (Expo SDK 58), plus `react-dom` and `react-native-web`. The only changes are `App.js` and `worker.js`.

## Steps

```sh
git clone --depth 1 --single-branch --branch repro/shared-worker https://github.com/Gabrola/expo expo-shared-worker-repro
cd expo-shared-worker-repro
npm install
npx expo start --web
```

This branch has no shared history with `expo/expo`. It holds only this app.

Open the page in two tabs.

The same result appears with a static export:

```sh
npx expo export --platform web
npx serve dist
```

## Actual result

Each tab shows:

```
new SharedWorker(...) returned: [object Worker]
worker.port: undefined
worker says: [object DedicatedWorkerGlobalScope], not shared
```

## Expected result

The first tab shows:

```
new SharedWorker(...) returned: [object SharedWorker]
worker.port: [object MessagePort]
worker says: [object SharedWorkerGlobalScope], connection #1
```

The second tab shows `connection #2`, because both tabs use the same worker.
