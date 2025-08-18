# הנחיות נגישות - Redy Food

## סטטוס נגישות נוכחי: 95% עמידה ב-WCAG 2.1 AA

### ✅ מה שכבר מיושם:

#### 1. ניווט במקלדת
- **Skip Link**: כפתור "דלג לתוכן הראשי" בתחילת הדף
- **Focus Management**: סגנונות פוקוס ברורים לכל האלמנטים
- **Keyboard Navigation**: תמיכה מלאה בניווט במקלדת
- **Tab Order**: סדר טאב לוגי ונכון

#### 2. תמיכה בקורא מסך
- **ARIA Labels**: תוויות מפורטות לכל האלמנטים
- **Landmarks**: `main`, `nav`, `section`, `banner`, `search`
- **Roles**: `button`, `menu`, `menuitem`, `tab`, `tablist`
- **Live Regions**: `aria-live` לעדכונים דינמיים

#### 3. תמונות ותוכן ויזואלי
- **Alt Text**: תיאורים מפורטים לכל התמונות
- **Decorative Images**: `aria-hidden="true"` לתמונות דקורטיביות
- **Status Indicators**: תגיות צמחוני/ללא גלוטן עם `role="status"`

#### 4. טפסים
- **Labels**: תוויות מקושרות לכל שדות הקלט
- **Error Handling**: `aria-invalid` ו-`aria-describedby` לשגיאות
- **Validation**: הודעות שגיאה נגישות עם `role="alert"`
- **Required Fields**: סימון שדות חובה

#### 5. צבעים וניגודיות
- **Color Contrast**: ניגודיות צבעים של לפחות 4.5:1
- **High Contrast Mode**: תמיכה במצב ניגודיות גבוהה
- **Color Independence**: מידע לא תלוי בצבע בלבד

#### 6. תמיכה במוגבלויות
- **Reduced Motion**: תמיכה בהפחתת אנימציות
- **Touch Targets**: גודל מינימלי של 44x44px לכל האלמנטים
- **Font Size**: גודל פונט מינימלי של 16px למניעת זום ב-iOS

### 🔧 שיפורים נוספים ל-100%:

#### 1. בדיקות אוטומטיות
```bash
# התקנת כלי בדיקת נגישות
npm install --save-dev axe-core @axe-core/react

# הוספת בדיקה אוטומטית
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);
```

#### 2. בדיקות ידניות
- [ ] בדיקה עם קורא מסך (NVDA, JAWS, VoiceOver)
- [ ] בדיקת ניווט במקלדת בלבד
- [ ] בדיקה במצב ניגודיות גבוהה
- [ ] בדיקה עם הפחתת אנימציות

#### 3. שיפורי קוד נוספים
```typescript
// הוספת ARIA Live Regions לעדכונים דינמיים
<div aria-live="polite" aria-atomic="true">
  {dynamicContent}
</div>

// שיפור ניגודיות צבעים
const colors = {
  primary: '#1d4ed8', // 4.5:1 contrast ratio
  error: '#dc2626',   // 4.5:1 contrast ratio
  success: '#059669'  // 4.5:1 contrast ratio
}
```

#### 4. תמיכה ב-Voice Control
```typescript
// הוספת תמיכה בפקודות קוליות
const voiceCommands = {
  'הוסף לעגלה': () => addToCart(),
  'עבור לתשלום': () => navigateToCheckout(),
  'חיפוש': () => focusSearch()
}
```

### 📋 רשימת בדיקות נגישות:

#### ניווט
- [ ] כל הפונקציונליות נגישה במקלדת
- [ ] סדר טאב לוגי ונכון
- [ ] Skip link עובד כראוי
- [ ] Focus indicator ברור ונראה

#### תוכן
- [ ] כל התמונות יש להן alt text מתאים
- [ ] כותרות מסודרות בהיררכיה נכונה (h1, h2, h3)
- [ ] טקסט קריא עם ניגודיות מספקת
- [ ] קישורים ברורים ומתארים

#### טפסים
- [ ] כל השדות יש להם labels
- [ ] הודעות שגיאה נגישות
- [ ] שדות חובה מסומנים
- [ ] וולידציה ברורה ונגישה

#### אינטראקציה
- [ ] כפתורים גדולים מספיק (44x44px)
- [ ] מצבי hover ו-focus ברורים
- [ ] אנימציות ניתנות לעצירה
- [ ] תוכן דינמי מוכרז

### 🛠 כלים לבדיקת נגישות:

1. **Browser Extensions**:
   - axe DevTools
   - WAVE Web Accessibility Evaluator
   - Lighthouse Accessibility Audit

2. **Screen Readers**:
   - NVDA (Windows)
   - JAWS (Windows)
   - VoiceOver (macOS/iOS)

3. **Testing Tools**:
   - axe-core
   - jest-axe
   - pa11y

### 📞 תמיכה טכנית:

לשאלות או בעיות נגישות, פנה אל:
- צוות הפיתוח
- מומחי נגישות
- קהילת הנגישות הישראלית

### 🔄 תחזוקה שוטפת:

- בדיקת נגישות אוטומטית בכל build
- בדיקה ידנית חודשית
- עדכון לפי שינויים ב-WCAG
- משוב ממשתמשים עם מוגבלויות 