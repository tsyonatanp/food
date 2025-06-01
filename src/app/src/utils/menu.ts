import * as XLSX from 'xlsx'

interface MenuItem {
  id: string
  name: string
  category: string
  pricePerGram: number
  description: string
  minWeight: number
  maxWeight: number
  available: boolean
  imageUrl: string
  tags: string[]
}

export async function importMenuFromExcel(file: File): Promise<MenuItem[]> {
  try {
    const data = await file.arrayBuffer()
    const workbook = XLSX.read(data)
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const jsonData = XLSX.utils.sheet_to_json(worksheet)

    return jsonData.map((row: any, index) => ({
      id: String(index + 1),
      name: row['שם מנה'] || '',
      category: row['קטגוריה'] || '',
      pricePerGram: Number(row['מחיר ל-100 גרם']) / 100 || 0,
      description: row['תיאור'] || '',
      minWeight: Number(row['משקל מינימלי']) || 100,
      maxWeight: Number(row['משקל מקסימלי']) || 1000,
      available: row['זמינות'] === 'במלאי',
      imageUrl: row['קישור לתמונה'] || '',
      tags: (row['תגיות'] || '').split(',').map((tag: string) => tag.trim()).filter(Boolean)
    }))
  } catch (error) {
    console.error('Failed to import menu from Excel:', error)
    throw new Error('Failed to import menu from Excel')
  }
}

export async function importMenuFromGoogleSheets(): Promise<MenuItem[]> {
  try {
    const response = await fetch('/api/menu/google-sheets')
    if (!response.ok) {
      throw new Error('Failed to fetch menu from Google Sheets')
    }
    return await response.json()
  } catch (error) {
    console.error('Failed to import menu from Google Sheets:', error)
    throw error
  }
}

export function generateDefaultImage(name: string, category: string): string {
  // This would typically call an API to generate a simple image with text
  // For now, we'll return a placeholder URL
  return `https://via.placeholder.com/400x300/f3f4f6/374151?text=${encodeURIComponent(name)}`
}

export function validateMenuItem(item: MenuItem): string[] {
  const errors: string[] = []

  if (!item.name) errors.push('שם המנה הוא שדה חובה')
  if (!item.category) errors.push('קטגוריה היא שדה חובה')
  if (item.pricePerGram <= 0) errors.push('מחיר חייב להיות גדול מ-0')
  if (item.minWeight < 100) errors.push('משקל מינימלי חייב להיות לפחות 100 גרם')
  if (item.maxWeight > 1000) errors.push('משקל מקסימלי לא יכול לעלות על 1000 גרם')
  if (item.minWeight > item.maxWeight) errors.push('משקל מינימלי חייב להיות קטן ממשקל מקסימלי')

  return errors
} 