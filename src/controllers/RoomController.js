import { openDb } from '../db/config.js'

export default {
  async create(req, res) {
    const { password } = req.body

    const db = await openDb()

    let roomId = 0
    for (let i = 0; i < 6; i++) {
      roomId === 0
        ? (roomId = Math.floor(Math.random() * 10))
        : (roomId += Math.floor(Math.random() * 10).toString())
    }

    await db.run(
      `INSERT INTO rooms (id, pass) VALUES (${Number(roomId)}, ${password})`
    )

    await db.close()

    res.redirect(`room/${roomId}`)
  }
}
