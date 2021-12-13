import { gql} from '@apollo/client'

const PROYECTOS = gql `
    query Proyectos {
    Proyectos {
        _id
        nombre
        estado
        fase
        lider {
            _id
            nombre
        }
        objetivos {
        tipo
        descripcion
        }
    }
    }
`
export {PROYECTOS}