import { NextResponse } from 'next/server'
import { google } from 'googleapis'

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS || '{}'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
})

const sheets = google.sheets({ version: 'v4', auth })

export async function GET() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: 'Menu!A2:I', // Assuming headers are in row 1
    })

    const rows = response.data.values || []
    
    const menu = rows.map((row, index) => ({
      id: String(index + 1),
      name: row[0] || '',
      category: row[1] || '',
      pricePerGram: Number(row[2]) / 100 || 0,
      description: row[3] || '',
      minWeight: Number(row[4]) || 100,
      maxWeight: Number(row[5]) || 1000,
      available: row[6] === 'במלאי',
      imageUrl: row[7] || '',
      tags: (row[8] || '').split(',').map((tag: string) => tag.trim()).filter(Boolean)
    }))

    return NextResponse.json(menu)
  } catch (error) {
    console.error('Failed to fetch menu from Google Sheets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch menu' },
      { status: 500 }
    )
  }
} 