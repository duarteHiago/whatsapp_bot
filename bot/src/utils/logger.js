const fs = require('fs');
const path = require('path');

class Logger {
  constructor() {
    this.logDir = path.join(__dirname, '../../logs');
    this.ensureLogDir();
  }

  ensureLogDir() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  log(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      data
    };

    const logString = JSON.stringify(logEntry, null, 2);
    
    // Console
    console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`);
    if (data) console.log(data);

    // Arquivo
    try {
      const filename = `${new Date().toISOString().split('T')[0]}.log`;
      const filepath = path.join(this.logDir, filename);
      
      fs.appendFileSync(filepath, logString + '\n');
    } catch (error) {
      console.error('Erro ao escrever log:', error.message);
    }
  }

  info(message, data) {
    this.log('info', message, data);
  }

  error(message, data) {
    this.log('error', message, data);
  }

  warn(message, data) {
    this.log('warn', message, data);
  }

  debug(message, data) {
    if (process.env.NODE_ENV === 'development') {
      this.log('debug', message, data);
    }
  }
}

module.exports = new Logger();