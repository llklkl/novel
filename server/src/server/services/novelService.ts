import { readFile, readdir } from 'fs/promises'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const NOVELS_DIR = resolve(__dirname, '../../../..', 'novels')

export interface Novel {
  id: string
  name: string
  genre: string
  target_words: number
  chapters_count: number
}

export async function getNovels(): Promise<Novel[]> {
  const dirs = await readdir(NOVELS_DIR, { withFileTypes: true })
  const novels: Novel[] = []
  
  for (const dir of dirs) {
    if (!dir.isDirectory() || dir.name === 'README.md') continue
    
    try {
      const projectPath = resolve(NOVELS_DIR, dir.name, 'novel-project.json')
      const content = await readFile(projectPath, 'utf-8')
      const project = JSON.parse(content)
      
      novels.push({
        id: dir.name,
        name: project.project.name,
        genre: project.project.genre,
        target_words: project.project.target_words,
        chapters_count: project.chapters.current
      })
    } catch (e) {
      console.error(`Failed to read novel ${dir.name}:`, e)
    }
  }
  
  return novels
}

export async function getNovelById(id: string): Promise<any | null> {
  try {
    const projectPath = resolve(NOVELS_DIR, id, 'novel-project.json')
    const progressPath = resolve(NOVELS_DIR, id, 'progress.json')
    
    const projectContent = await readFile(projectPath, 'utf-8')
    const progressContent = await readFile(progressPath, 'utf-8')
    
    const project = JSON.parse(projectContent)
    const progress = JSON.parse(progressContent)
    
    return {
      ...project,
      progress
    }
  } catch (e) {
    return null
  }
}

export async function getChapterContent(novelId: string, chapterNum: number): Promise<{ number: number; title: string; content: string } | null> {
  try {
    const chapterPath = resolve(NOVELS_DIR, novelId, 'chapters', `chapter-${String(chapterNum).padStart(2, '0')}.md`)
    const content = await readFile(chapterPath, 'utf-8')
    
    const lines = content.split('\n')
    const titleLine = lines.find(l => l.startsWith('#'))
    const title = titleLine ? titleLine.replace(/^#\s*/, '').split(':')[1]?.trim() || titleLine.replace(/^#\s*/, '') : `第${chapterNum}章`
    
    const bodyContent = lines
      .filter(l => !l.startsWith('#') && !l.startsWith('**状态:**') && !l.startsWith('**创建时间:**') && !l.startsWith('**最后修改:**') && !l.startsWith('---'))
      .join('\n')
      .trim()
    
    return {
      number: chapterNum,
      title,
      content: bodyContent
    }
  } catch (e) {
    return null
  }
}