const shortid = require('shortid');
const Random = require("../utills/randomNumber");

//Player Status
//Status 1 = Online
//Status 2 = In Lobby waiting for a match
//Status 3 = In Online Match

class Player {
    constructor(client,isBot=false) {
        this.id = shortid.generate();
        this.socket = client;
        this.isBot = isBot;
        this.status = 1;
        this.reset();
    }
    set Status(newStatus){
        this.status = newStatus;
    }
    get Status(){
        return this.status;
    }
    set LobbyType(lType){
        this.lobbyType = lType;
    }
    get LobbyType(){
        return this.lobbyType;
    }
    get MatchID(){
        return this.matchID;
    }
    get MatchIndex(){
        return this.matchIndex;
    }
    get Socket() {
        return this.socket;
    }
    get ID(){
        return this.id;
    }
    setMatch(matchID,index){
        this.matchID = matchID;
        this.matchIndex = index;
        this.Status = 3;
    }
    reset(status=1){
        this.status = status;
        this.lobbyType = 0;
        this.matchID = 0;
    }
}

module.exports = Player;