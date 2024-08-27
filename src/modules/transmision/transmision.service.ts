import { Injectable } from '@nestjs/common';

interface clientProps {
  id: string;
  socketIds: string[];
}
@Injectable()
export class TransmisionService {
  private clients: Record<string, clientProps> = {};

  // onClientConnected(socketId: string, id: string): void {
  //   if (this.clients[gameId]) {
  //     this.clients[gameId].socketIds.push(socketId);
  //     return;
  //   }
  //   this.clients[gameId] = { id: gameId, socketIds: [id_socket] };
  // }

  // onClientDisconnected(id_socket: string) {
  //   const client = Object.values(this.clients).find(({ socketIds }) =>
  //     socketIds.includes(id_socket),
  //   );
  //   if (!client) return;
  //   this.clients[client.id_account].socketIds = client.socketIds.filter(
  //     (id) => id !== id_socket,
  //   );
  //   if (this.clients[client.id_account].socketIds.length === 0)
  //     delete this.clients[client.id_account];
  // }

  // remove(id_account: string) {
  //   const client = this.clients[id_account];
  //   if (client) delete this.clients[id_account];
  //   return client;
  // }

  // getUser(id_account: string): userSocket {
  //   return this.clients[id_account];
  // }

  // getClients() {
  //   return Object.values(this.clients);
  // }

}
