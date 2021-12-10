import * as React from 'react';
import { StyleSheet } from 'react-native';

//import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Button, Dropdown, Form, Table } from 'react-bootstrap';

export default function UsersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Módulo de Gestión de Usuarios</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <EditScreenInfo path="/screens/UsersScreen.tsx" /> */}
  
      <div className='Users' style={{ color: 'white' }}>
        <h4>Usuarios</h4>

        <Form>
          <Form.Group className='mb-3' controlId='formBasicUserEmail'>
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control type='text' placeholder='Ingrese su correo electrónico' />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicUserId'>
            <Form.Label>Número de Identificación</Form.Label>
            <Form.Control type='number' placeholder='Ingrese su número de identificación' readOnly/>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicUserName'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control type='text' placeholder='Ingrese su nombre'/>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicUserPassword'>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type='password' placeholder='Ingrese su contraseña' />
          </Form.Group>

          <Button variant='light'>Actualizar usuario</Button>
        </Form>

        <hr />

        <Table striped bordered hover>
          <thead style={{ color: 'white' }}>
            <tr>
              <th>Id usuario</th>
              <th>Correo</th>
              <th>Identificación</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Actualizar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Id
              </td>
              <td>Correo1</td>
              <td>Identificación1</td>
              <td>Nombre1</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="info" id="dropdown-basic">
                    Pendiente
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Administrador</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Líder</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Estudiante</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="info" id="dropdown-basic">
                    Pendiente
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Autorizado</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">No Autorizado</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td>
                <Button variant='success'>Actualizar</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflowY: 'scroll',
    paddingTop: 260,
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
