import {
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { TransmisionService } from './transmision.service';
import { Server, Socket } from 'socket.io';
import { Question } from '../game/schemas';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TransmisionGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;
  constructor(private readonly transmisionService: TransmisionService) {}

  handleConnection(client: Socket) {
    const chanel = client.handshake.auth['chanel'];
    if (!chanel) client.disconnect();
    client.join(chanel);
  }

  announceQuestion(question: Question, gameId: string) {
    this.server.to(gameId).emit('next-question', question);
  }

  announceAnswer(gameId: string, selectedIndex: number) {
    this.server.to(gameId).emit('answer-question', selectedIndex);
  }

  announceScore(gameId: string, score: number, player: 'player1' | 'player2') {
    this.server.to(gameId).emit('score', { score, player });
  }

  announceOptions(gameId: string) {
    this.server.to(gameId).emit('show-options');
  }

  @SubscribeMessage('winner')
  winnder(@MessageBody() gameId: string) {
    this.server.to(gameId).emit('show-winner');
  }
}
