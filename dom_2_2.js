const tasks = [
  {
    id: '1138465078061',
    completed: false,
    text: 'Посмотреть новый урок по JavaScript',
  },
  {
    id: '1138465078062',
    completed: false,
    text: 'Выполнить тест после урока',
  },
  {
    id: '1138465078063',
    completed: false,
    text: 'Выполнить ДЗ после урока',
  },
]
const createTask = (taskId, taskText) => {
  const taskItem = document.createElement('div')
  taskItem.className = 'task-item'
  taskItem.dataset.taskId = taskId // Устанавливает атрибут data-task-id равным taskId (это будет использоваться для идентификации задачи).
  const taskItemContainer = document.createElement('div')
  taskItemContainer.className = 'task-item__main-container'
  const taskItemContent = document.createElement('div')
  taskItemContent.className = 'task-item__main-content'
  taskItem.append(taskItemContainer)
  taskItemContainer.append(taskItemContent)

  const checkboxForm = document.createElement('form')
  checkboxForm.className = 'checkbox-form'

  const inputCheckbox = document.createElement('input')
  inputCheckbox.className = 'checkbox-form__checkbox'
  inputCheckbox.type = 'checkbox'

  const inputId = `task-${taskId}`
  inputCheckbox.id = inputId

  const labelCheckbox = document.createElement('label')
  labelCheckbox.htmlFor = inputId

  checkboxForm.append(inputCheckbox, labelCheckbox)

  const taskItemText = document.createElement('span')
  taskItemText.className = 'task-item__text'
  taskItemText.innerText = taskText

  const deleteButton = document.createElement('button')
  deleteButton.className =
    'task-item__delete-button default-button delete-button'
  deleteButton.innerText = 'Удалить'

  taskItemContent.append(checkboxForm, taskItemText)
  taskItemContainer.append(deleteButton)

  return taskItem
}

const tasksListContainer = document.querySelector('.tasks-list')

const taskForm = document.querySelector('.create-task-block')
taskForm.addEventListener('submit', (event) => {
  console.log(event)
  event.preventDefault()
  const { target } = event
  console.log(target)

  const text = event.target.taskName.value.trim()
  const $errorBlock = taskForm.querySelector('.error-message-block') // Цель: Этот код предназначен для поиска на странице уже существующего элемента, который отображает сообщение об ошибке. Используется для удаления старого сообщения об ошибке, если оно есть.
  if ($errorBlock) {
    $errorBlock.remove() //если при предыдущей отправке формы возникла ошибка, и сообщение об этой ошибке было показано пользователю, то перед обработкой новой отправки это сообщение об ошибке удаляется. Это делается для того, чтобы пользователь не видел старое сообщение об ошибке, если текущие данные верны.
  }
  if (!text) {
    taskForm.append(createError('Название задачи не должно быть пустым')) //если текст пустой мы добавляем ошибку
    return
  }
  const isEqualText = tasks.some(
    (task) => task.text.toLowerCase() === text.toLowerCase()
  )
  if (isEqualText) {
    taskForm.append(createError('Задача с таким названием уже существует')) //если такой текст уже есть, мы добавляем ошибку
    event.target.taskName.value = ''
    return
  }

  const task = {
    id: String(Date.now()),
    completed: false,
    text,
  }
  tasks.push(task)
  tasksListContainer.append(createTask(task.id, task.text))
  event.target.taskName.value = ''
  console.log(tasks)
})

tasks.forEach((task) => {
  const taskItem = createTask(task.id, task.text)
  tasksListContainer.append(taskItem)
})

function createError(textError) {
  const spanErrorMessage = document.createElement('span') // Это создание нового HTML-элемента и задание ему класса.Используется для добавления нового сообщения об ошибке.
  spanErrorMessage.className = 'error-message-block' // для стилизации ошибки
  spanErrorMessage.innerText = textError
  return spanErrorMessage
}

// const tasks = [
//   {
//     id: '1138465078061',
//     completed: false,
//     text: 'Посмотреть новый урок по JavaScript',
//   },
//   {
//     id: '1138465078062',
//     completed: false,
//     text: 'Выполнить тест после урока',
//   },
//   {
//     id: '1138465078063',
//     completed: false,
//     text: 'Выполнить ДЗ после урока',
//   },
// ]

// const tasksList = document.querySelector('.tasks-list')

// const createTask = (task) => {
//   const $taskItem = document.createElement('div')
//   $taskItem.className = 'task-item'
//   $taskItem.dataset.taskId = task.id

//   const $taskItemMainContainer = document.createElement('div')
//   $taskItemMainContainer.className = 'task-item__main-container'

//   const $taskItemMainContent = document.createElement('div')
//   $taskItemMainContent.className = 'task-item__main-content'

//   $taskItem.append($taskItemMainContainer)
//   $taskItemMainContainer.append($taskItemMainContent)

//   const $checkboxForm = document.createElement('form')
//   $checkboxForm.className = 'checkbox-form'

//   const $inputCheckbox = document.createElement('input')
//   $inputCheckbox.type = 'checkbox'
//   $inputCheckbox.className = 'checkbox-form__checkbox'
//   $inputCheckbox.id = `task - ${task.id}`
//   $inputCheckbox.checked = task.completed

//   const $labelCheckbox = document.createElement('label')
//   $labelCheckbox.htmlFor = $inputCheckbox.id

//   const $taskItemtext = document.createElement('span')
//   $taskItemtext.className = 'task-item__text'
//   $taskItemtext.textContent = task.text

//   const $deleteButton = document.createElement('button')
//   $deleteButton.className =
//     'task-item__delete-button default-button delete-button'
//   $deleteButton.textContent = 'Удалить'
//   $deleteButton.addEventListener('click', () => {
//     $taskItem.remove()
//   })

//   $taskItemMainContent.append($checkboxForm, $taskItemtext)
//   $checkboxForm.append($inputCheckbox, $labelCheckbox)
//   $taskItemMainContainer.append($deleteButton)

//   return $taskItem
// }
// //////////////////////////////
// const taskForm = document.querySelector('.create-task-block')
// taskForm.addEventListener('submit', (event) => {
//   event.preventDefault()
//   const text = event.target.taskName.value.trim()
//   const $errorBlock = taskForm.querySelector('.error-message-block')
//   if ($errorBlock) {
//     $errorBlock.remove()
//   }
//   if (!text) {
//     taskForm.append(createError('Название задачи не должно быть пустым')) //если текст пустой мы добавляем ошибку
//     return
//   }
//   const isEqualText = tasks.some(
//     (task) => task.text.toLowerCase() === text.toLowerCase()
//   )
//   if (isEqualText) {
//     taskForm.append(createError('Задача с таким названием уже существует')) //если такой текст уже есть, мы добавляем ошибку
//     event.target.taskName.value = ''
//     isEqualText.remove()
//   }
//   const task = {
//     id: Date.now().toString(),
//     completed: false,
//     text,
//   }
//   tasksList.append(createTask(task))
//   tasks.push(task)
//   event.target.taskName.value = ''
// })
// //
// function createError(textError) {
//   const $errorM = document.createElement('span')
//   $errorM.className = 'error-message-block'
//   $errorM.innerText = textError
//   return $errorM
// }

// //

// tasks.forEach((task) => {
//   const taskItem = createTask(task)
//   tasksList.append(taskItem)
//   console.log(tasksList)
// })
