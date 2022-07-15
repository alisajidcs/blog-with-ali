// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { loginUser } from './../../services/user.service'

type Data = {
  name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  loginUser()
    .then((res) => {
      console.log('response ', res)
    })
    .catch((err) => {
      console.log('error ', err)
    })
  res.status(200).json({ name: 'John Doe' })
}
