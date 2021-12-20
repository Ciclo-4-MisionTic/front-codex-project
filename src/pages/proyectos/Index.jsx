import React, { useEffect, useState } from 'react';
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
import { CREAR_INSCRIPCION } from 'graphql/inscripciones/mutaciones';
import { toast } from 'react-toastify';
import { useUser } from 'context/userContext';
import {
  AccordionStyled,
  AccordionSummaryStyled,
  AccordionDetailsStyled,
} from 'components/Accordion';


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
        <AccordionSummaryStyled
          expandIcon={<i className='fas fa-chevron-down' />}
        >
          <div className='flex w-full justify-between'>
            <div className='uppercase font-bold text-gray-100 '>
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
          <PrivateComponent roleList={['LIDER','ESTUDIANTE']}>
            <InscripcionProyecto
              idProyecto={proyecto._id}
              estado={proyecto.estado}
              inscripciones={proyecto.inscripciones}
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
            {proyecto.objetivos.map((objetivo, index) => (
              <Objetivo
                index={index}
                _id={objetivo._id}
                idProyecto={proyecto._id}
                tipo={objetivo.tipo}
                descripcion={objetivo.descripcion}
              />
            ))}
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
          <div className='flex flex-col align-center p-3 items-center'>
          <span> Nombre Del Proyecto </span>
          <Input label='Nombre del Proyecto' name='nombre' type='text'/>
          <span className='mt-5'> Presupuesto </span>
          <Input label='Presupuesto' name='presupuesto' type='text'/>
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

//estoy tratando de crear algo en proyecto para avances pero por ahora no funciona
const InscripcionProyecto = ({ idProyecto, estado, inscripciones }) => {
  const [estadoInscripcion, setEstadoInscripcion] = useState('');

  // falta captura del error de la mutacion
  const [crearInscripcion, { data, loading }] = useMutation(CREAR_INSCRIPCION);
  const { userData } = useUser();

  useEffect(() => {
    if (userData && inscripciones) {
      const flt = inscripciones.filter(
        (el) => el.estudiante._id === userData._id
      );
      if (flt.length > 0) {
        setEstadoInscripcion(flt[0].estado);
      }
    }
  }, [userData, inscripciones]);

  useEffect(() => {
    if (data) {
      toast.success('inscripcion creada con exito');
    }
  }, [data]);

  const confirmarInscripcion = () => {
    crearInscripcion({
      variables: { proyecto: idProyecto, estudiante: userData._id },
    });
  };

  return (
    <>
      {estadoInscripcion !== '' ? (
        <div className='flex flex-col items-start'>
          <span>
            Ya estas inscrito en este proyecto y el estado es{' '}
            {estadoInscripcion}
          </span>
          {estadoInscripcion === 'ACEPTADO' && (
            <Link
              to={`/avances/${idProyecto}`}
              className='bg-yellow-700 p-2 rounded-lg text-white my-2 hover:bg-yellow-500'
            >
              Visualizar  Avance
            </Link>
          )}
        </div>
      ) : (
        <ButtonLoading
          onClick={() => confirmarInscripcion()}
          disabled={estado === 'INACTIVO'}
          loading={loading}
          text='Inscribirme en este proyecto'
        />
      )}
    </>
  );
};

export default IndexProyectos;
