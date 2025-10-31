import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { io } from "socket.io-client";
import { UNSAFE_createClientRoutes } from 'react-router-dom';



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


            const audiopermission = await navigator.mediaDevices.getUserMedia({audio:true});

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
                setscreenavailable(false);

            if(videoavail || audioavail)
            {
                const usermediastream = await navigator.mediaDevices.getUserMedia({video:videoavail, audio:audioavail}); 
                if(usermediastream)
                {
                    window.localStream = usermediastream;
                    
                    if(localvideoref.current)
                    {
                        localvideoref.current.srcObject = usermediastream; 
                    }
                }
            }

            


        }
        catch(e)
        {
            console.log(e);

        }
    }

    let getusermediasuccess = (stream)=>
    {

    }
   let getusermedia= ()=>
    {
        if((video && videoavail) && (audio && audioavail))
        {
            navigator.mediaDevices.getUserMedia({video: video, audio:audio})
            .then(getusermediasuccess)
            .then((stream) =>{})
            .catch((e)=>
            {
                console.log(e);
            })
        }
        else
        {
            try{
                let track = localvideoref.current.srcObject.getTracks();
                track.forEach(t => t.stop())
                 
            }
            catch(e)
            {
                
            }
        }
    }

    useEffect(()=>
    {
        getpermission();
    },[]);

    useEffect(()=>
    {
        if(video !== undefined && audio !== undefined)
        {
            getusermedia();
        }
    },[video,audio])
    

    let addmessage = ()=>
    {

    }

    let gotmessagefromserver= ()=>
    {
        
    }




    let connectToSocketServer = ()=>
    {

        socketref.current = io.connect(server_url,{secure:false});

        socketref.current.on('signal',gotmessagefromserver)

        socketref.current.on("connect", ()=>
        {
            socketref.current.emit("join-call", window.location.href);
            socketIdref.current = socketref.current.id;
            socketref.current.on("chat-message", addmessage);
            socketref.current.on("user-left", (id)=>{
                setvideos(videos=>
                {
                    videos.filter(video=> video.socketId !== id);
                })
            });

            socketref.current.on("user-joined", (id,client)=>
            {
                client.forEach((sockelistid)=>
                {
                    connections[sockelistid] = new RTCPeerConnection(peerconfigconnection);

                    connections[sockelistid].onicecandidate = (event)=>
                    {
                        if(event.candidate !== null)
                        {
                            socketref.current.emit("signal", sockelistid, JSON.stringify({'ice':event.candidate}))
                        }


                    }

                    connections[sockelistid].onaddstream = (event)=>
                    {

                    }
                }
            )})
        })

        
    }


    let getmedia = () =>
    {
        setaudio(audioavail);
        setvideo(videoavail);
        connectToSocketServer();
    }

    let connect = () =>
    {
        setaskForUsername(false);
        getmedia();
    }




  return (
    <div>
      { askForUsername === true ?
      <div>
       
        <h2>Enter Your Username</h2>
        <TextField id="outlined-basic" label="Username" variant="outlined" required value={username} onChange={e => {setusername(e.target.value)}} />
        <Button variant="contained" onClick={connect}>Connect</Button>

        <div>
            <video ref={localvideoref} autoPlay muted></video>
            </div>
      </div>
       :<></>}
    </div>
  )
}

