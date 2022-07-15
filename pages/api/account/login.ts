import { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { signToken } from '../../../services/jwt.service'
import { IUserLoginRequest, loginUser } from './../../../services/user.service'

type LoginTokenResponse = {
  success: boolean
  token?: string
  msg: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginTokenResponse>,
) {
  try {
    if (!req.query.u || !req.query.p) {
      res.status(400).json({ success: false, msg: 'invalid request' })
      return
    }
    const response = await loginUser({
      username: req.query.u,
      password: req.query.p,
    } as IUserLoginRequest)
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
