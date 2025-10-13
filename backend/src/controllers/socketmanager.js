
import { Server } from "socket.io";


let connections = {};
let messages = {};
let timeOnline = {};

export const initializeSocket = (server)=>
{
    const io = new Server(server);

    io.on("connection", (socket)=>
    {
        socket.on("join-call", (path)=>
        {
            if(connections[path] === undefined)
            {
                connections[path] = [];
            }

            connections[path].push(socket.id);

            connections[path].forEach(element => {

                io.to(element).emit("User-Joined",socket.id,connections[path]);
                
            });

            if(messages[path] !== undefined)
            {
                messages[path].forEach(element =>
                {
                   io.to(socket.id).emit("chat-message",element.sender,element.data,element.socketidsender);
                }
                )
            }

        })

        socket.on("signal",()=>
        {
            io.to(toId).emit("signal",socket.id,messages);
        })

        socket.on("chat-message", (data,sender)=>
        {

            const [currroom,found] = Object.entries(connections)
            .reduce(([roomkey,isfound], [roomkey,roomvalue]) =>
            {
                if(!isfound && roomvalue.includes(socket.id))
                {
                    return [roomkey,true];
                }
                  return [roomkey,isfound];
            },['', false]);

            if(found)
            {
                if(messages[currroom] === undefined)
                {
                    messages[currroom] = [];

                }

                messages[currroom].push({'sender':sender, 'data':data, 'socketidsender':socket.id});
            }
        });


        socket.on("disconnect", ()=>
        {

        })
    })
    return io;
}