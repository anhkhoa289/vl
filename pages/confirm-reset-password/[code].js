import React, {useState} from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const base = 'http://localhost:6969'

const confirm = () => {
  const [noti, setNoti] = useState('')

  const router = useRouter()
  const { code } = router.query

  const reset = async (e) => {
    e.preventDefault()
    const { data } = await axios.get(`${base}/confirm-reset-password/${code}/${e.target.password.value}`)
    setNoti(`${data}`)
  }
  return (
    <>
      <div>{noti}</div>
      <form onSubmit={reset}>
        <label>new password <input type='password' name='password' /></label>
        <button type='submit'>submit</button>
      </form>
    </>
  )
}

export default confirm
