const State = require("./StateManager");
const Random = require("../utills/randomNumber");
const shortid = require('shortid');
const Match = require("./Match");
const {matchList,lobbyPlayerList,playerList} = State;

//this function will run after certain interval for match
let matchType = 2;

const matchAlg = ()=>{
    //console.log("Running match Function")
        let lobbyPlayers = lobbyPlayerList[matchType];
        let playerCount = lobbyPlayers.length;
        let matchedPlayers = new Array(matchType);
        let loopCounter = 0;
        if(playerCount>=matchType){
            console.log(`Match Type ${matchType}`);
            console.log(matchedPlayers.length);
            let matchID = shortid.generate();
            while (loopCounter<matchType){
                let rand = Random.random(lobbyPlayers.length);
                let electedPlayer = lobbyPlayers[rand];
                if(electedPlayer){
                    lobbyPlayers.splice(rand,1);
                    matchedPlayers[loopCounter] = {
                        id:electedPlayer,
                        isBot:false,
                        currentPos:1
                    };
                    playerList[electedPlayer].setMatch(matchID,loopCounter+1);
                    loopCounter++;
                    playerCount--;
                }else{
                    if(Object.keys(lobbyPlayers).length<matchType){
                        break;
                    }
                }
            }

            if(loopCounter==matchType){
                console.log(`We have found all the potential player for a ${matchType}P match`);
                let newMatch = new Match(matchID,matchType,matchedPlayers);
                matchList[matchType][matchID] = newMatch;

                //emit to all the players about the match
                let sockets = matchedPlayers.map(item=>{
                    let player = playerList[item.id];
                    return {
                        socket:player.Socket,
                        matchIndex:player.MatchIndex
                    }
                });
                for(const {socket,matchIndex} of sockets){
                    socket.emit("matchFound",{matchDetail:newMatch,matchIndex:matchIndex});
                }
            }else{
                playerList[matchedPlayers.map(item=>item.id)].reset(2);
            }
           // console.log(matchList);
        }
        matchType = matchType<4?++matchType:2;

        //initiate again
        setTimeout(matchAlg,1000);
};

const startMatchAlg = ()=>{
    setTimeout(matchAlg,1000);
};


module.exports = startMatchAlg;