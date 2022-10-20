import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {StackParamList} from './types';

type Props = NativeStackScreenProps<StackParamList, 'WebAuthnScreen'>;

export const WebAuthnScreen = ({navigation, route}: Props) => {
  const injectedJavaScript = `
    window.addEventListener("message", function(event) {
      try {
        var data = JSON.parse(event.data);
        if (data.event === "AUTHSIGNAL_CLOSE_POPUP") {
          window.ReactNativeWebView.postMessage(data.token);
        } else {
          window.ReactNativeWebView.postMessage(null);
        }
      } catch {
        // Ignore if the event data is not valid JSON
      }
    }, false);

    true;
  `;

  return (
    <WebView
      source={{uri: route.params.url}}
      style={styles.container}
      onMessage={event => {
        const token = event.nativeEvent.data;

        if (token) {
          console.log('token', token);
        }

        navigation.goBack();
      }}
      injectedJavaScript={injectedJavaScript}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});
