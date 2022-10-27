import React, {useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import {launch} from 'react-native-authsignal';

const AUTHENTICATE_URL = 'http://localhost:3000/authenticate';
const VALIDATE_URL = 'http://localhost:3000/validate';

function App() {
  const [username, setUsername] = useState('chrisfisheras33');
  const [challengeState, setChallengeState] = useState(null);
  const [loading, setLoading] = useState(false);

  const onPress = async () => {
    setLoading(true);
    setChallengeState(null);

    const {url} = await post(AUTHENTICATE_URL, {username});

    const token = await launch(url);

    if (token) {
      const {state} = await post(VALIDATE_URL, {username, token});

      setChallengeState(state);
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>WebAuthn Example</Text>

      <TextInput
        style={styles.input}
        placeholder="username"
        onChangeText={setUsername}
        value={username}
        autoCapitalize={'none'}
        autoCorrect={false}
      />

      <Pressable style={styles.button} disabled={loading} onPress={onPress}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.buttonText}>Authenticate</Text>
        )}
      </Pressable>

      <Text>Challenge state: {challengeState}</Text>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    alignSelf: 'stretch',
    margin: 20,
    height: 40,
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'black',
    height: 55,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
    textTransform: 'uppercase',
  },
});

const post = (url: string, body: any) =>
  fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  }).then(r => r.json());
