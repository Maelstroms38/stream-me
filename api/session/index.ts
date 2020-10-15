import { connect } from 'mongoose';

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
}
