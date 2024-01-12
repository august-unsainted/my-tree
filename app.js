const slider = document.querySelector('.slider')
const screens = document.getElementsByClassName('screens')
const descriptions = document.getElementsByClassName('description')
const next = document.querySelector('.next')
const prev = document.querySelector('.prev')
const btns = document.querySelectorAll('.screen-preview')
const modalGallery = document.getElementById('modal-gallery1')
const modalWindow = document.querySelector('.gallery-window')
const overlay = document.querySelector('.gallery-overlay')
const counter = document.querySelector('.counter')
const mainModal = document.getElementById('modal1')
const mainModalWindow = document.querySelector('.modal-window')
const sim1 = document.querySelector('.саша')
const mainOverlay = document.querySelector('.overlay')
let i = 0

function modalOpen(mainModal,mainModalWindow) {
  mainModal.classList.add('modal-open')
  mainModalWindow.classList.add('modal-open')
}

function modalClose(mainModal,mainModalWindow) {
  mainModal.classList.remove('modal-open')
  mainModalWindow.classList.remove('modal-open')
}

mainOverlay.onclick = () => {modalClose(mainModal,mainModalWindow)}
sim1.onclick = () => {modalOpen(mainModal,mainModalWindow)}

function open() {
  counter.innerHTML = i + 1 + '/' + screens.length
  if (i == 0) {
    prev.style.visibility = 'hidden'
  }
  if (i == screens.length - 1) {
    next.style.visibility = 'hidden'
  }
  modalOpen(modalGallery,modalWindow)
}

overlay.onclick = function () {
  for (i = 0; i < descriptions.length; i++) {
    descriptions[i].style.opacity = '0'
    descriptions[i].style.visibility = 'hidden'
    screens[i].style.zIndex = '0'
    screens[i].style.transform = 'translateX(0)'
    screens[i].style.opacity = '0'
  }
  prev.style.visibility = 'visible'
  next.style.visibility = 'visible'
  modalClose(modalGallery,modalWindow)
}

function display() {
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
}

btns.forEach((btn) => {
  btn.addEventListener('click', (btn) => {
    i = btn.currentTarget.getAttribute('data-index') - 1
    display()
    open()
  })
})


next.onclick = function () {
  prev.style.visibility = 'visible'
  if (i < screens.length - 1) {
    i += 1
  }
  if (i == screens.length - 1) {
    next.style.visibility = 'hidden'
  }
  display()
}

prev.onclick = function () {
  next.style.visibility = 'visible'
  i -= 1
  if (i == 0) {
    prev.style.visibility = 'hidden'
  }
  display()
}


