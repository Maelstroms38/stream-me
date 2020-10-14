import { MiddlewareFn } from 'type-graphql';
import { ApolloError } from 'apollo-server-core';
import { MyContext } from '../types/MyContext';
import { jwt } from 'twilio';

const AccessToken = jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const MAX_ALLOWED_SESSION_DURATION = 14400;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID!;
const twilioApiKeySID = process.env.TWILIO_API_KEY_SID!;
const twilioApiKeySecret = process.env.TWILIO_API_KEY_SECRET!;

export const twilio: MiddlewareFn<MyContext> = async (
  { args, context },
  next
) => {
  try {
    const token = new AccessToken(
      twilioAccountSid,
      twilioApiKeySID,
      twilioApiKeySecret,
      {
        ttl: MAX_ALLOWED_SESSION_DURATION,
        identity: context.res.locals.userId,
      }
    );
    const videoGrant = new VideoGrant({ room: args.streamId });
    token.addGrant(videoGrant);
    const accessToken = token.toJwt();
    context.res.locals.token = accessToken;
    return next();
  } catch (err) {
    throw new ApolloError(err.message);
  }
};
