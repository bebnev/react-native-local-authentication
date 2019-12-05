import React, {useReducer, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar, Platform, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import LocalAuthentication, {getBiometryStatusDescription} from 'rn-local-authentication';
import Row from './Row';
import {booleanToString} from './utils';
import {biometryInitialState, biometryReducer, authorizationInitialState, authorizationReducer} from './state';

const App = () => {
  const [biometryState, dispatch] = useReducer(biometryReducer, biometryInitialState);
  const [authState, dispatchAuth] = useReducer(authorizationReducer, authorizationInitialState);

  useEffect(() => {
    LocalAuthentication.isSupportedAsync().then(isSupported => {
      dispatch({type: 'set.supported', payload: isSupported});

      if (isSupported) {
        LocalAuthentication.isAvailableAsync().then(isAvailable => {
          dispatch({type: 'set.available', payload: isAvailable})
        });

        LocalAuthentication.getBiometryStatusAsync().then(status => {
          dispatch({type: 'set.status', payload: status});
        })
      }
    })
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.table}>
            <View style={[styles.headerContainer, styles.pageMargin]}>
              <Text style={styles.headerText}>Biometry Information</Text>
            </View>
            <View style={[styles.bodyContainer, styles.pageMargin]}>
              <Row labelText="Has scanner" valueText={booleanToString(biometryState.isSupported)} />
              {Platform.OS === 'ios' ? <Row labelText="Biometry type" valueText={LocalAuthentication.getBiometryType()} /> : null}
              <Row labelText="Scanner is available" valueText={booleanToString(biometryState.isAvailable)} />
              <Row labelText="Biometry status" valueText={biometryState.status} />
              <Text style={styles.statusDescription}>{getBiometryStatusDescription(biometryState.status)}</Text>
            </View>
          </View>
          {authState.response ? (<View style={styles.table}>
            <View style={[styles.headerContainer, styles.pageMargin]}>
              <Text style={styles.headerText}>Authorization...</Text>
            </View>
            <View style={[styles.bodyContainer, styles.pageMargin]}>
            <Row labelText="Authorized?" valueText={booleanToString(authState.response.success)} />
            {authState.response.error ? <Text style={styles.statusDescription}>{getBiometryStatusDescription(authState.response.error)}</Text> : null}
            </View>
          </View>) : null}
        </View>
        <TouchableOpacity onPress={() => {
          if (!biometryState.isSupported) {
            return Alert.alert('Error', 'Device does not support biometry.');
          }

          if (authState.loading) {
            return;
          }

          dispatchAuth({type: 'auth.request'});

          LocalAuthentication.authenticateAsync({
            reason: 'Authenticate me please',
          }).then(response => {
            dispatchAuth({type: 'auth.finish', payload: response})
          }).catch(e => {
            dispatchAuth({type: 'auth.error', payload: e.message});
          });
        }} style={styles.button}>
          {!authState.loading ? <Text style={styles.buttonText}>AUTHORIZE</Text> : <ActivityIndicator size="small" color="white"/>}
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  table: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 7,
    marginVertical: 8,
  },
  pageMargin: {
    marginHorizontal: 5,
    paddingVertical: 8,
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  headerText: {
    fontSize: 16
  },
  bodyContainer: {},

  statusDescription: {
    fontSize: 10,
    color: '#999999',
  },

  button: {
    alignItems: 'center',
    marginVertical: 16,
    paddingVertical: 8,
    marginHorizontal: 16,
    borderRadius: 7,
    backgroundColor: '#1E90FF'
  },
  buttonText: {
    color: 'white'
  }
});

export default App;
