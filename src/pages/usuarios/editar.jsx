import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client'
import { GET_USUARIO } from 'graphql/usuarios/queries';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { EDITAR_USUARIO } from 'graphql/usuarios/mutations';
import DropDown from 'components/Dropdown';
import { Enum_EstadoUsuario } from 'utils/enums';
import PrivateComponent from 'components/PrivateComponent';
import { Enum_EstadoEstudiante } from 'utils/enums';

const EditarUsuario = () => {

    const {form, formData, updateFormData } = useFormData(null)
    const { _id } = useParams();

    const {
        data:queryData,
        error: queryError,
        loading: queryLoading,
    } = useQuery(GET_USUARIO, {
        variables:{ _id },
    });

    const [editarUsuario, { data: mutationData, loading: mutationLoading, error: mutationError}] =
        useMutation(EDITAR_USUARIO);

    const submitForm = (e)=>{
        e.preventDefault();
        delete formData.rol;
        editarUsuario({
            variables: {_id,...formData},
        });
    };

    useEffect(()=>{
        if(mutationError){
            toast.error("Error modificando el usuario")
        }
        if (queryError){
            toast.error("Error consultando el usuario")
        }

    },[queryError, mutationError])

    useEffect(() => {
        if(mutationData){
            toast.success("Usuario modificado correctamente")
        }

    },[mutationData]);

    if(queryLoading) return <div>Cargando....</div>;

    return (
        <div className='flew flex-col w-full h-full items-center justify-center p-10'>
        <Link to='/usuarios'>
          <i className='fas fa-arrow-left flechaRegresar' />
        </Link>
        <h1 className='titulo'>Editar Usuario</h1>
        <form
          onSubmit={submitForm}
          onChange={updateFormData}
          ref={form}
          className='flex flex-col items-center justify-center'
        >
          {/* <PrivateComponent roleList= {["ADMINISTRADOR"]}>
          <Input
            label='Nombre de la persona:'
            type='text'
            name='nombre'
            defaultValue={queryData.Usuario.nombre}
            required={true}
          />
          </PrivateComponent>
          <PrivateComponent roleList= {["ADMINISTRADOR"]}>
          <Input
            label='Apellido de la persona:'
            type='text'
            name='apellido'
            defaultValue={queryData.Usuario.apellido}
            required={true}
          />
          </PrivateComponent>
          <PrivateComponent roleList= {["ADMINISTRADOR"]}>
          <Input
            label='Correo de la persona:'
            type='email'
            name='correo'
            defaultValue={queryData.Usuario.correo}
            required={true}
          />
          </PrivateComponent>
          <PrivateComponent roleList= {["ADMINISTRADOR"]}>
          <Input
            label='Identificación de la persona:'
            type='text'
            name='identificacion'
            defaultValue={queryData.Usuario.identificacion}
            required={true}
          />
          </PrivateComponent> */}

          <PrivateComponent roleList= {["ADMINISTRADOR"]}>
          <DropDown
            label='Estado de la persona:'
            name='estado'
            defaultValue={queryData.Usuario.estado}
            required={true}
            options={Enum_EstadoUsuario}
          />
          </PrivateComponent>

          <PrivateComponent roleList= {["LIDER"]}>
          <DropDown
            label='Estado de la persona:'
            name='estado'
            defaultValue={queryData.Usuario.estado}
            required={true}
            options={Enum_EstadoEstudiante}
          />
          </PrivateComponent>

          <PrivateComponent roleList= {['ESTUDIANTE']}>
          <span>Estado del usuario: {queryData.Usuario.estado}</span>
          </PrivateComponent>

          <span>Rol del usuario: {queryData.Usuario.rol}</span>

          <ButtonLoading disabled= {Object.keys(formData).length===0} loading={mutationLoading} text='Confirmar'/>
        </form>
      </div>
    )
}

export default EditarUsuario