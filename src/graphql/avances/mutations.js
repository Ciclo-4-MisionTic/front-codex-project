import {gql} from '@apollo/client'

const EDITAR_AVANCE = gql`
mutation EditarAvance(
    $_id: String!
    $descripcion: String!
  ) {
    editarAvance(
      _id: $_id
      descripcion: $descripcion
    ) {
      _id
      descripcion

    }
  }
`;

export { EDITAR_AVANCE}