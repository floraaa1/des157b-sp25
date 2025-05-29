const app = document.getElementById('app');

const typewriter = new Typewriter(app, {
    loop: false,
    delay: 100,
    deleteSpeed: 0
});

typewriter.typeString('System error detected...')
    .pauseFor(500)
    // .typeString('<br>Initiating memory module recovery...')
    .typeString('<br>test')
    .pauseFor(500)
    // .typeString('<br>Connecting to SOUL CORE...')
    .typeString('<br>test')
    .pauseFor(500)
    .callFunction(() => {
        btn_1.style.display = 'inline-block';
        btn_1.style.visibility = 'visible';
        btn_1.style.opacity = '1';
    }, 500)
    .start();

const terminal = document.querySelector('#terminal');
const btn_1 = document.querySelector('#btn_1');
const scene1 = document.querySelector('#scene1');
const scene2 = document.querySelector('#scene2');
scene2.style.display = 'none'; 
let index = 0;

const textLines = [
    "Initializing cognitive repair protocol...",
    "Decrypting memory clusters...",
    "Identifying identity-critical fragments...",
    "6 unstable memory shards found.",
    "Emotional, experiential, and ideological data corruption detected.",
    "You are now entering the Soul Recovery Environment.",
    "Each memory you encounter is a choice.",
    "Repair. Forget. Reclaim who you are."
];

const transitionText = document.getElementById('transition-text');
const continueBtn = document.getElementById('continue-btn');

function showTransition() {
    let i = 0;
    function typeNextLine() {
        if (i < textLines.length) {
            const line = document.createElement('div');
            line.textContent = textLines[i];
            transitionText.appendChild(line);
            i++;
            setTimeout(typeNextLine, 1000);
        } else {
            continueBtn.style.display = 'block';
        }
    }
    typeNextLine();
}

function goToNext() {
    scene1.style.display = 'none';
    transitionScreen.style.display = 'flex';
    showTransition(); // your type-out code
  }
  
  // once “Continue” is clicked:
  continueBtn.addEventListener('click', () => {
    transitionScreen.style.display = 'none';
    scene2.style.display = 'flex';
  });




