import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config"

initializeApp(firebaseConfig.firebaseConfig);

import express from 'express';
import http from 'http';
import cors from "cors";
import connectDB from "./src/db"; 
import router from "./src/routes/media.routes";

interface Client {
    id: number;
    res: express.Response;
}

let clients: Client[] = [];

const app = express();

const server = http.createServer(app);

connectDB();


app.use(require("./src/middlewares/timeout"));
app.use(require("./src/middlewares/errorHandler"));

app.use(express.json({ limit: "10000mb" }));
app.use(express.urlencoded({ limit: "10000mb", extended: true }));

app.options("*", cors({ origin: ['http://localhost:5173', "https://minly-task-jc4q.onrender.com", "*"], optionsSuccessStatus: 200 }));
app.use(cors({origin: ["http://localhost:5173", "https://minly-task-jc4q.onrender.com", "*"], credentials: true, optionsSuccessStatus: 200 }))

app.get('/events', (req: express.Request, res: express.Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const clientId = Date.now();
    const newClient: Client = {
        id: clientId,
        res
    };
    clients.push(newClient);

    req.on('close', () => {
        console.log(`Connection closed: ${clientId}`);
        clients = clients.filter(client => client.id !== clientId);
        res.end();
    });
});

export const sendStatusToAllClients = (data: any) => {
    clients.forEach(client =>
        client.res.write(`data: ${JSON.stringify(data)}\n\n`)
    );
};

app.use("/", router);

server.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
