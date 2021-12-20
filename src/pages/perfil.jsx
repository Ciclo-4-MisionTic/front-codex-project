import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import InputLeer from 'components/InputLeer';
import { EDITAR_PERFIL } from 'graphql/usuarios/mutations';
import useFormData from 'hooks/useFormData';
import { uploadFormData } from 'utils/uploadFormData';
import { useUser } from 'context/userContext';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [editFoto, setEditFoto] = useState(false);
  const { form, formData, updateFormData } = useFormData();
  const { userData, setUserData } = useUser();

  // falta capturar error de mutacion
  const [editarPerfil, { data: dataMutation, loading: loadingMutation }] =
    useMutation(EDITAR_PERFIL);

  // falta capturar error de query
  const {
    data: queryData,
    loading: queryLoading,
    refetch,
  } = useQuery(GET_USUARIO, {
    variables: {
      _id: userData._id,
    },
  });

  useEffect(() => {
    if (dataMutation) {
      setUserData({ ...userData, foto: dataMutation.editarPerfil.foto });
      toast.success('Perfil modificado con exito');
      refetch();
    }
  }, [dataMutation]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formUploaded = await uploadFormData(formData);

    editarPerfil({
      variables: {
        _id: userData._id,
        campos: formUploaded,
      },
    });
  };

  if (queryLoading) return <div>Loading...</div>;

  return (
    <div className='p-10 flex flex-col items-center justify-center w-full'>
      <h1 className='titulo'>Perfil del usuario</h1>
      <form className='letraMediana' ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <InputLeer
          defaultValue={queryData.Usuario.nombre}
          label='Nombre'
          name='nombre'
          type='text'
          readonly
        />
        <InputLeer
          defaultValue={queryData.Usuario.apellido}
          label='Apellido'
          name='apellido'
          type='text'
          readonly
        />
        <InputLeer
          defaultValue={queryData.Usuario.identificacion}
          label='Identificación'
          name='identificacion'
          type='text'
          value="Dato de solo lectura" readonly
        />
        <div className='p-10 flex flex-col items-center justify-center w-full'>
          <span className='subTitulo' >Estado : {queryData.Usuario.estado}</span>
          <span className='subTitulo' >Rol: {queryData.Usuario.rol}</span>
        </div>
        {/* {queryData.Usuario.foto && !editFoto ? (
          <div className='flex flex-col items-center'>
            <img
              className='h-32'
              src={queryData.Usuario.foto}
              alt='Foto Usuario'
            />
            <button
              type='button'
              onClick={() => setEditFoto(true)}
              className='bg-indigo-300 p-1 my-2 rounded-md text-white'
            >
              Cambiar imagen
            </button>
          </div>
        ) : (
          <div>
            <Input label='Foto' name='foto' type='file' required />
            <button
              type='button'
              onClick={() => setEditFoto(false)}
              className='bg-indigo-300 p-1 my-2 rounded-md text-white'
            >
              Cancelar
            </button>
          </div>
        )}
        <ButtonLoading
          text='Confirmar'
          loading={loadingMutation}
          disabled={false}
        /> */}
        <button className='buttonCrear items-center justify-center'>
          <Link to={`/perfil/editarPerfil`}>
            Editar Perfil
          </Link>
        </button>
      </form>
    </div>
  );
};

export default Profile;