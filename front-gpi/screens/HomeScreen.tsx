import * as React from 'react';
import { StyleSheet } from 'react-native';

//import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Button, Form } from 'react-bootstrap';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Módulo de Ingreso</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <EditScreenInfo path="/screens/HomeScreen.tsx" /> */}

      <div className='LogIn' style={{ color: 'white' }}>
        {/* <h4>Log In</h4> */}

        <Form>
          <Form.Group className='mb-3' controlId='formBasicUserEmail'>
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control type='text' placeholder='Ingresa tu correo electrónico' />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicUserPassword'>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type='password' placeholder='Ingresa tu contraseña' />
          </Form.Group>

          <hr />

          <Button variant='light'>Ingresar</Button>

          <hr />

          <h6>¿no estás registrado?</h6>

          <hr />

          <Button variant='info'>Crear un usuario</Button>
        </Form>
      </div>
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
    //fontFamily: 'Montserrat',
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
