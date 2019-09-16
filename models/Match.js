const Random = require("../utills/randomNumber");
const specialPos = new Map([[2,23], [6,45], [20,59], [55,96], [52,72], [71,92], [43,17], [50,5], [56,8], [74,15], [87,49], [98,40], [84,58]]);
//Match Status
// Status 1 = Waiting for all the match player to be ready
// Status 2 = All the client side has been loaded and Match is running
// Status 3 = Match is completed

class Match {
    constructor(id,matchType,players){
        this.id = id;
        this.players = players;
        this.type = matchType;
        this.whosTurn = 1;
        this.winner = -1;
        this.status = 1;
    }
    get ID(){
        return this.id;
    }
    get Players(){
        return this.players;
    }
    get MatchType(){
        return this.type;
    }
    get WhoseTurn(){
        return this.whosTurn;
    }
    set Status(sCode){
        this.status = sCode;
    }
    get Status(){
        return this.status;
    }
    set Winner(wIndex){
        this.winner = wIndex;
    }
    get Winner(){
        return this.winner;
    }
    movePlayer(pId,newPos){
        this.Players.filter(item=>item.id==pId)[0].currentPos = newPos;
    }
    moveBot(pId){
        this.Players.filter(item=>item.id==pId)[0].currentPos += Random.random(6);
    }
    changeTurn(){
        this.whosTurn = this.whosTurn<this.type?++this.whosTurn:1;
    }
    getPlayerPos(pID){
        return this.Players.filter(item=>item.id==pID)[0].currentPos;
    }
    endMatch(winnerIndex){
        this.winner = this.players[winnerIndex].id;
        this.status = 3;
    }
}

module.exports = Match;