# הנחיות ביצועים - Redy Food

## סטטוס ביצועים נוכחי: 75% (צריך שיפור)

### 🚀 שיפורים שביצענו:

#### 1. אופטימיזציית תמונות
- ✅ **Next.js Image Component** - שימוש ב-Image component עם אופטימיזציה אוטומטית
- ✅ **WebP/AVIF Support** - תמיכה בפורמטים מודרניים
- ✅ **Lazy Loading** - טעינה עצלה לתמונות לא קריטיות
- ✅ **Quality Optimization** - איכות מותאמת לכל תמונה
- ✅ **Preload Critical Images** - טעינה מוקדמת של תמונות חשובות

#### 2. אופטימיזציית JavaScript
- ✅ **Dynamic Imports** - טעינה דינמית של קומפוננטים
- ✅ **Bundle Splitting** - חלוקת הקוד לחבילות קטנות
- ✅ **Tree Shaking** - הסרת קוד לא בשימוש
- ✅ **Code Splitting** - חלוקה לפי דפים

#### 3. אופטימיזציית CSS
- ✅ **Critical CSS** - CSS קריטי מוטמע
- ✅ **PurgeCSS** - הסרת CSS לא בשימוש
- ✅ **Minification** - דחיסת CSS

#### 4. אופטימיזציית רשת
- ✅ **Preconnect** - חיבור מוקדם לדומיינים חיצוניים
- ✅ **Preload** - טעינה מוקדמת של משאבים קריטיים
- ✅ **Compression** - דחיסת קבצים
- ✅ **Caching** - אחסון במטמון

### 📊 מדדי ביצועים יעד:

#### Core Web Vitals:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms  
- **CLS (Cumulative Layout Shift)**: < 0.1

#### Performance Metrics:
- **First Contentful Paint**: < 1.8s
- **Speed Index**: < 3.4s
- **Total Blocking Time**: < 200ms

### 🔧 כלי בדיקה:

#### 1. Bundle Analyzer
```bash
npm run analyze
```
- מנתח את גודל הקבצים
- מזהה קבצים גדולים
- מציע אופטימיזציות

#### 2. Lighthouse
```bash
npm run lighthouse
```
- בדיקת ביצועים מלאה
- המלצות לשיפור
- דוח מפורט

#### 3. Google PageSpeed Insights
- בדיקה מקוונת
- המלצות ספציפיות
- השוואה עם אתרים אחרים

### 🎯 שיפורים נוספים נדרשים:

#### 1. אופטימיזציית תמונות נוספת
- [ ] **Image Compression** - דחיסה נוספת של תמונות
- [ ] **Responsive Images** - תמונות מותאמות לכל מכשיר
- [ ] **Progressive Loading** - טעינה הדרגתית
- [ ] **WebP Conversion** - המרה לפורמט WebP

#### 2. אופטימיזציית JavaScript
- [ ] **Remove Unused Code** - הסרת קוד לא בשימוש
- [ ] **Minify JavaScript** - דחיסת JavaScript
- [ ] **Code Splitting** - חלוקה נוספת של הקוד
- [ ] **Tree Shaking** - הסרת exports לא בשימוש

#### 3. אופטימיזציית רשת
- [ ] **CDN Setup** - שימוש ב-CDN
- [ ] **HTTP/2 Push** - דחיפה של משאבים
- [ ] **Service Worker** - אחסון במטמון מתקדם
- [ ] **Resource Hints** - רמזים למשאבים

#### 4. אופטימיזציית שרת
- [ ] **Server Optimization** - אופטימיזציית שרת
- [ ] **Database Optimization** - אופטימיזציית מסד נתונים
- [ ] **Caching Strategy** - אסטרטגיית אחסון במטמון
- [ ] **Load Balancing** - איזון עומסים

### 📈 מדדי מעקב:

#### שבועי:
- בדיקת Lighthouse Score
- מעקב אחרי Core Web Vitals
- בדיקת Bundle Size

#### חודשי:
- השוואה עם אתרים מתחרים
- עדכון אופטימיזציות
- בדיקת כלים חדשים

### 🛠 כלי אופטימיזציה:

#### 1. Next.js Optimizations
```javascript
// next.config.js
module.exports = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons'],
  },
}
```

#### 2. Image Optimization
```javascript
// components/Image.js
<Image
  src={imageUrl}
  width={400}
  height={300}
  quality={85}
  placeholder="blur"
  loading="lazy"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

#### 3. Dynamic Imports
```javascript
// Dynamic loading
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false
})
```

### 📞 תמיכה טכנית:

לשאלות או בעיות ביצועים, פנה אל:
- צוות הפיתוח
- מומחי ביצועים
- Google PageSpeed Insights

### 🎯 יעדים ל-2025:

1. **Lighthouse Score**: 95+ בכל הקטגוריות
2. **Core Web Vitals**: 100% עמידה
3. **Bundle Size**: הקטנה ב-30%
4. **Image Optimization**: 50% הקטנה בגודל
5. **Loading Speed**: שיפור ב-40% 