const cardArray = [
  {
    name: 'apple',
    img: 'img/apple.png'
  },
  {
    name: 'balloon',
    img: 'img/balloon.png'
  },
  {
    name: 'heart',
    img: 'img/heart.png'
  },
  {
    name: 'spanchbob',
    img: 'img/spanchbob.png'
  },
  {
    name: 'spiderman',
    img: 'img/spiderman.png'
  },
  {
    name: 'star',
    img: 'img/star.png'
  },
  {
    name: 'butterfly',
    img: 'img/butterfly.png'
  },
  {
    name: 'jerry',
    img: 'img/jerry.png'
  },
  {
    name: 'mario',
    img: 'img/mario.png'
  },
  {
    name: 'mickey',
    img: 'img/mickey.png'
  },
  {
    name: 'minion',
    img: 'img/minion.png'
  },
  {
    name: 'pingv',
    img: 'img/pingv.png'
  },
  {
    name: 'sonic',
    img: 'img/sonic.png'
  },
  {
    name: 'teddy',
    img: 'img/teddy.png'
  },
  {
    name: 'tiger',
    img: 'img/tiger.png'
  },
  {
    name: 'tom',
    img: 'img/tom.png'
  }
]

cardArray.sort(() => 0.5 - Math.random())

let cardArrayNew = []
let cardsChosen = []
let cardsChosenIds = []
const cardsWon = []
const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
const congratulations = document.querySelector('#congrats')
const popupMatch = document.querySelector('#popup')
const gridField = document.querySelector('#grid')
const btnContainer = document.querySelector('.btnContainer')
const btnEasy = document.querySelector('#easy')
const btnMedium = document.querySelector('#medium')
const btnHard = document.querySelector('#hard')

btnEasy.addEventListener('click', startEasyGame)
btnMedium.addEventListener('click', startMediumGame)
btnHard.addEventListener('click', startHardGame)

function chooseLevel(n) {
  for (let i = 0; i < n; i++) {
    cardArrayNew.push(cardArray[i]);
  }

  for (let i = 0; i < 1; i++) {
    cardArrayNew.forEach(el => {
      cardArrayNew.push(el);
    })
  }
  cardArrayNew.sort(() => 0.5 - Math.random())
  //console.log(cardArrayNew)
  startGame()
}

function startEasyGame() {
  chooseLevel(6)
  gridField.setAttribute('class', 'gridEasyLvl')
}

function startMediumGame() {
  chooseLevel(10)
  gridField.setAttribute('class', 'gridMediumLvl')
}

function startHardGame() {
  chooseLevel(15)
  gridField.setAttribute('class', 'gridHardLvl')
}

function startGame() {
  const txtScore = document.querySelector('#txtScore')
  txtScore.style.visibility = "visible"
  createBoard()
}

function createBoard() {
  btnEasy.style.visibility = "hidden"
  btnMedium.style.visibility = "hidden"
  btnHard.style.visibility = "hidden"
  btnContainer.style.top = '1000px'

  for (let i = 0; i < cardArrayNew.length; i++) {
    const card = document.createElement('img')
    card.setAttribute('src', 'img/blank.png')
    card.setAttribute('data-id', i)
    card.setAttribute('width', '150px')
    card.setAttribute('heigth', '150px')
    card.addEventListener('click', flipCard)
    gridDisplay.appendChild(card)
  }
}

function checkMatch() {
  const cards = document.querySelectorAll('img')
  const optionOneId = cardsChosenIds[0]
  const optionTwoId = cardsChosenIds[1]

  if (optionOneId == optionTwoId) {
    console.log('press the same card')
  }

  if (cardsChosen[0] == cardsChosen[1] && optionOneId != optionTwoId) {
    cards[optionOneId].setAttribute('src', 'img/white.png')
    cards[optionTwoId].setAttribute('src', 'img/white.png')
    cards[optionOneId].removeEventListener('click', flipCard)
    cards[optionTwoId].removeEventListener('click', flipCard)
    cardsWon.push(cardsChosen)
    showPopup('url(img/cool.png)')
  } else {
    cards[optionOneId].setAttribute('src', 'img/blank.png')
    cards[optionTwoId].setAttribute('src', 'img/blank.png')
    showPopup('url(img/tryAgain.png)')

    //console.log("нет совпадений", cards[optionOneId], cards[optionTwoId])
    cards[optionOneId].style.animationName = 'animWrongCard'
    cards[optionTwoId].style.animationName = 'animWrongCard'
    cards[optionOneId].style.animationDuration = '0.2s'
    cards[optionTwoId].style.animationDuration = '0.2s'

    setTimeout(function () {
      cards[optionOneId].style.animationName = null
      cards[optionTwoId].removeAttribute("style")
      console.log('setTimeout is working', cards[optionOneId], cards[optionTwoId])
    }, 200)
  }

  resultDisplay.textContent = cardsWon.length
  cardsChosen = []
  cardsChosenIds = []

  if (cardsWon.length == cardArrayNew.length / 2) {
    resultDisplay.textContent = 'Congratulations, You found them all!'
    popupMatch.style.visibility = "hidden"
    congratulations.style.visibility = "visible"
    setTimeout(function () { location.reload() }, 5000)
  }
}

function flipCard() {
  const cardId = this.getAttribute('data-id')

  if (cardsChosen.length < 2) {
    cardsChosen.push(cardArrayNew[cardId].name)
    cardsChosenIds.push(cardId)
    //console.log(cardsChosen, cardId)
    this.setAttribute('src', cardArrayNew[cardId].img)

    if (cardsChosen.length === 2) {
      setTimeout(checkMatch, 500)
    }
  }
}

function showPopup(urlImg) {
  popupMatch.style.visibility = "visible"
  popupMatch.style.backgroundImage = urlImg
  setTimeout(function () { popupMatch.style.visibility = "hidden" }, 1000)
}

