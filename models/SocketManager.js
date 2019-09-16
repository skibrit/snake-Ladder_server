const State = require("../models/StateManager");
const Player = require("../models/Player");
const GameManager = require("../models/GameManager");
const {playerList,lobbyPlayerList,matchList} = State;

module.exports = (io)=>{
    io.on('connection', client => {
        let player = new Player(client);
        let pID = player.ID;
        playerList[pID] = player;
        console.log(`New Player Connected a ${pID}`);

        client.emit("register",{id:pID});

        client.on("matchRequest",(payload)=>{
            const {lobbyType} = payload;
            disconnectPlayer(player);
            player.LobbyType = lobbyType;
            player.Status = 2;
            lobbyPlayerList[lobbyType].push(pID);
        });

        //game events
        client.on("updatePosition",(payload)=>{
            let match = matchList[player.LobbyType][player.MatchID];
            if(match && match.Status<3 && match.WhoseTurn==player.MatchIndex){
                console.log("Calling UpdatePlayer Position ")
                GameManager.UpdatePlayerPosition(player,match,payload);
            }
        });

        client.on("lobbyDisconnect",()=>{
            console.log(`${pID} has been disconnected from ${player.LobbyType} lobby room`);
            disconnectPlayer(player);
        });

        client.on("disconnect",()=>{
            console.log(`${pID} has been disconnected`);
            disconnectPlayer(player);
            delete playerList[pID];
        })
    });
};

function disconnectPlayer(player) {
    //if player already in any lobby then remove from that lobby
    if(player.Status==2){
        if(lobbyPlayerList[player.LobbyType].indexOf(player.ID)>-1){
            lobbyPlayerList[player.LobbyType].splice(lobbyPlayerList[player.LobbyType].indexOf(player.ID),1);
        }
    }
    //if player is in any online game then disconnect from the game
    if(player.Status==3 && player.MatchID){
        let match = matchList[player.LobbyType][player.MatchID];
        if(match && match.Status<3){
            GameManager.switchPlayerToBot(player,match);
        }
    }
    //reset player
    player.reset();
}