import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect } from 'react';


const server_url= "http://localhost:8000";

var connections = {};
const peerconfigconnection = {
    "iceServer":[
        {"urls": "stun:stun.l.google.com:19302"}
    ]
}

export default function VideMeet() {

    var socketref = useRef();
    let socketIdref = useRef();
    let localvideoref = useRef();

    let [videoavail, setvideoavail] = useState(true);
    let [audioavail, setaudioavail] = useState(true);

    let [video,setvideo] = useState();
    let [audio,setaudio] = useState();
    let [screenshare, setscreenshare] = useState();
    let [showmodel,setshowmodel] = useState();
    let [screenavailable, setscreenavailable] = useState();
    let [messages, setmessages] = useState([]);
    let [message,setmessage] = useState("");
    let [newmessage,setnewmessage] = useState(0);
    let [askForUsername, setaskForUsername] = useState(true);
    let [username,setusername] = useState("");
    const videoref = useRef([]);
    let [videos, setvideos] = useState([]);

    // if(isChrome() === false){

    // }

    const getpermission = async ()=>
    {
        try{
            const videopermission = await navigator.mediaDevices.getUserMedia({video:true})

            if(videopermission)
            {
                setvideoavail(true);
            }
            else{
                setvideoavail(false);
            }


             const audiopermission = await navigator.mediaDevices.getUserMedia({audio:true})

            if(audiopermission)
            {
                setaudioavail(true);
            }
            else{
                setaudioavail(false);
            }


            if(navigator.mediaDevices.getDisplayMedia)
            {
                setscreenavailable(true);
            }
            else
                screenavailable(false);


        }
        catch(e)
        {

        }
    }

    useEffect(()=>
    {
        getpermission();
    })




  return (
    <div>
      { askForUsername === true ?
      <div>
       
        <h2>Enter Your Username</h2>
        <TextField id="outlined-basic" label="Username" variant="outlined" required value={username} onChange={e => {setusername(e.target.value)}} />
        <Button variant="contained">Connect</Button>

        <div>
            <video ref={localvideoref} autoPlay muted></video>
            </div>
      </div>
       :<></>}
    </div>
  )
}

