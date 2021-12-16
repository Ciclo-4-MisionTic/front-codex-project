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
`;

export {EDITAR_AVANCE,CREAR_AVANCE};