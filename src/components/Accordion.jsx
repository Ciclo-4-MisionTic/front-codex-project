import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';

const AccordionStyled = styled((props) => <Accordion {...props} />)(() => ({
  backgroundColor: '#8C515C',
}));
const AccordionSummaryStyled = styled((props) => (
  <AccordionSummary {...props} />
))(() => ({
  backgroundColor: '#8C515C',
}));
const AccordionDetailsStyled = styled((props) => (
  <AccordionDetails {...props} />
))(() => ({
  backgroundColor: '#D9BFC4',
}));

export { AccordionStyled, AccordionSummaryStyled, AccordionDetailsStyled };