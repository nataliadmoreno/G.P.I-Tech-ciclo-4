import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { ListGroup } from 'react-bootstrap';

//import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TeamScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>G.P.I. Tech</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <EditScreenInfo path="/screens/TeamScreen.tsx" /> */}

      <div style={{ color: 'white' }}>
            <p>
                Esta aplicación fue desarrollada para cumplir con los requisitos del Ciclo 4 en la Misión TIC 2021:
            </p>
      <ListGroup as="ol" numbered>
        <ListGroup.Item as="li" action variant="dark">Wolfang Jesús Vera Mendoza</ListGroup.Item>
        <ListGroup.Item as="li" action variant="dark">Lina Bonilla Pérez</ListGroup.Item>
        <ListGroup.Item as="li" action variant="dark">Santiago Hewitt Ramírez</ListGroup.Item>
        <ListGroup.Item as="li" action variant="dark">Juan Sebastián Barrios Moreno</ListGroup.Item>
      </ListGroup>
      </div>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
