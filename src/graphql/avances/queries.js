import { gql} from '@apollo/client'

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
export {AVANCES}