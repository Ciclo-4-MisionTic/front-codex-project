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
import useFormData from 'hooks/useFormData';
import { CREAR_PROYECTO } from 'graphql/proyectos/mutations';
import { ObjContext, useObj } from 'context/objContext';
import { toast } from 'react-toastify';

const NuevoProyecto = () => {
  const {form, formData, updateFormData } = useFormData();
  const [listaUsuarios, setListaUsuarios] = useState({});
  const { data, loading, error } = useQuery(GET_USUARIOS,{
    variables:{
      filtro:{rol: 'LIDER', estado: 'AUTORIZADO'}
    }
  });
  
  const [crearProyecto, {data: mutationData, loading: mutationLoading, error:mutationError}] = 
  useMutation(CREAR_PROYECTO)


  useEffect(() =>{
    console.log(data);
    if(data){
      const lu = {}
      data.Usuarios.forEach((elemento) =>{
        lu[elemento._id] = elemento.correo;
      });
      setListaUsuarios(lu)
    }
  },[data]);

  useEffect(()=>{
    if(mutationError){
        toast.error("Error creando el proyecto")
    }
},[mutationError])

useEffect(() => {
    if(mutationData){
        toast.success("Proyecto creado correctamente")
    }

},[mutationData]);

  useEffect(()=>{
    console.log("data mutation", mutationData)
  })



  const submitForm = (e)=>{
    e.preventDefault();
    
    formData.objetivos = Object.values(formData.objetivos);
    formData.presupuesto = parseFloat(formData.presupuesto);
    
    crearProyecto({
      variables: formData,
    });

  } 

  if (loading) return <div>...Cargando</div>

    return (
        <PrivateRoute roleList={['LIDER']}>
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
              <Objetivos />
              <ButtonLoading loading={false} disabled={false} text='Crear Proyecto' />
            </form>
          </div>
        </PrivateRoute>
      );
    };

const Objetivos = () =>{

  const [listaObjetivos, setListaObjetivos] = useState([]);
  const [maxObjetivos, setMaxObjetivos] = useState(false)

  const eliminarObjetivo = (id) => {
    setListaObjetivos(listaObjetivos.filter((el) => el.props.id !== id));
  };

  const componenteObjetivoAgregado = () => {
    const id = nanoid();
    return <FormObjetivo key={id} id={id}/>;
  }

  useEffect(() =>{
    if (listaObjetivos.length > 4){
      setMaxObjetivos(true);
    }
    else{
      setMaxObjetivos(false);
    }
  }, [listaObjetivos]);
  return(
    <ObjContext.Provider value={{ eliminarObjetivo }}>
      <div>
        <span>Objetivos del Proyecto</span>
        {!maxObjetivos && (
            <i 
            onClick={() => setListaObjetivos([...listaObjetivos, componenteObjetivoAgregado()])}
            className='fas fa-plus rounded-full bg-moradoClaro-dark hover:bg-moradoClaro-default text-white p-2 mx-2 cursor-pointer'
            />
          )}

        {listaObjetivos.map((objetivo)=> {
          return objetivo;
        })}
      </div>
    </ObjContext.Provider>
  );
};

const FormObjetivo = ({ id })=> {
  const {eliminarObjetivo} = useObj();
  return(
    <div className='flex items-center'> 
      <Input 
      name={`nested||objetivos||${id}||descripcion`} 
      label='Descripción' 
      type='text' 
      required={true} 
      />
      <DropDown 
      name={`nested||objetivos||${id}||tipo`}
      options={Enum_TipoObjetivo} 
      label='Tipo de Objetivo' 
      required={true}
      />
      <i 
      onClick={()=> eliminarObjetivo(id)} className='fas fa-minus rounded-full bg-moradoClaro-dark hover:bg-moradoClaro-default text-white p-2 mx-2 cursor-pointer mt-6'/>
    </div>
  )
}

export default NuevoProyecto




 