import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client'
import { GET_AVANCE } from 'graphql/avances/queries';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { EDITAR_AVANCE } from 'graphql/usuarios/mutations';
import DropDown from 'components/Dropdown';

const EditarAvance = () => {

    const {form, formData, updateFormData } = useFormData(null)
    const { _id } = useParams();

    const {
        data:queryData,
        error: queryError,
        loading: queryLoading,
    } = useQuery(GET_AVANCE, {
        variables:{ _id },
    });

    const [editarAvance, { data: mutationData, loading: mutationLoading, error: mutationError}] =
        useMutation(EDITAR_AVANCE);

    
    const submitForm = (e)=>{
        e.preventDefault();
        delete formData.rol;
        editarAvance({
            variables: {_id,...formData},
        });
    };

    useEffect(()=>{
        if(mutationError){
            toast.error("Error modificando el avance")
        }
        if (queryError){
            toast.error("Error consultando el avance")
        }

    },[queryError, mutationError])

    useEffect(() => {
        if(mutationData){
            toast.success("Avance modificado correctamente")
        }

    },[mutationData]);
    
    if(queryLoading) return <div>Cargando...</div>;

    return (
        <div className='flew flex-col w-full h-full items-center justify-center p-10'>
        <Link to='/usuarios'>
          <i className='fas fa-arrow-left flechaRegresar' />
        </Link>
        <h1 className='titulo'>Editar Avance</h1>
        <form
          onSubmit={submitForm}
          onChange={updateFormData}
          ref={form}
          className='flex flex-col items-center justify-center'
        >
          <Input
            label='Descripción del Avance:'
            type='text'
            name='descripcion'
            defaultValue={queryData.Avance.descripcion}
            required={true}
          />
          <ButtonLoading disabled= {Object.keys(formData).length===0} loading={mutationLoading} text='Confirmar'/>
        </form>
      </div>
    )
}

export default EditarAvance
