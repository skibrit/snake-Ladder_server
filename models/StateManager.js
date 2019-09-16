const MatchTypes = [2,3,4];

const State = {
    playerList:{},
    lobbyPlayerList:{
        [MatchTypes[0]]:[],
        [MatchTypes[1]]:[],
        [MatchTypes[2]]:[]
    },
    matchList:{
        [MatchTypes[0]]:{},
        [MatchTypes[1]]:{},
        [MatchTypes[2]]:{}
    }
};

module.exports = State;