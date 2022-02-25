import { openDb } from '../db/config.js'

export default {
  async index(req, res) {
    const { room: roomId, question: questionId, action } = req.params
    const { password } = req.body

    console.log(
      `room = ${roomId}, question = ${questionId}, action = ${action}, password = ${password}`
    )
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
