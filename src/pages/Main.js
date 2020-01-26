import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../services/api';

function Main({ navigation }) {
  const [devs, setDevs] = useState([]);
  const [techs, setTechs] = useState('');
  const [currentRegion, setCurrentRegion] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
        //setKeyboardHeight = Keyboard.
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    async function loadInicialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.015 * 1.2,
          longitudeDelta: 0.0121 * 1.2,
        });
      }
    }
    loadInicialPosition();
  }, []);

  function loadDevs() {
    if (techs.toLowerCase() != 'all') {
      loadFilteredDevs();
    } else {
      loadAllDevs();
    }
  }

  async function loadAllDevs() {
    const response = await api.get('/devs');

    setDevs(response.data);
  }

  async function loadFilteredDevs() {
    const { latitude, longitude } = currentRegion;

    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs,
      },
    });

    setDevs(response.data.devs);
  }

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <MapView
        initialRegion={currentRegion}
        onRegionChangeComplete={handleRegionChanged}
        style={styles.map}>
        {devs.map(dev => (
          <Marker
            key={dev._id}
            coordinate={{
              latitude: dev.location.coordinates[1],
              longitude: dev.location.coordinates[0],
            }}>
            <Image style={styles.marker} source={{ uri: dev.avatar_url }} />

            <Callout
              onPress={() => {
                navigation.navigate('Profile', {
                  github_username: dev.github_username,
                });
              }}>
              <View style={styles.callout}>
                <Text style={styles.calloutName}>{dev.name}</Text>
                <Text style={styles.calloutBio}>{dev.bio}</Text>
                <Text style={styles.calloutTechs}>{dev.techs.join(', ')}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.adminButton}>
        <TouchableOpacity
          title="Admin"
          onPress={() => navigation.navigate('Admin')}>
          <MaterialIcons
            name="person-add"
            size={20}
            color="#fff"
            style={styles.searchButton}
          />
        </TouchableOpacity>
      </View>

      <View
        style={[
          isKeyboardVisible ? styles.searchFormKeyboard : styles.searchForm,
        ]}>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar devs..."
            placeholderTextColor="#CCC"
            autoCapitalize="words"
            value={techs}
            onChangeText={setTechs}
          />

          <TouchableOpacity onPress={loadDevs}>
            <MaterialIcons
              name="my-location"
              size={20}
              color="#fff"
              style={styles.searchButton}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    backgroundColor: '#2b2f31',
    height: '100%',
  },
  marker: {
    height: 50,
    width: 50,
    borderColor: '#28a745',
    borderWidth: 1,
    borderRadius: 25,
  },
  callout: {
    width: 200,
    padding: 5,
  },
  calloutName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
  },
  calloutBio: {
    padding: 3,
    marginVertical: 3,
    textAlign: 'center',
    fontSize: 10,
    fontStyle: 'italic',
  },
  calloutTechs: {
    fontSize: 12,
    color: '#8a8a8a',
  },
  adminButton: {
    width: '100%',
    position: 'absolute',
    top: 10,
    right: 10,
    alignItems: 'flex-end',
  },
  searchForm: {
    width: '100%',
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
  searchFormKeyboard: {
    width: '100%',
    position: 'absolute',
    bottom: 300,
    alignItems: 'center',
  },
  formGroup: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  searchInput: {
    width: '85%',
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#2b2f31',
    color: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 3,
  },
  searchButton: {
    justifyContent: 'center',
    alignContent: 'center',
    padding: 10,
    backgroundColor: '#28a745',
    borderRadius: 20,
  },
});

export default Main;
