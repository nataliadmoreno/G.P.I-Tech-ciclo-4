import * as React from 'react';
import { StyleSheet } from 'react-native';

//import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Button, Dropdown, DropdownButton, Form, Table } from 'react-bootstrap';

export default function RegistrationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Módulo de Gestión de Inscripciones</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <EditScreenInfo path="/screens/RegistrationsScreen.tsx" /> */}


      <div className='Registrations'>
          <h4>Inscripciones</h4>

          <Form>
            <Form.Group className='mb-3' controlId='formBasicRegistrationId'>
              <Form.Label>Id inscripción</Form.Label>
              <Form.Control type='text' placeholder='Ingrese el ID de la inscripción' />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicStudentId'>
              <Form.Label>Id estudiante</Form.Label>
              <Form.Control type='number' placeholder='Ingrese el ID del estudiante' />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicProjectId'>
              <Form.Label>Id proyecto</Form.Label>
              <Form.Control type='text' placeholder='Ingrese el ID del proyecto' />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicRegistrationStatus'>
              <Form.Label>Estado inscripción</Form.Label>
              <Form.Control type='number' placeholder='Ingrese la cantidad de productos' />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicAdmissionDate'>
              <Form.Label>Fecha ingreso</Form.Label>
              <Form.Control type='date' placeholder='Ingrese la fecha de ingreso' />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicDischargeDate'>
              <Form.Label>Fecha egreso</Form.Label>
              <Form.Control type='date' placeholder='Ingrese la fecha de egreso' />
            </Form.Group>

            <Button variant='info'>Añadir</Button>
          </Form>

          <hr/>

          <Table striped bordered hover>
            <thead>
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
                  <DropdownButton id="dropdown-basic-button" title="Estado">
                    <Dropdown.Item href="#/action-1">Pendiente</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Aceptada</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Rechazada</Dropdown.Item>
                  </DropdownButton>
                </td>
                <td>Date1</td>
                <td>Date2</td>
                <td>
                  <Button variant='warning'>Actualizar</Button>
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
