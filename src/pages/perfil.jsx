import React, { useEffect } from 'react';
import { useMutation} from '@apollo/client';
import ButtonLoading from 'components/ButtonLoading';
import Input from 'components/Input';
import { EDITAR_PERFIL } from 'graphql/usuarios/mutations';
import useFormData from 'hooks/useFormData';
import { uploadFormData } from 'utils/uploadFormData';
import { useUser } from 'context/userContext';


const Perfil = () => {
    const { form , formData , updateFormData } = useFormData();

    const {userData} = useUser();

    const [editarPerfil, {data: dataMutation, error: errorMutation, loading: loadingMutation}]=
    useMutation(EDITAR_PERFIL);

    useEffect(() => {
        console.log("data mutation", dataMutation);
    }, [dataMutation]);

    useEffect(() => {
        console.log("userData", userData);
    }, [userData]);

    const submitForm = async(e) => {
        e.preventDefault();

        const formUploaded = await uploadFormData(formData);
        console.log("form cargando",formUploaded);

        editarPerfil({
            variables:{
                _id: userData._id,
                campos:formUploaded
            } ,
        })
    };


    return (
        <div className='p-10 flex items-center flex-col justify-start w-full'>
            <h1 className='titulo'>Perfil del Usuario</h1>
            <form className='subTitulo' ref={form} oneChange={updateFormData} oneSumit={submitForm} >
                <Input label='Nombre' name='nombre' type ='texto' required={true} />
                <Input label='Apellido' name='apellido' type ='texto' required={true} />
                <Input label='Identificación' name='identificacion' type ='texto' required={true} />
                <Input className='justify-start items-center subTitulo' label='Foto' name='foto' type ='file' required={true} />

                <ButtonLoading text='Confirmar' loading = {loadingMutation} disabled={false} />
            </form>
        </div>
    )
}

export default Perfil
