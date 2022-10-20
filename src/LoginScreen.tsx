import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, TextInput} from 'react-native';
import {StackParamList} from './types';

type Props = NativeStackScreenProps<StackParamList, 'LoginScreen'>;

export const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const onLogin = async () => {
    const res = await fetch('http://localhost:3000/api/webauthn/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username}),
    }).then(r => r.json());

    navigation.navigate('WebAuthnScreen', {url: `${res.url}&mode=popup`});

    // setLoggedIn(true);
  };

  const onLogout = () => {
    setLoggedIn(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>WebAuthn Example</Text>
      {loggedIn ? (
        <>
          <Button onPress={onLogout} title={'Log Out'} />
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="username"
            onChangeText={setUsername}
            value={username}
            autoCapitalize={'none'}
            autoCorrect={false}
          />
          <Button onPress={onLogin} title={'Log In'} />
        </>
      )}
    </SafeAreaView>
  );
};

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
});
