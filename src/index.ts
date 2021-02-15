
// Import dependencies
import path from 'path'

import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import { buildRoutes } from './routes'

const PORT = process.env.PORT || '5000'
const app: express.Express = express()

// Apply middleware
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
app.use(helmet())

app.use(express.static(path.join(__dirname, '../build')))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET')

    return res.status(200).json({})
  }

  next()
})

buildRoutes(app)

app.listen(PORT, () => {
  console.log('Server started on port', PORT)
})