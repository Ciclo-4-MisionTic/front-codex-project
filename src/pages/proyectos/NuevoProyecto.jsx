import React, { useEffect, useState} from 'react'
import Input from 'components/Input';
import { Link } from 'react-router-dom';
import DropDown from 'components/Dropdown';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import PrivateRoute from 'components/PrivateRoute';
import ButtonLoading from 'components/ButtonLoading';
import { nanoid } from 'nanoid';
import { Enum_TipoObjetivo } from 'utils/enums';
// import { CreateObjectiveContext } from 'context/createObjectiveContext';
//import { useCreateObjective} from 'context/createObjetiveContext'
import useFormData from 'hooks/useFormData';
import { CREAR_PROYECTO } from 'graphql/proyectos/mutations';

const NuevoProyecto = () => {
  const {form, formData, updateFormData } = useFormData();
  const [listaUsuarios, setListaUsuarios] = useState({});
  const { data, loading, error } = useQuery(GET_USUARIOS,{
    variables:{
      filtro:{rol: 'LIDER', estado: 'AUTORIZADO'}
    }
  });
  
  useEffect(() =>{
    console.log(data);
    if(data){
      const lu = {}
      data.Usuarios.forEach(elemento =>{
        lu[elemento._id] = elemento.correo;
      });
      setListaUsuarios(lu)
    }
  },[data]);

  const submitForm = (e)=>{
    e.preventDefault();
    console.log(formData);
  } 

  if (loading) return <div>...Cargando</div>

    return (
        // <PrivateRoute roleList={['ADMINISTRADOR', 'LIDER']}>
          <div className='p-10 flex items-center flex-col'>
              <div className='self-start' >
                <Link to='/proyectos'>
                <i className='fas fa-arrow-left flechaRegresar' />
                </Link>
              </div>
            <div className='flex w-full items-center justify-center'>
              <h1 className='titulo'>Crear un nuevo Proyecto</h1>
            </div>
            <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
              <Input label='Nombre del Proyecto' name='nombre' type='text' required={true} />
              <Input label='Presupuesto' name='presupuesto' type='number' required={true} />
              <Input label='Fecha de Inicio' name='fechaInicio' type='date' required={true} />
              <Input label='Fecha de Fin' name='fechaFin' type='date' required={true} />
              <DropDown label='Líder' name='lider' required={true} options={listaUsuarios} />
              {/* <Objetivos /> */}
              <ButtonLoading loading={false} disabled={false} text='Crear Proyecto' />
            </form>
          </div>
        // </PrivateRoute>
      );
    };

export default NuevoProyecto




 