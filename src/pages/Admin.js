import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

function Admin() {
  return (
    <WebView
      source={{ uri: `https://obraia.github.io` }}
      style={styles.webview}
    />
  );
}

const styles = StyleSheet.create({
  webview: {
    backgroundColor: '#2b2f31',
    flex: 1,
  },
});

export default Admin;
