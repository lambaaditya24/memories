import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { Avatar, Toolbar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

export const StyledAppBar = styled(AppBar)({
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  });
  
  export const StyledTypography = styled(Typography)({
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  });
  
  export const StyledImage = styled('img')({
    marginLeft: '15px',
  });
  
  export const BrandContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
  });

  export const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  });
  
  export const StyledAvatar = styled(Avatar)(({ theme }) => ({
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  }));