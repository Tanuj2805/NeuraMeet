import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import Snackbar from '@mui/material/Snackbar';
import httpStatus from "http-status";



const defaultTheme = createTheme();


    



export default function Authentication() {


    const [formdata, setformdata] = React.useState({
        username: "",
        password: "",
        fullname:""
    })

    const [formstate, setformstate] = React.useState(0);
    const [message, setmessage] = React.useState("hh");
    const [error, seterror] = React.useState();
    const [open,setopen] = React.useState(false);

    const {handleregister, handlelogin} = React.useContext(AuthContext)


    function handleformdata(e)
    {
      //  console.log(e.target.value);
            setformdata({...formdata, [e.target.name]:e.target.value})
        
    }

    let  handleauth = async ()=>
    {
      event.preventDefault();
      try{
        
      if(formstate === 0)
      {
        let result = await handlelogin(formdata.username, formdata.password);
        console.log(result); 
        setmessage(result);
        setopen(true);
      }
      }
      catch(e)
      {
        setmessage(e.response.data.message);
        setopen(true);
      }

      try{
      if(formstate === 1)
      {
        let result = await handleregister(formdata.fullname,formdata.username, formdata.password);
        console.log(result); 
        setmessage(result);
        setopen(true);
      }
      }
      catch(e)
      {
       
        
        seterror(e.response.data.message);
      }


    
    }
 

  
  return (

    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <div>
            <Button  variant={formstate === 0?"contained":""} onClick={()=>{ setformstate(0)}} sx={{}}>
                sign in
            </Button>
            <Button  variant={formstate === 1?"contained":""} onClick={()=>{ setformstate(1)}} sx={{}}>
                Sign up
            </Button>
            </div>


            <Box component="form" noValidate onSubmit={handleauth}  sx={{ mt: 1, width: "100%", maxWidth: 480, mx: "auto" }} >


                {formstate === 1?<TextField
                margin="normal"
                required
                fullWidth
                name="fullname"
                label=" Full Name"
                id="name"
                onChange={handleformdata}
                />
                :<></>}

              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="Username"
                autoFocus
                 onChange={handleformdata}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                 onChange={handleformdata}
              />

               <Snackbar
                open={open}
                autoHideDuration={4000}
                message={message}

               ></Snackbar>
              
             
              <Button
               type='submit'
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              
              >
              {formstate === 0? "Sign in" : "Register"}
                
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}