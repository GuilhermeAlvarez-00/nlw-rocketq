import { openDb } from './config.js'

const initDb = {
  async init() {
    const db = await openDb()

    await db.exec(
      `
        CREATE TABLE IF NOT EXISTS rooms (
          id INTEGER PRIMARY KEY,
          pass TEXT
        )
      `
    )

    await db.exec(
      `
      CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        room INT,
        title TEXT,
        read INT
      )`
    )

    await db.close()
  }
}

initDb.init()
