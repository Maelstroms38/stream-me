import { QueryResolvers, Stream, User } from './type-defs.graphqls';
import { ResolverContext } from './apollo';

const Query: Required<QueryResolvers<ResolverContext>> = {
  user(_parent, _, _context, _info): User {
    return { _id: '', email: '' };
  },
  currentUser(_parent, _, _context, _info): User {
    return null;
  },
  stream(_parent, _, _context, _info): Stream {
    return {
      _id: '',
      title: '',
      url: '',
      description: '',
      author: { _id: '', email: '' },
    };
  },
  streams(_parent, _, _context, _info): Stream[] {
    return [];
  },
};

export default { Query };
