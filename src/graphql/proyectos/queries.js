import { gql} from '@apollo/client'

const PROYECTOS = gql `
    query Proyectos {
    Proyectos {
        _id
        nombre
        presupuesto
        fechaInicio
        fechaFin
        estado
        fase
        lider {
            _id
            nombre
            apellido
            correo
        }
        objetivos {
        tipo
        descripcion
        
        }
    }
    }
`
export {PROYECTOS}