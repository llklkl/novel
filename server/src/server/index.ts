import express from 'express'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.static(resolve(__dirname, '../../public')))

// API routes will be added here
import novelsRouter from './routes/novels.js'
import chaptersRouter from './routes/chapters.js'
app.use('/api/novels', novelsRouter)
app.use('/api/novels', chaptersRouter)

// SPA fallback
app.get('*', (_req, res) => {
  res.sendFile(resolve(__dirname, '../../public/index.html'))
})

app.listen(PORT, () => {
  console.log(`Novel reader server running at http://localhost:${PORT}`)
})