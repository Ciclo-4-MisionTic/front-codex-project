import { gql } from '@apollo/client'

const GET_LOGIN = gql`
    query Login($_id: String!) {
    Login(_id: $_id) {
        _id
        nombre
        apellido
        correo
        estado
        identificacion
        rol
    }
}
`;


export { GET_LOGIN }