import '../styles/globals.css'

import { useRef } from 'react'

import { Button, ChakraProvider, Textarea } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

import Nav from '../components/navbar'
import { signToken } from '../services/jwt.service'
import { loginUser } from '../services/user.service'

function MyApp({ Component, pageProps }: AppProps) {
  const outputRef = useRef<HTMLTextAreaElement>(null)
  const payloadRef = useRef<HTMLTextAreaElement>(null)
  return (
    <ChakraProvider>
      <Nav />
      <div style={{ margin: '20px' }}>
        <h1>{process.env.jwtSecret}</h1>
        <Textarea
          ref={outputRef}
          style={{ border: 'solid 1px green' }}
          onClick={(e) => {
            e.currentTarget.select()
            e.currentTarget.setSelectionRange(0, 99999) /* For mobile devices */

            /* Copy the text inside the text field */
            navigator.clipboard.writeText(e.currentTarget.value)
          }}
        />
        <Textarea
          ref={payloadRef}
          style={{ border: 'solid 1px lightblue', marginTop: '20px' }}
          value={`{"username": "majid.k", "first_name": "Majid Ali Khan Quaid"}`}
        />
        <Button
          style={{ marginTop: '20px' }}
          onClick={() => {
            let payload = {}
            console.log('payloadRef.current', payloadRef.current?.value)
            const input = payloadRef.current?.value ?? '{}'
            try {
              payload = JSON.parse(input)
            } catch (err) {
              console.log('err ', err)
            }
            const token = signToken(payload).toString()
            if (outputRef.current) {
              outputRef.current.value = token
            }
            loginUser()
              .then((res) => {
                console.log('response ', res)
              })
              .catch((err) => {
                console.log('error ', err)
              })
          }}
        >
          Sign Token
        </Button>
      </div>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
