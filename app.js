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

for (let i = 0; i < sims.length; i++) {
  person.forEach((person) => {
    if (sims[i].className.includes(person.firstName) == true)
      sims[i].style.content = `url(./avatar/${person.firstName}.png)`
  })
  if (sims[i].style.content == '')
    sims[i].style.content = 'url(./icons/no-img.png'
  
  // person.forEach((person) => {
  //   if (sims[i].className.includes(person.firstName) == true) {
  //     tipDiv = document.createElement('div')
  //     tipSpan = document.createElement('span')
  //     tipSpan.setAttribute('class', 'simTip')
  //     tipSpan.textContent = person.firstName + ' ' + person.lastName
  //     tipDiv.setAttribute('class', 'simTipDiv')
  //     sims[i].parentNode.insertBefore(tipDiv, sims[i])
  //     tipDiv.appendChild(sims[i], tipSpan)
  //     tipDiv.appendChild(tipSpan)
  //   }
  // })
}

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
    document.querySelector('.counter').innerHTML = i + 1 + '/' + screens.length
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

function clearHTML(a, b, c, d, e) {
  let array = [a, b, c, d, e]
  array.forEach((item) => (item.innerHTML = ''))
}

function modalShow(a) {
  localStorage.setItem('activePerson', a)
  avatar.style.content = `url(./avatar/${person[a].firstName}.png`
  clearHTML(descriptionsDiv, slider, traits, biography, screenPreview)
  biography.scrollTop = 0
  traits.scrollTo(0, 0)
  mainName.innerHTML = person[a].firstName + ' ' + person[a].lastName
  deathDiv = document.querySelector('.death')
  if (person[a].death === undefined) {
    deathDiv.style.visibility = 'hidden'
  } else {
    deathDiv.style.visibility = 'visible'
    death.innerHTML = person[a].death
  }

  if (person[a].traits === undefined) {
    traits.innerHTML = '<li>Нет черт характера</li>'
  } else
    person[a].traits.forEach((item) => (traits.innerHTML += `<li>${item}</li>`))

  if (person[a].bio !== undefined) {
    bioSplit = person[a].bio.split('\n')
    if (bioSplit.constructor === Array) {
      bioSplit.forEach((item) => (biography.innerHTML += `<p>${item}</p>`))
    } else biography.innerHTML = `<p>${person[a].bio}</p>`
  } else biography.innerHTML = '<p>У персонажа нет биографии</p>'

  if (person[a].screensNumber !== undefined) {
    person[a].descriptions.forEach((item) => {
      descriptionsDiv.innerHTML += `<span class="description">${item}</span>`
    })
    for (i = 0; i < person[a].screensNumber; i++) {
      if (person[a].descriptions[i] === undefined) {
        descriptionsDiv.innerHTML += '<span class="description"> </span>'
        person[a].descriptions[i] = ''
      }
      index = i + 1
      slider.innerHTML += `<img class="screens" src="./screen${
        a + 1
      }/${index}.png">`
      screenPreview.innerHTML += `<img class="screen-preview select-cursor" data-index="${index}" src="./screen${
        a + 1
      }/${index}.png">`
    }
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
  } else screenPreview.innerHTML = '<p>У персонажа нет галереи</p>'
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
  body.style.overflow = 'scroll'
}

activeModal = localStorage.getItem('isOpen')
activePerson = Number(localStorage.getItem('activePerson'))
activeGallery = localStorage.getItem('galleryIsOpen')

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

for (n = 0; n < sims.length; n++) {
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
