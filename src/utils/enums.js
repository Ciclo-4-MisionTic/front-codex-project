import PrivateComponent from "components/PrivateComponent";

const Enum_Rol = {
    ADMINISTRADOR: 'Administrador',
    ESTUDIANTE: 'Estudiante',
    LIDER: 'Líder',
};
const Enum_EstadoUsuario = {
  PENDIENTE: 'Pendiente',
  AUTORIZADO: 'Autorizado',
  NO_AUTORIZADO: 'No autorizado',
};
const Enum_EstadoEstudiante = {
  PENDIENTE: 'Pendiente',
  AUTORIZADO: 'Autorizado',
};


  export { Enum_Rol, Enum_EstadoUsuario , Enum_EstadoEstudiante}