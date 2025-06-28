'use client'

import { useEffect } from 'react'

export default function AccessibilityTest() {
  useEffect(() => {
    // בדיקת נגישות אוטומטית רק בסביבת פיתוח ורק בצד הלקוח
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined' && typeof document !== 'undefined') {
      const runAccessibilityTest = async () => {
        try {
          // דינמי import של axe-core רק בצד הלקוח
          const { default: axe } = await import('axe-core')
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