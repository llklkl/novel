import { Router } from 'express'
import { getChapterContent } from '../services/novelService.js'

const router = Router()

router.get('/:id/chapters/:num', async (req, res) => {
  try {
    const num = parseInt(req.params.num, 10)
    const chapter = await getChapterContent(req.params.id, num)
    if (!chapter) {
      res.status(404).json({ error: 'Chapter not found' })
      return
    }
    res.json(chapter)
  } catch (e) {
    res.status(500).json({ error: 'Failed to read chapter' })
  }
})

export default router