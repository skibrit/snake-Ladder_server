module.exports = (io)=>{
    io.on('connection', client => {
        console.log(`New Client Connected ${client.id}`);

        client.on("disconnect",()=>{
            console.log(`${client.id} has been disconnected`);
        })
    });
};