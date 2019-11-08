import React, {useState} from 'react'
import Head from 'next/head'
import axios from 'axios'

const base = 'http://localhost:6969'

const Home = () => {
  const [noti, setNoti] = useState('')

  const onLogin = async (e) => {
    e.preventDefault()
    const {
      email: { value: email },
      password: { value: password },
    } = e.target

    const { data } = await axios.get(`${base}/login/${email}/${password}`)
    setNoti(data)
  }

  const onSignup = async (e) => {
    e.preventDefault()
    const {
      email: { value: email },
      password: { value: password },
    } = e.target

    const { data } = await axios.get(`${base}/signup/${email}/${password}`)
    setNoti(data)
  }
  
  const sendCodePassword = async (e) => {
    e.preventDefault()
    const { data } = await axios.get(`${base}/reset-password/${e.target.email.value}`)
    setNoti(`${data}. link reset: http://localhost:3000/confirm-reset-password/:code`)

  }
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>{noti}</div>

      <form onSubmit={onLogin}>
        <h1>Login</h1>
        <div>
          <label>
            email
            <input type='email' name='email'/>
          </label>
          <label>
            password
            <input type='password' name='password'/>
          </label>

          <button type='submit'>Submit</button>
        </div>
      </form>

      <form onSubmit={onSignup}>
        <h1>Sign up</h1>
        <div>
          <label>
            email
            <input type='email' name='email'/>
          </label>
          <label>
            password
            <input type='password' name='password'/>
          </label>

          <button type='submit'>Submit</button>
        </div>
      </form>

      <form onSubmit={sendCodePassword}>
        <h1>Send code reset</h1>
          <div>
            <label>
              email
              <input type='email' name='email'/>
            </label>

            <button type='submit'>Submit</button>
          </div>
      </form>
    </div>
  )
}

export default Home
