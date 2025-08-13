import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3002 });

console.log('🚀 WebSocket Backend Server running on port 3002');

wss.on('connection', (ws) => {
  console.log('New WebSocket connection established');

  ws.on('message', (message) => {
    console.log('Received:', message.toString());
    
    // Echo the message back
    ws.send(`Echo: ${message.toString()}`);
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

export default wss;