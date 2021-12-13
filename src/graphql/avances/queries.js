import { gql} from '@apollo/client'

const AVANCES = gql`
query Avances {
  Avances {
    _id
    fecha
    descripcion
    observaciones {
      descripcion
    }
  }
}
`
export {AVANCES}