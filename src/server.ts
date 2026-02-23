import app from "./app";
import { prisma } from "./app/lib/prisma";
import { envVars } from "./config/env";


async function server() {
  try {
    await prisma.$connect();
    console.log('Connected to the database sunccesfully')
    app.listen(envVars.PORT, () => {
      console.log(`Server running on port ${envVars.PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

server();