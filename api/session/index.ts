import session from 'express-session';
import connectMongo from 'connect-mongo';
import { connect, connection } from 'mongoose';

export default async function createSession() {
  const MONGO_URL = process.env.MONGO_URL || '';
  if (!MONGO_URL) {
    throw new Error('Missing MONGO_URL');
  }
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };
  await connect(MONGO_URL, options);

  const MongoStore = connectMongo(session);

  const sessionOptions = {
    name: process.env.SESSION_NAME || 'qid',
    secret: process.env.SESSION_SECRET || 'aslkdfjoiq12312',
    store: new MongoStore({
      mongooseConnection: connection,
      ttl: 14 * 24 * 60 * 60, // save session 14 days
      autoRemove: 'interval',
      autoRemoveInterval: 1440, // clears every day
      autoReconnect: true,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000, // expires in 14 days
      secure: process.env.NODE_ENV === 'production',
    } as any,
  };

  const sessionMiddleware = session(sessionOptions);
  return sessionMiddleware;
}
