import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, request) {
  const url = request.url;
  if (!url) {
    return ws.close();
  }

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get('token');
  
  if (!token) {
    return ws.close();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    if (!decoded || !decoded.userId) {
      return ws.close();
    }

    ws.on('message', function message() {
      ws.send('pong');
    });
  } catch {
    ws.close();
  }
});

export default wss;