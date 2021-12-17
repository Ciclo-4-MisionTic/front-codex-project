import { gql } from '@apollo/client';

const EDITAR_AVANCE = gql`
mutation EditarAvance($id: String!, $descripcion: String) {
  editarAvance(_id: $id, descripcion: $descripcion) {
    _id
  }
}
`

const CREAR_AVANCE = gql`
  mutation Mutation(
    $fecha: Date!
    $descripcion: String!
    $proyecto: String!
    $creadoPor: String!
  ) {
    crearAvance(
      fecha: $fecha
      descripcion: $descripcion
      proyecto: $proyecto
      creadoPor: $creadoPor
    ) {
      _id
    }
  }
  `
  const CREAR_OBSERVACION=gql`
  mutation MutationCrearObservacion($id: String!, $observacion: String!) {
    crearObservacion(_id: $id, observacion: $observacion) {
    _id
    observaciones  
    }
  }

`;


export {EDITAR_AVANCE,CREAR_AVANCE,CREAR_OBSERVACION};