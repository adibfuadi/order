import mongoose from "mongoose";
import UserModel from "../models/user.model";
import AccountModel from "../models/account.model";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "../utils/appError";
import { ProviderEnum } from "../enums/account-provider.enum";


export const registerUserService = async (body: {
  email: string;
  name: string;
  password: string;
}) => {
  const { email, name, password } = body;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new BadRequestException("Email already exists");
  }

  const user = await UserModel.create({
    email,
    name,
    password,
  });

  await AccountModel.create({
    userId: user._id,
    provider: ProviderEnum.EMAIL,
    providerId: email,
  });

  return {
    userId: user._id,
  };
};

export const verifyUserService = async ({
  email,
  password,
  provider = ProviderEnum.EMAIL,
}: {
  email: string;
  password: string;
  provider?: string;
}) => {
  const account = await AccountModel.findOne({ provider, providerId: email });
  if (!account) {
    throw new NotFoundException("Invalid email or password");
  }

  const user = await UserModel.findById(account.userId);

  if (!user) {
    throw new NotFoundException("User not found for the given account");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new UnauthorizedException("Invalid email or password");
  }

  return user.omitPassword();
};