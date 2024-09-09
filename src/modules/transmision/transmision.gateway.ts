import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Question } from '../game/schemas';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TransmisionGateway {
  @WebSocketServer() server: Server;

  announceQuestion(question: Question) {
    this.server.emit('next-question', question);
  }

  announceOptions() {
    this.server.emit('show-options');
  }

  announceAnswer(selectedIndex: number) {
    this.server.emit('answer-question', selectedIndex);
  }

  announceScore(score: number, player: 'player1' | 'player2') {
    this.server.emit('score', { score, player });
  }

  announceWinner() {
    this.server.emit('show-winner');
  }

  announceNewMatch() {
    this.server.emit('new-match');
  }

  announceSettings(incrementBy: number, timer: number) {
    this.server.emit('match-settings', { incrementBy, timer });
  }
}
