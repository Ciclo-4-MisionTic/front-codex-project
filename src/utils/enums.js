
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
const Enum_EstadoProyecto = {
  ACTIVO: 'Activo',
  INACTIVO: 'Inactivo',
};

const Enum_FaseProyecto = {
  INICIADO: 'Iniciado',
  DESARROLLO: 'Desarrollo',
  TERMINADO: 'Terminado',
  NULO: 'Nulo'
};

const Enum_TipoObjetivo = {
  GENERAL: 'General',
  ESPECIFICO: 'Específico',
};

const Enum_EstadoEstudiante = {
  PENDIENTE: 'Pendiente',
  AUTORIZADO: 'Autorizado',
};


  export { Enum_Rol, Enum_EstadoUsuario , Enum_EstadoEstudiante, Enum_EstadoProyecto, Enum_FaseProyecto, Enum_TipoObjetivo}
