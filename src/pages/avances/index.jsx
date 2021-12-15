import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import { useMutation, useQuery } from '@apollo/client';
import { AVANCES } from 'graphql/avances/queries';
import DropDown from 'components/Dropdown';
import { Dialog } from '@mui/material';
import ButtonLoading from 'components/ButtonLoading';
import { EDITAR_AVANCE } from 'graphql/avances/mutations';
import useFormData from 'hooks/useFormData';
import PrivateComponent from 'components/PrivateComponent';


const AccordionStyled = styled((props) => <Accordion {...props} />)(({ theme }) => ({
  backgroundColor: '#8C515C',
}));
const AccordionSummaryStyled = styled((props) => <AccordionSummary {...props} />)(({ theme }) => ({
  backgroundColor: '#8C515C',
}));
const AccordionDetailsStyled = styled((props) => <AccordionDetails {...props} />)(({ theme }) => ({
  backgroundColor: '#D9BFC4',
}));

const IndexAvance = () => {
    const { data: queryData, loading, error } = useQuery(AVANCES);
  
    useEffect(() => {
      console.log('datos proyecto', queryData);
    }, [queryData]);
  
    if (loading) return <div>Cargando...</div>;
  
    if (queryData.Avances) {
      return (
        <div className='p-10'>
          {queryData.Avances.map((avance) => {
            return <AccordionAvance avance={avance} />;
          })}
        </div>
      );
    }
  
    return <></>;
  };
  
  const AccordionAvance = ({ avance}) => {
    const [showDialog, setShowDialog] = useState(false);
    return (
      <>
        <AccordionStyled>
          <AccordionSummaryStyled expandIcon={<i className='fas fa-chevron-down' />}>
            <div className='flex w-full justify-between'>
              <div className='uppercase font-semibold text-moradoClaro-light'>
               Avance de {avance.proyecto.nombre} 
              </div>
            </div>
          </AccordionSummaryStyled>
          <AccordionDetailsStyled>
        
              <i
                className='mx-4 fas fa-pen lapizEditarOscuro flex justify-end '
                onClick={() => {
                  setShowDialog(true);
                }}
              />

            <div><span className='font-bold'>ID:</span> {avance._id}</div>
            <div><span className='font-bold'>Fecha:</span> {avance.fecha}</div>
            <div><span className='font-bold'>Descripcion: </span> {avance.descripcion} </div>
  
            <div className='flex'>
              {avance.observaciones.map((observacion) => {
                return <Observacion _id={observacion._id} descripcion={observacion.descripcion} />;
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
          <FormEditAvance _id={avance._id} />
        </Dialog>
      </>
    );
  };
  
  const FormEditAvance = ({ _id }) => {
    const { form, formData, updateFormData } = useFormData();
    const [editarAvance, { data: dataMutation, loading, error }] = useMutation(EDITAR_AVANCE);
  
    const submitForm = (e) => {
      e.preventDefault();
      editarAvance({
        variables: {
          _id,
          descripcion: formData,
        },
      });
    };
  
    useEffect(() => {
      console.log('data mutation', dataMutation);
    }, [dataMutation]);
  
    return (
      <div className='p-4'>
        <h1 className='font-bold'>Actualizar Avance</h1>
        <form
          ref={form}
          onChange={updateFormData}
          onSubmit={submitForm}
          className='flex flex-col items-center'
        >
          {/* <DropDown label='Estado del Proyecto' name='prespuesto' defaultValue={proyecto.presupuesto} /> */}
          {/* <DropDown label='Estado del Avance' name='estado' defaultValue={avance.descripcion}/> */}
          <ButtonLoading disabled={false} loading={loading} text='Confirmar' />
        </form>
      </div>
    );
  };
  
  const Observacion = ({ _id, descripcion }) => {
    return (
      <div className='mx-5 my-4 bg-white p-8 rounded-lg flex-flex-col items-center justify-center shadow-xl'>
        <div className='text-lg font-bold'>{_id}</div>
        <div>{descripcion}</div>

          <div>Editar</div>

      </div>
    );
  };
  
  export default IndexAvance;
  