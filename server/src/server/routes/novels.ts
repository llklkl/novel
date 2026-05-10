import { Router } from 'express'
import { getNovels, getNovelById } from '../services/novelService.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const novels = await getNovels()
    res.json({ novels })
  } catch (e) {
    res.status(500).json({ error: 'Failed to read novels' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const novel = await getNovelById(req.params.id)
    if (!novel) {
      res.status(404).json({ error: 'Novel not found' })
      return
    }
    res.json(novel)
  } catch (e) {
    res.status(500).json({ error: 'Failed to read novel' })
  }
})

export default router