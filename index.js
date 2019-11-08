const express = require('express')
const CryptoJS = require("crypto-js")
const cors = require('cors')
const app = express()


const port = 6969
const defaultKey = 'khoa đẹp trai'

let db = [];
let currentId = 0;


const random = () => Math.round(Math.random() * 1000000)
const hashPassword = (password, key = defaultKey) => CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(password, key))


app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/login/:email/:password', (req, res) => {
  const { email, password } = req.params
  const user = db.find(user => user.email === email)
  if (user) {
    const hash = hashPassword(password)
    if (user.password === hash) {
      return res.send('OK')
    }
  }
  return res.send('NO OKE')
})

app.get('/signup/:email/:password/', (req, res) => {
  const { password, email } = req.params

  if (db.find(user => user.email === email)) {
    return res.send('This email is already used by another')
  }

  const hash = hashPassword(password)
  
  db = [
    ...db,
    { _id: currentId, email, password: hash }
  ]
  console.log(db)
  currentId++
  res.sendStatus(200)
})

app.get('/reset-password/:email', (req, res) => {
  const { email } = req.params
  if (db.find(user => user.email === email)) {
    db = db.reduce((total, current) => {
      if (current.email === email) {
        return [ ...total, { ...current, email, code: random() } ]
      }
      return total
    }, [])
    res.send('Rực rỡ')
  } else {
    res.send('Please check your email');
  }
  console.log(db)
})

app.get('/confirm-reset-password/:code/:newPassword', (req, res) => {
  const { code, newPassword } = req.params
  if (db.find(user => user.code === code)) {
    db = db.reduce((total, current) => {
      if (current.code === code) {
        return [ ...total, { ...current, code: null, password: hashPassword(newPassword) } ]
      }
    }, [])
    res.send('Rực rỡ')
  } else {
    res.sendStatus(404)
  }
  console.log(db)

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))