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
    query Avance($_id: String!) {
    Avance(_id: $_id) {
        _id
        fecha
        descripcion
        proyecto
        creadorPor
        observaciones
    }
}
`;

export {GET_AVANCES, GET_AVANCE, }