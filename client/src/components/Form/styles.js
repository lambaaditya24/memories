import { styled } from '@mui/material/styles';
// import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  '& .MuiTextField-root': {
    margin: theme.spacing(1),
  },
}));

export const StyledFileInput = styled('div')(({ theme }) => ({
  width: '97%',
  margin: '10px 0',
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  marginBottom: 10,
}));