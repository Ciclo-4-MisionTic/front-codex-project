import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import useFormData from 'hooks/useFormData';
import {  useQuery } from '@apollo/client' 

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
          <span className='subTitulo'>Nombre: {queryData.Usuario.nombre}</span>
          <span className='subTitulo' >Apellido: {queryData.Usuario.apellido}</span>
          <span className='subTitulo' >Correo Electronico: {queryData.Usuario.correo}</span>
          <span className='subTitulo' >Identificación : {queryData.Usuario.identificacion}</span>
          <span className='subTitulo' >Estado : {queryData.Usuario.estado}</span>
          <span className='subTitulo' >Rol: {queryData.Usuario.rol}</span>
          
          
        </table>
      </div>
    )
}

export default VerUsuario
