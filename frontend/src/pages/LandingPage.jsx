import React from 'react'
import {Route, Router, Routes} from "react-router-dom"
import "./LandingPage.css";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";



export default function LandingPage() 
{



  return (
    <div className="landingpagecontainer">
     <nav className='navbar'>
      <div>
        <img src="/public/logo.png" className='navlogo'></img>
      </div>
      
      <div className='navlist'>

       <p style={{ fontSize: "1.1rem", margin: 0, paddingTop: "0.5rem", color: "white", cursor:"pointer" }}>Join as Guest</p>

         &nbsp; &nbsp; &nbsp;
     
        <Button 
        variant="contained"
        sx={{
          background: "linear-gradient(90deg, #3A86FF 0%, #6D28D9 100%)",
          transition: "0.3s ease",
          "&:hover": {
            background: "linear-gradient(90deg, #6D28D9 0%, #3A86FF 100%)",
            transform: "scale(1.03)",
          }
        }}
      >
      Register
      </Button>

      &nbsp; &nbsp; &nbsp;


        <Button variant="contained"
        sx={{
        background: "linear-gradient(90deg, #3A86FF 0%, #6D28D9 100%)",
        transition: "0.3s ease",
        "&:hover": {
          background: "linear-gradient(90deg, #6D28D9 0%, #3A86FF 100%)",
          transform: "scale(1.03)",
        }
      }}>
        Login
        </Button>

      </div>
     </nav>

     <div class="middlelanding">
      
      <div>
      
      <p style={{color:"white", fontSize:"5rem", fontWeight:"bold", fontFamily: 'Montserrat'}}> NeuraMeetUp</p>&nbsp;
      <p style={{paddingLeft:"2.1rem", alignContent:"center" ,color:"white", fontSize:"1.1rem", fontWeight:"bold", fontFamily: 'Montserrat'}}>Because every great connection starts with a hello!!!</p>
      </div>

      &nbsp;
      &nbsp;
      <div>
      <Button variant="contained" component={Link}
        to="/auth"
        sx={{
        background: "linear-gradient(90deg, #3A86FF 0%, #6D28D9 100%)",
        transition: "0.3s ease",
        "&:hover": {
          background: "linear-gradient(90deg, #6D28D9 0%, #3A86FF 100%)",
          transform: "scale(1.03)",
        }
      }} >
        Get Started
        </Button>
      </div>

      
     </div>
    </div>
  )
}


