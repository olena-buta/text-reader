const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const textBox = document.getElementById('text-box');
const closeBtn = document.getElementById('close');

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm thirsty"
  },
  {
    image: './img/food.jpg',
    text: "I'm hungry"
  },
  {
    image: './img/tired.jpg',
    text: "I'm tired"
  },
  {
    image: './img/hurt.jpg',
    text: "I'm hurt"
  },
  {
    image: './img/happy.jpg',
    text: "I'm happy"
  },
  {
    image: './img/angry.jpg',
    text: "I'm angry"
  },
  {
    image: './img/sad.jpg',
    text: "I'm sad"
  },
  {
    image: './img/scared.jpg',
    text: "I'm scared"
  },
  {
    image: './img/outside.jpg',
    text: "I want to go outside"
  },
  {
    image: './img/home.jpg',
    text: "I want to go home"
  },
  {
    image: './img/school.jpg',
    text: "I want to go to school"
  },
  {
    image: './img/grandma.jpg',
    text: "I want to go to grandmas"
  },
];

let voices = [];

const message = new SpeechSynthesisUtterance();

function showCards(data) {
  data.forEach(item => {
    const box = document.createElement('div');
    const { image, text } = item;

    box.classList.add('box');
    box.innerHTML = `
      <img src="${image}" alt="${text}" />
      <p class="info">${text}</p>
    `;

    box.addEventListener('click', () => {
      setTextMessage(text);
      speakText();

      box.classList.add('active');
      setTimeout(() => box.classList.remove('active'), 1500);
    });

    main.appendChild(box);
  });
}

showCards(data);

function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.innerText = `${voice.name} (${voice.lang})`;

    voicesSelect.appendChild(option);
  });
}

function setTextMessage(text) {
  message.text = text;
}

function speakText() {
  speechSynthesis.speak(message);
}

function showModalBox() {
  textBox.classList.add('show');

  document.addEventListener('keydown', e => {
    if (e.keyCode === 27) {
      hideModalBox();
      textarea.value = '';
    }
  });
}

function hideModalBox() {
  textBox.classList.remove('show');
  textarea.value = '';
}

function setVoice(e) {
  message.voice = voices.find(voice => voice.name === (e.target.value));
}

toggleBtn.addEventListener('click', showModalBox);
closeBtn.addEventListener('click', hideModalBox);

speechSynthesis.addEventListener('voiceschanged', getVoices);

voicesSelect.addEventListener('change', setVoice);

readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});
getVoices();