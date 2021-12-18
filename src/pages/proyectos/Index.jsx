import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import { useMutation, useQuery } from '@apollo/client';
import { PROYECTOS } from 'graphql/proyectos/queries';
import DropDown from 'components/Dropdown';
import { Dialog, Input } from '@mui/material';
import { Enum_EstadoProyecto } from 'utils/enums';
import ButtonLoading from 'components/ButtonLoading';
import { EDITAR_PROYECTO } from 'graphql/proyectos/mutations';
import useFormData from 'hooks/useFormData';
import PrivateComponent from 'components/PrivateComponent';
import { Enum_FaseProyecto } from 'utils/enums';
import { Link } from 'react-router-dom';

const AccordionStyled = styled((props) => <Accordion {...props} />)(({ theme }) => ({
  backgroundColor: '#8C515C',
}));
const AccordionSummaryStyled = styled((props) => <AccordionSummary {...props} />)(({ theme }) => ({
  backgroundColor: '#8C515C',
}));
const AccordionDetailsStyled = styled((props) => <AccordionDetails {...props} />)(({ theme }) => ({
  backgroundColor: '#D9BFC4',
}));

const IndexProyectos = () => {
  const { data: queryData, loading, error } = useQuery(PROYECTOS);

  useEffect(() => {
    console.log('datos proyecto', queryData);
  }, [queryData]);

  if (loading) return <div>Cargando...</div>;

  if (queryData.Proyectos) {
    return (
      <div className='p-5'>
        <h1 className='titulo'>Lista de Proyectos</h1>
        <PrivateComponent roleList={['LIDER']}>
          <div className='self-end my-5 flex justify-end' >
            <button className='buttonCrear'>
              <Link to='/proyectos/nuevo'>Crear nuevo proyecto</Link>
            </button>
          </div>
        </PrivateComponent>
        
        {queryData.Proyectos.map((proyecto) => {
          return (
              <AccordionProyecto proyecto={proyecto} />
              
           
          )
        })}
      </div>
    );
  }

  return <></>;
};

const AccordionProyecto = ({ proyecto }) => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <AccordionStyled>
        <AccordionSummaryStyled expandIcon={<i className='fas fa-chevron-down' />}>
          <div className='flex w-full justify-between'>
            <div className='uppercase font-semibold text-moradoClaro-light'>
              {proyecto.nombre} - {proyecto.estado}
            </div>
          </div>
        </AccordionSummaryStyled>
        <AccordionDetailsStyled>
          <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
            <i
              className='mx-4 fas fa-pen lapizEditarOscuro flex justify-end '
              onClick={() => {
                setShowDialog(true);
              }}
            />
          </PrivateComponent>
          <div><span className='font-bold'>Fecha de Inicio:</span> {proyecto.fechaInicio}</div>
          <div><span className='font-bold'>Fecha Final:</span> {proyecto.fechaFin}</div>
          <div><span className='font-bold'>Fase: </span> {proyecto.fase} </div>
          <div><span className='font-bold'>Presupuesto:</span> {proyecto.presupuesto} </div>
          <div><span className='font-bold'>Liderado Por:</span> {proyecto.lider.nombre} {proyecto.lider.apellido}</div>
          <PrivateComponent roleList={['LIDER']}>
          <div><span className='font-bold'>Avances:</span> {proyecto.avances._id}</div>
          </PrivateComponent>
          
          <div className='flex'>
            {proyecto.objetivos.map((objetivo) => {
              return <Objetivo tipo={objetivo.tipo} descripcion={objetivo.descripcion} />;
            })}
          </div>
        </AccordionDetailsStyled>
      </AccordionStyled>
      <Dialog
        open={showDialog}
        onClose={() => {
          setShowDialog(false);
        }}
      >
        <FormEditProyecto _id={proyecto._id} />
      </Dialog>
    </>
  );
};

const FormEditProyecto = ({ _id }) => {
  const { form, formData, updateFormData } = useFormData();
  const [editarProyecto, { data: dataMutation, loading, error }] = useMutation(EDITAR_PROYECTO);

  const submitForm = (e) => {
    e.preventDefault();
    editarProyecto({
      variables: {
        _id,
        campos: formData,
      },
    });
  };

  useEffect(() => {
    console.log('data mutation', dataMutation);
  }, [dataMutation]);

  return (
    <div className='p-4'>
      <h1 className='font-bold'>Actualizar Proyecto</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className='flex flex-col items-center'
      >
        <PrivateComponent roleList={['ADMINISTRADOR']}>
        <DropDown label='Estado del Proyecto' name='estado' options={Enum_EstadoProyecto} />
        <DropDown label='Fase del Proyecto' name='fase' options={Enum_FaseProyecto} />
        </PrivateComponent>
        <PrivateComponent roleList={['LIDER']}>
          <div>
            <span> Nombre Del Proyecto </span>
          <Input label='Nombre del Proyecto' name='nombre' type='text'/>
          </div>
        </PrivateComponent>
        <ButtonLoading disabled={false} loading={loading} text='Confirmar' />
      </form>
    </div>
  );
};

const Objetivo = ({ tipo, descripcion }) => {
  return (
    <div className='mx-5 my-4 bg-white p-8 rounded-lg flex-flex-col items-center justify-center shadow-xl'>
      <div className='text-lg font-bold'>{tipo}</div>
      <div>{descripcion}</div>
      <PrivateComponent roleList={['ADMINISTRADOR']}>
        <div>Editar</div>
      </PrivateComponent>
    </div>
  );
};

export default IndexProyectos;