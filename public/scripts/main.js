import { Modal } from './modal.js'

const modal = Modal()

const html = {
  get(element) {
    return document.querySelector(element)
  },
  content(element, content) {
    return (element.innerHTML = content)
  }
}

const modalTitle = html.get('.modal h2')
const modalDescription = html.get('.modal p')
const modalButton = html.get('.modal button')

const checkButtons = document.querySelectorAll('.actions a.check')
checkButtons.forEach(button => {
  button.addEventListener('click', handleClick)
})

const deleteButtons = document.querySelectorAll('.actions .delete')
deleteButtons.forEach(button => {
  button.addEventListener('click', event => {
    handleClick(event, false)
  })
})

function handleClick(event, check = true) {
  event.preventDefault()

  const roomId = document.querySelector('#room-id').dataset.id
  const questionId = event.target.dataset.id
  const slug = check ? 'check' : 'delete'

  const form = html.get('.modal form')
  form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`)

  const text = check ? 'Marcar como lida' : 'Excluir'
  const descriptionTitle = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`

  html.content(modalTitle, check ? `${text}` : `${text} pergunta`)
  html.content(modalDescription, descriptionTitle)
  html.content(modalButton, check ? 'Sim, confirmar' : 'Sim, excluir')
  check ? modalButton.classList.remove('red') : modalButton.classList.add('red')

  modal.open()
}
