import "dotenv/config"
import cors from "cors"
import express from "express";
import DBModule from "./db";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typedef";
import { context } from "./graphql/context";
import WinstonLogger from "./helper/winston.helper";
import { LoggerConstant } from "./helper/constants";
import { registerRoutes } from "./routes";
import Upstox from "./config/upstox.config";

const logger = WinstonLogger.getInstance(LoggerConstant.SERVICE_NAME,LoggerConstant.ERROR_LOG_FILE,LoggerConstant.COMBINE_LOG_FILE);

const startServer = async () => {
  const app = express();
  const PORT =  process.env.PORT ;
  const port = PORT || 4011;
  app.use(cors({ origin: "*" }));

  const federatedSchema = buildSubgraphSchema({ typeDefs, resolvers });

  await DBModule.register();
  try {
    await DBModule.dbInstance.runMigrations({ transaction: "all" });
    console.info({ message: `All migration run no pending migration` });
  } catch (error) {
      console.error({ message: `Error in Migartion ${error}` });
  }
  const server: any = new ApolloServer({
    schema: federatedSchema,
    formatError: (formattedError, error) => {
      if (
        formattedError.extensions.code ===
        ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED
      ) {
        return {
          ...formattedError,
          message:
            "Your query doesn't match the schema. Try double-checking it!",
        };
      }
      return formattedError;
    },
  });

  await server.start();

  app.get("/healthz", (req, res) => {
    if (server.internals.state.phase === "started") {
      res.status(200).send({ status: "OK" });
    } else {
      res.status(503).send({ status: "Unavailable" });
    }
  });

  app.use(cors({ origin: "*" }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

   app.use('/api/v1', registerRoutes());

  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: ({ req }) => context({ req }),
    })
  );

  Upstox.getMarketQuote("NHPC")

  app.listen(port, async () => {
    logger.info(`Server listening on port ${port}`);
  });
};

startServer().catch((error) => console.error(error));
