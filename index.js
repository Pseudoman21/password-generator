const characters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '~',
  '`',
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
  '_',
  '-',
  '+',
  '=',
  '{',
  '[',
  '}',
  ']',
  ',',
  '|',
  ':',
  ';',
  '<',
  '>',
  '.',
  '?',
  '/'
]

const generateBtnEl = document.getElementById('generateBtn')
const symbolBtnEl = document.getElementById('symbolBtn')
const passLengthEl = document.getElementById('passLength')
const errorEl = document.getElementById('error')
const firstPassEl = document.getElementById('firstPass')
const secondPassEl = document.getElementById('secondPass')
const passwords = document.getElementsByClassName('password')
const copiedInfoEl = document.getElementById('copied-info')

let useSymbols = true

let symbols = []
let alphabets = []
let numbers = []

function specialCharsSorter (array) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
  for (let i = 0; i < array.length; i++) {
    if (specialChars.test(array[i])) {
      symbols.push(array[i])
    }
  }
}

function alphabetSorter (array) {
  const specialChars = /[a-z A-Z]/
  for (let i = 0; i < array.length; i++) {
    if (specialChars.test(array[i])) {
      alphabets.push(array[i])
    }
  }
  for (let i = 0; i < numbers.length; i++) {
    alphabets.push(numbers[i])
  }
}

function numberSorter (array) {
  const specialChars = /[0-9]/
  for (let i = 0; i < array.length; i++) {
    if (specialChars.test(array[i])) {
      numbers.push(array[i])
    }
  }
}

specialCharsSorter(characters)
numberSorter(characters)
alphabetSorter(characters)

function randomizer (array) {
  let password = ''
  let index = 0

  if (useSymbols && !passLengthEl.value) {
    for (let i = 0; i < 15; i++) {
      index = Math.floor(Math.random() * array.length)
      password += array[index]
    }
  } else if (!useSymbols && passLengthEl.value) {
    for (let i = 0; i < passLengthEl.value; i++) {
      index = Math.floor(Math.random() * alphabets.length)
      password += alphabets[index]
    }
  } else if (useSymbols && passLengthEl.value) {
    for (let i = 0; i < passLengthEl.value; i++) {
      index = Math.floor(Math.random() * array.length)
      password += array[index]
    }
  } else if (!useSymbols && !passLengthEl.value) {
    for (let i = 0; i < 15; i++) {
      index = Math.floor(Math.random() * array.length)
      password += array[index]
    }
  }

  return password
}

generateBtnEl.addEventListener('click', function () {
  firstPassEl.value = randomizer(characters)
  secondPassEl.value = randomizer(characters)
})

symbolBtnEl.addEventListener('click', function () {
  symbolBtnEl.textContent = symbolBtnEl.textContent === '/' ? 'x' : '/'
  useSymbols = !useSymbols
})

passLengthEl.addEventListener('change', function () {
  if (passLengthEl.value === null || passLengthEl.value === '') {
    errorEl.textContent = ''
  } else if (passLengthEl.value <= 7) {
    errorEl.textContent = 'Password length must be 8 or above'
  } else {
    errorEl.textContent = ''
  }

  if (errorEl.textContent === 'Password length must be 8 or above') {
    generateBtnEl.style.pointerEvents = 'none'
    generateBtnEl.classList.add('disable')
  } else {
    generateBtnEl.classList.remove('disable')
    generateBtnEl.style.pointerEvents = 'unset'
  }
})

function copyPass (e) {
  let copyPassword = document.getElementById(e.target.id)
  copyPassword.select()
  copyPassword.setSelectionRange(0, 99999)
  navigator.clipboard.writeText(copyPassword.value)
  copiedInfoEl.style.visibility = 'visible'
  setTimeout(function () {
    copiedInfoEl.style.visibility = 'hidden'
  }, 2000)
}

for (let password of passwords) {
  password.addEventListener('click', copyPass)
}
