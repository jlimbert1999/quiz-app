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

  score1(gameId: string, value: number) {
    this.server.to(gameId).emit('score1', value);
  }

  score2(gameId: string, value: number) {
    this.server.to(gameId).emit('score2', value);
  }

  @SubscribeMessage('show-options')
  announceShowOptions(@MessageBody() gameId: string) {
    this.server.to(gameId).emit('display-options');
  }
  announceOptions(gameId: string) {
    this.server.to(gameId).emit('show-options');
  }

  @SubscribeMessage('winner')
  winnder(@MessageBody() gameId: string) {
    this.server.to(gameId).emit('show-winner');
  }
}
