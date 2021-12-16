import { gql } from '@apollo/client';

const AVANCES = gql`
query Avances {
  Avances {
    _id
    fecha
    descripcion
    proyecto {
      nombre
    }
    observaciones {
      descripcion
    }
  }
}
`
const GET_AVANCES = gql`
  query Avances($project: String) {
    Avances(project: $project) {
      _id
      descripcion
      fecha
      observaciones
      proyecto {
        nombre
      }
    }
  }
`;

export { GET_AVANCES };