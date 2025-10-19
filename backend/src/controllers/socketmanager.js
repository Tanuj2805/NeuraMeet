
import { Server } from "socket.io";


let connections = {};
let messages = {};
let timeOnline = {};

export const initializeSocket = (server)=>
{
    const io = new Server(server, {
        cors:{
            origin: "*",
            methods: ["GET","POST"],
            allowedHeaders :["*"],
            credentials: true

        }
    });

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
                   io.to(socket.id).emit("chat-message",element.data,element.sender,element.socketidsender);
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
            .reduce(([roomkey,isfound], [croomkey,roomvalue]) =>
            {
                if(!isfound && roomvalue.includes(socket.id))
                {
                    return [croomkey,true];
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
                console.log(socket.id);

                connections[currroom].forEach(element =>
                {
                    io.to(element).emit("chat-message",data,sender,socket.id);
                }
                )
            }
        });


        socket.on("disconnect", ()=>
        {
            var timediff = Math.abs(timeOnline[socket.id] - new Date());

            var key;

            for(const[v,k] of JSON.parse(JSON.stringify(Object.entries(connections))))
            {
                for(let i = 0;i<v.length;++i)
                {
                    if(v[i] == socket.id)
                    {
                        key = k;
                        for(let a = 0;a<connections[key].length;++a)
                        {
                            io.to(connections[key][a]).emit('user-left',socket.id);
                        }

                        var index = connections[key].indexOf(socket.id);
                        connections[key].splice(index,1);

                        if(connections[key].length == 0)
                        {
                            delete connections[key];
                        }
                    }
                }
            }

        })
    })
    return io;
}