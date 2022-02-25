import { openDb } from '../db/config.js'

export default {
  async create(req, res) {
    const { password } = req.body

    const db = await openDb()

    let roomId = 0
    let isRoom = true

    while (isRoom) {
      for (let i = 0; i < 6; i++) {
        roomId === 0
          ? (roomId = Math.floor(Math.random() * 10))
          : (roomId += Math.floor(Math.random() * 10).toString())
      }

      const roomsIds = await db.all(`SELECT id FROM rooms`)
      isRoom = roomsIds.some(room => room.id === roomId)

      if (!isRoom) {
        console.log('room created')
        await db.run(
          `INSERT INTO rooms (id, pass) VALUES (${Number(roomId)}, ${password})`
        )
      }
    }

    await db.close()

    res.redirect(`room/${roomId}`)
  },

  async open(req, res) {
    const roomId = req.params.room

    res.render('room', { roomId })
  }
}
