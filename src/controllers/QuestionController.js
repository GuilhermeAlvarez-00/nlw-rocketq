export default {
  index(req, res) {
    const { room: roomId, question: questionId, action } = req.params
    const { password } = req.body

    console.log(
      `room = ${roomId}, question = ${questionId}, action = ${action}, password = ${password}`
    )
  }
}
