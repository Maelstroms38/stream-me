import { Arg, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { UserModel } from '../entity/User';
import { AuthInput } from '../types/AuthInput';
import { UserResponse } from '../types/UserResponse';

@Resolver()
export class AuthResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('input')
    { email, password }: AuthInput
  ): Promise<UserResponse> {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ email, password: hashedPassword });
    await user.save();

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(
      payload,
      process.env.SESSION_SECRET || 'aslkdfjoiq12312'
    );

    return { user, token };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('input') { email, password }: AuthInput
  ): Promise<UserResponse> {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error('Invalid Login');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error('Invalid Login');
    }

    const payload = {
      id: user.id,
    };

    // Store it on session object
    const token = jwt.sign(
      payload,
      process.env.SESSION_SECRET || 'aslkdfjoiq12312'
    );

    return { user, token };
  }
}
