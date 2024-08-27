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

  @SubscribeMessage('show-options')
  announceShowOptions(@MessageBody() gameId: string) {
    this.server.to(gameId).emit('display-options');
  }
  announceOptions(gameId: string) {
    this.server.to(gameId).emit('show-options');
  }
}
