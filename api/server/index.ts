import './env';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';

import createSchema from '../schema';
import createSession from '../session';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 8000;

async function createServer() {
  try {
    // create mongoose connection
    const session = await createSession();
    const app = express();

    // allow CORS from client app
    const corsOptions = {
      origin: dev ? process.env.URL_APP : process.env.PRODUCTION_URL_APP,
      credentials: true,
    };
    app.use(cors(corsOptions));
    // allow JSON requests
    app.use(express.json());
    // use MongoDB session
    app.use(session);

    const schema = await createSchema();

    // create GraphQL server
    const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
      introspection: true,
      // enable GraphQL Playground
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
    });

    apolloServer.applyMiddleware({ app, cors: corsOptions });

    // start the server
    app.listen({ port }, () => {
      console.log(
        `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
      );
    });
  } catch (err) {
    console.log(err);
  }
}

createServer();
