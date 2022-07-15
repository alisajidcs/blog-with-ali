import { IUserRegisterResponse } from './user.service'
// const { Client } = require('pg')
// const client = new Client()
// await client.connect()

import { PrismaClient, User } from '@prisma/client'

export interface IUser {
  id: number
  first_name: string
  last_name: string
  email: string
  username: string
  password: string
  is_deleted: boolean
  created_on: Date
  created_by: string
  updated_on: Date
  updated_by: string
}

/*
  Login Request
*/

export interface IUserLoginRequest {
  email: string
  username: string
  password: string
}

export interface IUserLoginResponse {
  firstName: string
  lastName: string
  email: string
  username: string
  createdOn: Date
  createdBy: string
}

/*
  Register Request
*/

export interface IUserRegisterRequest {
  first_name: string
  last_name: string
  email: string
  username: string
  password: string
}

export interface IUserRegisterResponse {
  firstName: string
  lastName: string
  email: string
  username: string
  createdOn: Date
  createdBy: string
}

export interface IUserChangePasswordRequest {
  old_password: string
  new_password: string
}

export interface IUserForgotPasswordRequest {
  email: string
  username: string
}

// /register
// /check-username-available
// /login
// /change-password
// /logout
// /forgot-password
// /me

export const registerUser = async (
  model: IUserRegisterRequest,
): Promise<IUserRegisterResponse | null> => {
  const prisma = new PrismaClient({
    log: ['query'],
  })
  const user = await prisma.user.create({
    data: {
      firstName: model.first_name,
      lastName: model.last_name,
      email: model.email,
      username: model.username,
      password: model.password,
      createdOn: new Date(),
      createdBy: 'admin',
    },
  })
  return user as IUserRegisterResponse
}
export const checkUsernameAvailable = (username: string): boolean => {
  return false
}
export const loginUser = async (model: IUserLoginRequest): Promise<IUserLoginResponse | null> => {
  const prisma = new PrismaClient({
    log: ['query'],
  })
  const user = await prisma.user.findFirst({
    where: { username: model.username, password: model.password },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      username: true,
      createdOn: true,
      createdBy: true,
    },
  })
  // console.log('user', user)
  return user as IUserLoginResponse
}
export const changePassword = (model: IUserChangePasswordRequest): boolean => {
  return false
}
export const logoutUser = (): void => {}
export const forgotPassword = (model: IUserForgotPasswordRequest): boolean => {
  // password has been sent to your email
  return false
}
export const getLoggedInUser = (): User | null => {
  return null
}
export const getUserById = (userId: number): User | null => {
  return null
}
export const getUserByUsername = (username: string): User | null => {
  return null
}
export const getUserByEmail = (email: string): User | null => {
  return null
}
