// const jwt = require('jsonwebtoken')
import jwt from 'jsonwebtoken'

export const signToken = (user: any): string => {
  return jwt.sign(user, process.env.jwtSecret, {
    expiresIn: '1h',
  })
}
