import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client'
import { GET_USUARIO } from 'graphql/usuarios/queries';
import InputLeer from 'components/inputleer';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { EDITAR_USUARIO } from 'graphql/usuarios/mutations';
import DropDown from 'components/Dropdown';
import { Enum_EstadoUsuario } from 'utils/enums';
import PrivateComponent from 'components/PrivateComponent';

const VerUsuario = () => {

    const {form, formData, updateFormData } = useFormData(null)
    const { _id } = useParams();

    const {
        data:queryData,
        error: queryError,
        loading: queryLoading,
    } = useQuery(GET_USUARIO, {
        variables:{ _id },
    });


    
    if(queryLoading) return <div>Cargando....</div>;

    return (
        <div className='flew flex-col w-full h-full items-center justify-center p-10'>
        <Link to='/usuarios'>
          <i className='fas fa-arrow-left flechaRegresar' />
        </Link>
        <h1 className='titulo'>Información Usuario</h1>
        <table
          className='flex flex-col items-center justify-center'
        >
          <span className='letraMediama'>Nombre: {queryData.Usuario.nombre}</span>
          <span className='letraMediama' >Apellido: {queryData.Usuario.apellido}</span>
          <span className='letraMediama' >Correo Electronico: {queryData.Usuario.correo}</span>
          <span className='letraMediama' >Identificación : {queryData.Usuario.identificacion}</span>
          <span className='letraMediama' >Estado : {queryData.Usuario.estado}</span>
          <span className='letraMediama' >Rol: {queryData.Usuario.rol}</span>
          
        </table>
      </div>
    )
}

export default VerUsuario
