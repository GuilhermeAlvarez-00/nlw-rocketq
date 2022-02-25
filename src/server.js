import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { routes } from './routes.js'

const server = express()

server.set('view engine', 'ejs')
server.set('views', path.join(dirname(fileURLToPath(import.meta.url)), 'views'))

server.use(express.urlencoded({ extended: true }))
server.use(routes)
server.use(express.static('public'))

server.listen(3000, () => {
  console.log('server running')
})
