import { Server } from "./server";
import { AppDataSource } from "../database/data-source";
import { envs } from "../config/envs";

async function main() {
    try {
        await AppDataSource.initialize();
        console.log("Database connected");

        const server = new Server();

        server.app.listen(envs.PORT, () => {
            console.log(`Server running on port ${envs.PORT}`);
        });

    } catch (error) {
        console.error("Error starting application:", error);
    }
}

main();
