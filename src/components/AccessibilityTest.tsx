'use client'

import { useEffect } from 'react'
import axe from 'axe-core'

interface Violation {
  description: string
  impact: string
  nodes: any[]
}

export default function AccessibilityTest() {
  useEffect(() => {
    // בדיקת נגישות אוטומטית רק בסביבת פיתוח
    if (process.env.NODE_ENV === 'development') {
      const runAccessibilityTest = async () => {
        try {
          const results = await axe.run()
          
          if (results.violations.length > 0) {
            console.warn('נמצאו בעיות נגישות:', results.violations)
            
            results.violations.forEach((violation: any) => {
              console.warn(`בעיה: ${violation.description}`)
              console.warn(`עוצמה: ${violation.impact || 'לא ידוע'}`)
              console.warn(`אלמנטים: ${violation.nodes?.length || 0}`)
            })
          } else {
            console.log('✅ לא נמצאו בעיות נגישות!')
          }
        } catch (error) {
          console.error('שגיאה בבדיקת נגישות:', error)
        }
      }

      // הרץ בדיקה אחרי טעינת הדף
      setTimeout(runAccessibilityTest, 1000)
    }
  }, [])

  return null // קומפוננט לא מציג כלום
} 