import { openDb } from '../db/config.js'

export default {
  async index(req, res) {
    const db = await openDb()

    const { room: roomId, question: questionId, action } = req.params
    const { password } = req.body

    const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)
    if (verifyRoom.pass === password) {
      if (action === 'delete')
        await db.run(`DELETE FROM questions WHERE id = ${questionId}`)
      else if (action === 'check')
        await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)

      res.redirect(`/room/${roomId}`)
    } else {
      res.render(`incorrectpass`, { roomId })
    }
  },

  async create(req, res) {
    const db = await openDb()

    const { room: roomId } = req.params
    const { question } = req.body

    await db.run(
      `
      INSERT INTO questions (room, title, read) VALUES (
        ${Number(roomId)}, 
        "${question}", 
        0
      )`
    )

    res.redirect(`/room/${roomId}`)
  }
}
