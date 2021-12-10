import * as React from 'react';
import { StyleSheet } from 'react-native';

//import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Button, Dropdown, Form, Table } from 'react-bootstrap';

export default function RegistrationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Módulo de Gestión de Inscripciones</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <EditScreenInfo path="/screens/RegistrationsScreen.tsx" /> */}

      <div className='Registrations' style={{ color: 'white' }}>
        <h4>Inscripciones</h4>

        <Form>
          <Form.Group className='mb-3' controlId='formBasicRegistrationId'>
            <Form.Label>Id inscripción</Form.Label>
            <Form.Control type='text' placeholder='Ingrese el ID de la inscripción' />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicStudentId'>
            <Form.Label>Id estudiante</Form.Label>
            <Form.Control type='number' placeholder='ID del estudiante' readOnly/>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicProjectId'>
            <Form.Label>Id proyecto</Form.Label>
            <Form.Control type='text' placeholder='ID del proyecto' readOnly/>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicRegistrationStatus'>
            <Form.Label>Estado inscripción</Form.Label>
            <Form.Control type='number' placeholder='Ingrese la cantidad de productos' />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicAdmissionDate'>
            <Form.Label>Fecha ingreso</Form.Label>
            <Form.Control type='date' placeholder='Ingrese la fecha de ingreso' readOnly />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicDischargeDate'>
            <Form.Label>Fecha egreso</Form.Label>
            <Form.Control type='date' placeholder='Ingrese la fecha de egreso' readOnly />
          </Form.Group>

          <Button variant='light'>Añadir</Button>
        </Form>

        <hr />

        <Table striped bordered hover>
          <thead style={{ color: 'white' }}>
            <tr>
              <th>Id inscripción</th>
              <th>Id estudiante</th>
              <th>Id proyecto</th>
              <th>Estado inscripción</th>
              <th>Fecha ingreso</th>
              <th>Fecha egreso</th>
              <th>Actualizar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Id
              </td>
              <td>Estudiante1</td>
              <td>Proyecto1</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="info" id="dropdown-basic">
                    Pendiente
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Aceptada</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Rechazada</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td>Date1</td>
              <td>Date2</td>
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
    paddingTop: 360,
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
