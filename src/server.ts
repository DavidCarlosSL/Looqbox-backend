import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";

import serverMessages from "./utils/messages/server/server.messages.json";

import routes from "./routes/index";

class Server {

    constructor(private app: Express) {}

    private loadUtils(): Promise<void> {
        return new Promise((resolve, reject) => {
            try{
                this.app.use(helmet());
                this.app.use(cors());
                this.app.use(express.json());

                resolve();
            }catch(error){
                reject(error);
            }
        });
    }

    private loadRoutes(): Promise<void> {
        return new Promise((resolve, reject) => {
            try{
                this.app.use(routes);

                resolve();
            }catch(error){
                reject(error);
            }
        });
    }

    public async initiate(serverPort: number) {
        try{
            await Promise.all([this.loadUtils(), this.loadRoutes()]);

            this.app.listen(serverPort, () => console.log(`${serverMessages.server_up_running_port} ${serverPort}`));
        }catch(error){
            console.log(`${serverMessages.something_wrong_starting_server} ${error}`);
        }
    }
}

const app = express();

const server = new Server(app);
server.initiate(8080);