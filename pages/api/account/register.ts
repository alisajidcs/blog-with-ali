import { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { signToken } from '../../../services/jwt.service'
import {
  IUserRegisterRequest,
  IUserRegisterResponse,
  registerUser,
} from './../../../services/user.service'

type RegisterTokenResponse = {
  success: boolean
  token?: string
  msg: string
  user?: IUserRegisterResponse | null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterTokenResponse>,
) {
  try {
    if (!req.body) {
      res.status(400).json({ success: false, msg: 'invalid request' })
      return
    }
    const requestData = req.body as IUserRegisterRequest
    const response = await registerUser(requestData)
    if (response) {
      const token = signToken(response)
      if (token) {
        res.status(200).json({ success: true, token, msg: '' })
      }
    } else {
      res.status(200).json({ success: false, msg: 'user not found' })
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: 'failed due to system error' })
  }
}
