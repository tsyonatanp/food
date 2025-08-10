interface LogEvent {
  level: 'info' | 'warn' | 'error' | 'security'
  message: string
  timestamp: string
  ip?: string
  userAgent?: string
  userId?: string
  endpoint?: string
  details?: any
}

class Logger {
  private logs: LogEvent[] = []
  private maxLogs = 1000 // שמור רק 1000 רשומות אחרונות

  private addLog(event: LogEvent) {
    this.logs.push(event)
    
    // שמור רק הרשומות האחרונות
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs)
    }

    // הדפס לקונסול
    const logMessage = `[${event.timestamp}] ${event.level.toUpperCase()}: ${event.message}`
    
    switch (event.level) {
      case 'info':
        console.log(logMessage)
        break
      case 'warn':
        console.warn(logMessage)
        break
      case 'error':
        console.error(logMessage)
        break
      case 'security':
        console.error(`🔒 SECURITY: ${logMessage}`)
        break
    }

    // אם זה אירוע אבטחה, שלח התראה
    if (event.level === 'security') {
      this.sendSecurityAlert(event)
    }
  }

  info(message: string, details?: any) {
    this.addLog({
      level: 'info',
      message,
      timestamp: new Date().toISOString(),
      details
    })
  }

  warn(message: string, details?: any) {
    this.addLog({
      level: 'warn',
      message,
      timestamp: new Date().toISOString(),
      details
    })
  }

  error(message: string, details?: any) {
    this.addLog({
      level: 'error',
      message,
      timestamp: new Date().toISOString(),
      details
    })
  }

  security(message: string, details?: any) {
    this.addLog({
      level: 'security',
      message,
      timestamp: new Date().toISOString(),
      details
    })
  }

  // לוג API requests
  apiRequest(endpoint: string, ip: string, userAgent: string, userId?: string) {
    this.info(`API Request: ${endpoint}`, {
      endpoint,
      ip,
      userAgent,
      userId
    })
  }

  // לוג ניסיונות התחברות כושלים
  failedLogin(email: string, ip: string, userAgent: string) {
    this.security(`Failed login attempt for: ${email}`, {
      email,
      ip,
      userAgent,
      timestamp: new Date().toISOString()
    })
  }

  // לוג rate limit violations
  rateLimitViolation(ip: string, endpoint: string) {
    this.security(`Rate limit violation from IP: ${ip}`, {
      ip,
      endpoint,
      timestamp: new Date().toISOString()
    })
  }

  // לוג ניסיונות גישה לא מורשים
  unauthorizedAccess(ip: string, endpoint: string, userAgent: string) {
    this.security(`Unauthorized access attempt`, {
      ip,
      endpoint,
      userAgent,
      timestamp: new Date().toISOString()
    })
  }

  // לוג העלאת קבצים
  fileUpload(userId: string, fileName: string, fileSize: number) {
    this.info(`File uploaded`, {
      userId,
      fileName,
      fileSize,
      timestamp: new Date().toISOString()
    })
  }

  // קבל את כל הלוגים
  getLogs(): LogEvent[] {
    return [...this.logs]
  }

  // קבל לוגים לפי רמה
  getLogsByLevel(level: LogEvent['level']): LogEvent[] {
    return this.logs.filter(log => log.level === level)
  }

  // קבל אירועי אבטחה
  getSecurityEvents(): LogEvent[] {
    return this.getLogsByLevel('security')
  }

  // שלח התראה על אירועי אבטחה
  private async sendSecurityAlert(event: LogEvent) {
    try {
      // כאן אפשר לשלוח התראה למייל או Slack
      console.error('🚨 SECURITY ALERT:', event)
      
      // אם יש webhook, שלח אליו
      if (process.env.SECURITY_WEBHOOK_URL) {
        await fetch(process.env.SECURITY_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `🚨 Security Alert: ${event.message}`,
            details: event.details
          })
        })
      }
    } catch (error) {
      console.error('Failed to send security alert:', error)
    }
  }

  // נקה לוגים ישנים
  clearOldLogs() {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    this.logs = this.logs.filter(log => new Date(log.timestamp) > oneDayAgo)
  }
}

export const logger = new Logger()

// נקה לוגים ישנים כל שעה
if (typeof window === 'undefined') {
  setInterval(() => {
    logger.clearOldLogs()
  }, 60 * 60 * 1000) // כל שעה
}
