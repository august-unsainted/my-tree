const slider = document.querySelector('.slider')
const next = document.querySelector('.next')
const prev = document.querySelector('.prev')
const controls = document.querySelectorAll('.control')
const modalGallery = document.getElementById('modal-gallery1')
const modalWindow = document.querySelector('.gallery-window')
const galleryOverlay = document.querySelector('.gallery-overlay')
const mainModal = document.querySelector('.modal')
const mainModalWindow = document.querySelector('.modal-window')
const mainOverlay = document.querySelector('.overlay')
const descriptionsDiv = document.getElementById('description')
const screenPreview = document.getElementById('screen-preview')
const counter = document.querySelector('.counter')
let death = document.querySelector('.death')
let screens = document.querySelectorAll('.screens')
let sims = document.getElementsByClassName('sims')
let mainName = document.getElementById('main-name')
let avatar = document.getElementById('avatar')
let traits = document.getElementById('traits')
let biography = document.querySelector('.biography')
let body = document.body

for (let i = 0; i < sims.length; i++) {
  person.forEach((person) => {
    if (sims[i].className.includes(person.firstName) == true)
      sims[i].style.content = `url(./avatar/${person.firstName}.png)`
  })
  if (sims[i].style.content == '')
    sims[i].style.content = 'url(./icons/no-img.png'
}

let icons = document.querySelectorAll('.icon')
icons.forEach((icon) => {
  iconType = icon.className.replace('icon', '')
  icon.style.content = `url(./icons/${iconType}.png)`
})

function modalOpen(mainModal, mainModalWindow) {
  body.style.overflow = 'hidden'
  mainModal.classList.add('modal-open')
  mainModalWindow.classList.add('modal-open')
  localStorage.setItem('isOpen', true)
}

function modalClose(mainModal, mainModalWindow) {
  mainModal.classList.remove('modal-open')
  mainModalWindow.classList.remove('modal-open')
}

function open(a) {
  controls.forEach((item) => item.classList.remove('hidden'))
  if (i == 0) prev.classList.add('hidden')
  if (i == person[a].screensNumber - 1) next.classList.add('hidden')
  localStorage.setItem('galleryIsOpen', true)
  modalOpen(modalGallery, modalWindow)
}

function display() {
  let screens = document.querySelectorAll('.screens')
  let descriptions = document.querySelectorAll('.description')
  if (descriptions[i] !== undefined) {
    descriptions[i].classList.add('visible')
    screens[i].style.opacity = '1'
    if (i > 0) {
      screens[i - 1].style.opacity = '0'
      descriptions[i - 1].classList.remove('visible')
    }
    if (i < screens.length - 1) {
      screens[i + 1].style.opacity = '0'
      descriptions[i + 1].classList.remove('visible')
    }
    counter.innerHTML = i + 1 + '/' + screens.length
    if (descriptions[i].innerHTML === '') {
      counter.classList.add('bgColor')
      descriptions[i].style.padding ='0'
    } else counter.classList.remove('bgColor')
    galleryOverlay.onclick = () => {
      descriptions.forEach((item) => item.classList.remove('visible'))
      screens.forEach((item) => (item.style.opacity = '0'))
      controls.forEach((item) => item.classList.add('hidden'))
      modalClose(modalGallery, modalWindow)
      localStorage.setItem('galleryIsOpen', false)
    }
    localStorage.setItem('i', i)
  }
}

function sliderPrev() {
  next.classList.remove('hidden')
  if (i > 0) i--
  if (i == 0) prev.classList.add('hidden')
  display()
}

function sliderNext() {
  prev.classList.remove('hidden')
  length = document.querySelectorAll('.screens').length - 1
  if (i < length) i++
  if (i == length) next.classList.add('hidden')
  display()
}

function modalShow(a) {
  localStorage.setItem('activePerson', a)
  avatar.style.content = `url(./avatar/${person[a].firstName}.png`
  array = [descriptionsDiv, slider, traits, biography, screenPreview]
  array.forEach((item) => (item.innerHTML = ''))
  biography.scrollTop = 0
  traits.scrollTo(0, 0)
  mainName.innerHTML = person[a].firstName + ' ' + person[a].lastName
  if (person[a].death === undefined) {
    death.style.visibility = 'hidden'
    if (person[a].traits === undefined)
      traits.innerHTML = '<li>Нет черт характера</li>'
  } else {
    death.style.visibility = 'visible'
    traits.innerHTML = `<li class="death-trait">${person[a].death}</li>`
    let traitsArray = traits.childNodes
    death.addEventListener('mouseover', () => {
      traitsArray.forEach((trait) => {
        trait.style.opacity = '0.5'
      })
      deathTrait = document.querySelector('.death-trait')
      deathTrait.style.opacity = '1'
    })
    death.addEventListener('mouseout', () => {
      traitsArray.forEach((trait) => {
        trait.style.opacity = '1'
      })
    })
  }
  if (person[a].traits !== undefined)
    person[a].traits.forEach((item) => (traits.innerHTML += `<li>${item}</li>`))

  if (person[a].bio !== undefined) {
    bioSplit = person[a].bio.split('\n')
    if (bioSplit.constructor === Array) {
      bioSplit.forEach((item) => (biography.innerHTML += `<p>${item}</p>`))
    } else biography.innerHTML = `<p>${person[a].bio}</p>`
  } else biography.innerHTML = '<p>У персонажа нет биографии</p>'

  if (person[a].screensNumber !== undefined) {
    person[a].descriptions.forEach(
      (item) =>
        (descriptionsDiv.innerHTML += `<span class="description">${item}</span>`)
    )
    for (i = 0; i < person[a].screensNumber; i++) {
      if (person[a].descriptions[i] === undefined) {
        descriptionsDiv.innerHTML +=
          '<span class="description"></span>'
        person[a].descriptions[i] = ''
      }
      a1 = a + 1
      i1 = i + 1
      slider.innerHTML += `<img class="screens" src="./screen${a1}/${i1}.png">`
      screenPreview.innerHTML += `<img class="screen-preview" src="./screen${a1}/${i1}.png">`
    }
    let btns = document.querySelectorAll('.screen-preview')
    for (let index = 0; index < btns.length; index++) {
      btns[index].addEventListener('click', () => {
        i = index
        display()
        open(a)
        mainOverlay.style.zIndex = '-1'
      })
    }
    prev.onclick = () => {
      sliderPrev()
    }
    next.onclick = () => {
      sliderNext()
    }
  } else
    screenPreview.innerHTML = '<p class="no-info">У персонажа нет галереи</p>'
}

addEventListener('keydown', (e) => {
  if (e.key == 'ArrowLeft') sliderPrev()
  if (e.key == 'ArrowRight') sliderNext()
})

function closeInputs() {
  let input = document.getElementsByTagName('input')
  for (i = 0; i < input.length; i++) {
    if (input[i].type == 'checkbox') input[i].checked = false
  }
}

mainOverlay.onclick = () => {
  modalClose(mainModal, mainModalWindow)
  closeInputs()
  localStorage.setItem('isOpen', false)
  body.style.overflow = 'scroll'
}

let activeModal = localStorage.getItem('isOpen')
let activePerson = Number(localStorage.getItem('activePerson'))
let activeGallery = localStorage.getItem('galleryIsOpen')

if (activeModal == 'true') {
  modalShow(activePerson)
  modalOpen(mainModal, mainModalWindow)
  if (activeGallery == 'true') {
    i = Number(localStorage.getItem('i'))
    display()
    open(activePerson)
    mainOverlay.style.zIndex = '-1'
  }
}

for (let n = 0; n < sims.length; n++) {
  sims[n].addEventListener('click', () => {
    person.forEach((person, a) => {
      if (sims[n].className.includes(person.firstName) == true) {
        activeModal = localStorage.getItem('isOpen')
        if (activeModal === 'true') closeInputs()
        modalShow(a)
        modalOpen(mainModal, mainModalWindow)
      }
    })
  })
}

// for (let n = 0; n < sims.length; n++) {
//   sims[n].addEventListener('mouseover', () => {
//     tipSpan = sims[n].nextElementSibling
//     tipSpan.style.opacity = '1'
//     tipSpan.style.visibility = 'visible'
//   })
//   sims[n].addEventListener('mouseout', () => {
//     document.querySelectorAll('.simTip').forEach((tip) => {
//       tip.style.opacity = '0'
//       tip.style.visibility = 'hidden'
//     })
//   })
// }
