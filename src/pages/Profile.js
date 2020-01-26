import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

function Profile({ navigation }) {
  const github_username = navigation.getParam('github_username');

  return (
    <WebView
      source={{ uri: `https://github.com/${github_username}` }}
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

export default Profile;
