import { gql } from '@apollo/client'

const GET_AVANCES    = gql `
    query Avances {
    Avances {
        _id
        fecha
        descripcion
        proyecto
        creadorPor
        observaciones
    }
}
`;
const GET_AVANCE = gql`
    query Usuario($id: String!) {
  Usuario(_id: $id) {
    _id
    nombre
    apellido
    identificacion
    correo
    estado
    rol
    inscripciones {
      _id
      estado
      fechaIngreso
    }
    avancesCreados {
      _id
      fecha
      descripcion
      proyecto {
        _id
        nombre
      }
    }
    proyectosLiderados {
      _id
      nombre
      fechaInicio
      fechaFin
      estado
      fase
      lider {
        _id
        nombre
        correo
      }
    }
  }
}
`;

export {GET_AVANCES, GET_AVANCE, }