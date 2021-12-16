import React from 'react'
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
import { CREAR_AVANCE } from 'graphql/avances/mutations';

const NuevoAvance = () => {
    return (
        // <PrivateRoute roleList={['ADMINISTRADOR', 'ESTUDIANTE']}>
          <div className='p-10 flex items-center flex-col'>
              <div className='self-start' >
                <Link to='/avances'>
                <i className='fas fa-arrow-left flechaRegresar' />
                </Link>
              </div>
            <div className='flex w-full items-center justify-center'>
              <h1 className='titulo'>Crear un nuevo Avance</h1>
            </div>
            {/* <form ref={form} onChange={updateFormData} onSubmit={submitForm}> */}
            <form>
              <Input label='Fecha' name='fecha' type='date' required={true} />
              <Input label='Descripción' name='descripcion' type='text' required={true} />
              <Input label='Proyecto' name='proyecto' type='text' required={true} />
              <Input label='Creado por ' name='CreadoPor' type='text' required={true} />
              {/* <DropDown label='Administrador' name='administrador' required={true} options={mapUsuarios} /> */}
              <ButtonLoading loading={false} text='Crear Avance' />
            </form>
          </div>
        // </PrivateRoute>
      );
    };

export default NuevoAvance