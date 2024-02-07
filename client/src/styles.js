import { makeStyles } from '@mui/styles';


export default makeStyles(()=>({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      brandContainer: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1, 
      },
      heading: {
        color: 'rgba(0,183,255, 1)',
        flexGrow:0,
        marginRight:'15px',
        marginLeft:'15px'
      },
      image: {
        flexGrow:0,
        marginLeft: '15px',
      },
}));