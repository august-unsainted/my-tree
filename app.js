const slider = document.querySelector('.slider')
const next = document.querySelector('.next')
const prev = document.querySelector('.prev')
const modalGallery = document.getElementById('modal-gallery1')
const modalWindow = document.querySelector('.gallery-window')
const galleryOverlay = document.querySelector('.gallery-overlay')
const counter = document.querySelector('.counter')
const mainModal = document.querySelector('.modal')
const mainModalWindow = document.querySelector('.modal-window')
const sim1 = document.querySelector('.саша')
const mainOverlay = document.querySelector('.overlay')
const descriptionsDiv = document.getElementById('description')
const screenPreview = document.getElementById('screen-preview')
let screens = document.querySelectorAll('.screens')
let sims = document.getElementsByClassName('sims')
let mainName = document.getElementById('main-name')
let death = document.getElementById('death')
let avatar = document.getElementById('avatar')
let traits = document.getElementById('traits')
let descriptions = document.querySelectorAll('.description')
let biography = document.querySelector('.biography')
let input = document.getElementsByTagName('input')
let body = document.body

for (i = 0; i < sims.length; i++) {
  let simName = sims[i].className
  person.forEach((sim) => {
    if (simName.includes(sim.firstName) == true) {
      content = 'url(./avatar/' + sim.firstName + '.png'
      sims[i].style.content = content
    }
  })
  if (sims[i].style.content == '') {
    sims[i].style.content = 'url(./icons/no-img.png'
  }
}

function modalOpen(mainModal, mainModalWindow) {
  body.style.overflow = 'hidden'
  mainModal.classList.add('modal-open')
  mainModalWindow.classList.add('modal-open')
  localStorage.setItem('isOpen', true)
}

function modalClose(mainModal, mainModalWindow) {
  body.style.overflow = 'scroll'
  mainModal.classList.remove('modal-open')
  mainModalWindow.classList.remove('modal-open')
}

function open(a) {
  length = person[a].screensNumber - 1
  if (i == 0) prev.style.visibility = 'hidden'
  if (i == length) next.style.visibility = 'hidden'
  localStorage.setItem('galleryIsOpen', true)
  modalOpen(modalGallery, modalWindow)
}

function display() {
  let screens = document.querySelectorAll('.screens')
  let descriptions = document.querySelectorAll('.description')
  descriptions[i].style.opacity = '1'
  descriptions[i].style.visibility = 'visible'
  screens[i].style.zIndex = 2
  screens[i].style.transform = 'translateX(0)'
  screens[i].style.opacity = '1'
  if (i > 0) {
    screens[i - 1].style.transform = 'translateX(-100%)'
    descriptions[i - 1].style.visibility = 'hidden'
    descriptions[i - 1].style.opacity = '0'
  }
  if (i < screens.length - 1) {
    screens[i + 1].style.transform = 'translateX(100%)'
    descriptions[i + 1].style.opacity = '0'
    descriptions[i + 1].style.visibility = 'hidden'
  }
  counter.innerHTML = i + 1 + '/' + screens.length
  galleryOverlay.onclick = () => {
    descriptions.forEach((item) => {
      item.style.opacity = '0'
      item.style.visibility = 'hidden'
    })
    screens.forEach((item) => {
      item.style.zIndex = '0'
      item.style.transform = 'translateX(0)'
      item.style.opacity = '0'
    })
    prev.style.visibility = 'visible'
    next.style.visibility = 'visible'
    modalClose(modalGallery, modalWindow)
    localStorage.setItem('galleryIsOpen', false)
  }
  localStorage.setItem('i', i)
}

function sliderPrev() {
  next.style.visibility = 'visible'
  if (i > 0) i--
  if (i == 0) prev.style.visibility = 'hidden'
  display(i)
  console.log(i)
}

function sliderNext() {
  prev.style.visibility = 'visible'
  let length = document.querySelectorAll('.screens').length - 1
  if (i < length) i++
  if (i == length) next.style.visibility = 'hidden'
  display()
  console.log(i)
}

function modalShow(a) {
  avatar.content = ''
  descriptionsDiv.innerHTML = ''
  slider.innerHTML = ''
  traits.innerHTML = ''
  biography.innerHTML = ''
  screenPreview.innerHTML = ''
  localStorage.setItem('activePerson', a)
  mainName.innerHTML = person[a].firstName + ' ' + person[a].lastName
  if (person[a].death === undefined) {
    deathDiv = document.querySelector('.death')
    deathDiv.style.visibility = 'hidden'
  } else death.innerHTML = person[a].death
  avatar.style.content = 'url(./avatar/' + person[a].firstName + '.png'
  if (person[a].traits === undefined) {
    traits.innerHTML = '<li>Нет черт характера</li>'
  } else {
    person[a].traits.forEach((item) => {
      let li = '<li>' + item + '</li>'
      traits.innerHTML = traits.innerHTML + li
    })
  }
  if (person[a].bio != undefined) {
    let bioSplit = person[a].bio.split('\n')
    if (bioSplit.constructor === Array) {
      bioSplit.forEach((item) => {
        let p = '<p>' + item + '</p>'
        biography.innerHTML = biography.innerHTML + p
      })
    } else {
      biography.innerHTML = '<p>' + person[a].bio + '</p>'
    }
  } else biography.innerHTML = '<p>У персонажа нет биографии</p>'

  if (person[a].gallery != undefined && person[a].screensNumber != undefined) {
    person[a].descriptions.forEach((item) => {
      let span = '<span class="description">' + item + '</span>'
      descriptionsDiv.innerHTML = descriptionsDiv.innerHTML + span
    })
    for (let i = 0; i < person[a].screensNumber; i++) {
      if (person[a].descriptions[i] == undefined) {
        let span = '<span class="description"> </span>'
        descriptionsDiv.innerHTML = descriptionsDiv.innerHTML + span
        person[a].descriptions[i] = ''
      }
      index = i + 1
      let previewImg =
        '<img class="screen-preview select-cursor" data-index="' +
        index +
        '" src="./' +
        person[a].gallery +
        '/' +
        index +
        '.png">'
      let img =
        '<img class="screens" src="./' +
        person[a].gallery +
        '/' +
        index +
        '.png">'
      slider.innerHTML = slider.innerHTML + img
      screenPreview.innerHTML = screenPreview.innerHTML + previewImg
    }
  } else screenPreview.innerHTML = '<p>У персонажа нет галереи</p>'
  document.querySelectorAll('.screen-preview').forEach((btn) => {
    btn.addEventListener('click', (btn) => {
      i = btn.currentTarget.getAttribute('data-index') - 1
      display()
      open(a)
      mainOverlay.style.zIndex = '-1'
    })
  })
  prev.onclick = () => {
    sliderPrev()
  }
  next.onclick = () => {
    sliderNext()
  }
}

addEventListener('keydown', (e) => {
  if (e.key == 'ArrowLeft') sliderPrev()
  if (e.key == 'ArrowRight') sliderNext()
})

mainOverlay.onclick = () => {
  modalClose(mainModal, mainModalWindow)
  for (i = 0; i < input.length; i++) {
    if (input[i].type == 'checkbox') input[i].checked = false
  }
  localStorage.setItem('isOpen', false)
}

let activeModal = localStorage.getItem('isOpen')
let activePerson = localStorage.getItem('activePerson')
let activeGallery = localStorage.getItem('galleryIsOpen')

if (activeModal == 'true') {
  modalShow(activePerson)
  modalOpen(mainModal, mainModalWindow)
  if (activeGallery == 'true') {
    i = Number(localStorage.getItem('i'))
    display()
    open(Number(activePerson))
    mainOverlay.style.zIndex = '-1'
  }
}

function openPersonalModal() {
  for (let n = 0; n < sims.length; n++) {
    let simName = sims[n].className
    sims[n].addEventListener('click', () => {
      person.forEach((person, a) => {
        if (simName.includes(person.firstName) == true) {
          if (activeModal === 'true') {
            for (i = 0; i < input.length; i++) {
              if (input[i].type == 'checkbox') input[i].checked = false
            }
          }
          modalShow(a)
          modalOpen(mainModal, mainModalWindow)
        }
      })
    })
  }
}

openPersonalModal()
