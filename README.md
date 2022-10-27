An example React Native app showing how to use the [Authsignal React Native library](https://github.com/authsignal/react-native-authsignal).

The example also includes an Express web server which the React Native app calls. This server has 2 endpoints:

- http://localhost:3000/authenticate (initiates a challenge)
- http://localhost:3000/validate (validates the result of a challenge)

To learn more about how to enroll and challenge users take a look at our [API documentation](https://docs.authsignal.com/quickstarts/node).

## Steps

1. Install dependencies:

```sh
yarn install
```

2. Edit `api/index.js` and provide your own API secret key:

```js
const secret = 'YOUR_SECRET_KEY'; // Update this
```

3. Start the API server:

```sh
yarn api
```

4. Run the React Native app:

```sh
yarn ios # or yarn android
```
