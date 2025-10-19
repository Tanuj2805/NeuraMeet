import { createContext } from "react";
import { Children, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import httpStatus from "http-status";

export const AuthContext = createContext();

const client = axios.create({
  baseURL: "http://localhost:8000/api/v1/users"
});

export const  AuthProvider = ({children})=>
{
    const authcontext = useContext(AuthContext);

    const [userdata,setuserdata] = useState(authcontext);

    const navigate = useNavigate();

    const handleregister = async (name,username,password) =>
    {
        try{
            
            let req = await client.post("/register", {
                name: name, 
                username: username,
                password:password
            })

            if(req.status === httpStatus.CREATED)
            {
                
                return req.data.message;
            }
        }
        catch(e)
        {
            
                throw e;
        }
    }

    const handlelogin = async (username, password) =>
    {

        try{
            let req =  await client.post("/login" , {
                username: username,
                password : password
            })

            if(req.status === httpStatus.OK)
            {
                let token =  req.data.token;
                localStorage.setItem("token", token);
                navigate("/home");

            }
        }
        catch(e)
        {
            throw e;
        }
    }

    const data ={
        userdata , setuserdata, handleregister, handlelogin
    }

    return(
        <AuthContext.Provider value={data}>
            {children}

        </AuthContext.Provider>
    )

}


