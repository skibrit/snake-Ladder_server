const State = require("../models/StateManager");
const { playerList, lobbyPlayerList, matchList } = State;

class GameManager {
  static switchPlayerToBot(player, match) {
    match.Players.filter(item => item.id == player.ID)[0].isBot = true;
  }
  static UpdatePlayerPosition(player, match, payload) {
    const { ID } = player;
    const { Players } = match;
    const { diceResult, newPos } = payload;
    match.movePlayer(ID, newPos);
    match.changeTurn();

    const otherPlayers = Players.filter(item => item.id != ID && !item.isBot);
    for (const { id } of otherPlayers) {
      let pl = playerList[id];
      if (pl && pl.Socket) {
        const obj = {
          ...payload,
          nextTurn: match.WhoseTurn,
          updateOf: ID,
          updateIndex: player.MatchIndex
        };
        console.log(JSON.stringify(obj));
        pl.Socket.emit("positionUpdate", obj);
      }
    }

    //check if player position is equal to 100 or more
    if (match.getPlayerPos(ID) >= 100) {
      GameManager.declareWinner(player, match);
    }
  }

  static declareWinner(player, match) {
    const { Players } = match;
    match.endMatch(player.MatchIndex);
    const sockets = Players.map(item => playerList[item.id].Socket);
    for (const socket of sockets) {
      socket.emit("gameOver", {
        winner: { id: player.ID, index: player.MatchIndex }
      });
    }
    setTimeout(() => {
      //destroy the match object after 30 second
      delete matchList[match.id];
    }, 30 * 1000);
  }
}

module.exports = GameManager;
