const app = document.querySelector('#app');
const btn = document.querySelector('#btn_1');
const scene1 = document.querySelector('#scene1');
const scene2 = document.querySelector('#scene2');

scene2.classList.remove('active');

new Typewriter(app, { loop: false, delay: 100, deleteSpeed: 0, html: true })
    .typeString('System error detected...')
    .pauseFor(500)
    .typeString('<br>Initiating memory module recovery...')
    .pauseFor(500)
    .typeString('<br>Connecting to <span class="soul-core">SOUL DEBUGGER...</span>')
    .pauseFor(500)
    .callFunction(() => {
        // reveal the button
        btn.style.visibility = 'visible';
        btn.style.opacity = '1';
    })
    .start();

function goToNext() {
    scene1.style.display = 'none';
    scene2.classList.add('active');
}

document.querySelectorAll('.memory-card').forEach(card => {
    card.addEventListener('click', () => {
        const id = card.dataset.id;
        const modal = document.getElementById('modal');
        const body = document.getElementById('modal-body');
        const repaired = localStorage.getItem(`repaired-${id}`);

        // dynamic content based on fragment type
        let content = '';
        switch (id) {
            case 'fear': content = '<p>Emotion Module: Fear</p>'; break;
            case 'scientist': content = '<p>Defector\'s Audio</p><audio controls src="audio/defector.mp3"></audio>'; break;
            case 'childhood': content = '<p>Modify childhood dialogue:</p><textarea placeholder="Enter new dialogue..."></textarea>'; break;
            case 'future-letter': content = '<p>Letter preview:</p><embed src="letters/future_letter.pdf" type="application/pdf" width="100%" height="200px" />'; break;
            case 'love-memory': content = '<p>Choose memory ending:</p><button onclick="showEnding(\'happy\')">Happy</button> <button onclick="showEnding(\'sad\')">Sad</button><div id="ending"></div>'; break;
        }
        body.innerHTML = content;
        modal.classList.remove('hidden');

        const repairBtn = document.querySelector('#repair-btn');
        repairBtn.onclick = () => {
            localStorage.setItem(`repaired-${id}`, 'true');
            card.classList.add('repaired');
            card.dataset.repaired = 'true';
            modal.classList.add('hidden');
        }
    });
});

document.querySelector('#close-modal').onclick = () => {
    document.querySelector('#modal').classList.add('hidden');
}

window.onload = () => {
    document.querySelectorAll('.memory-card').forEach(card => {
        const id = card.dataset.id;
        if (localStorage.getItem(`repaired-${id}`) === 'true') {
            card.classList.add('repaired');
            card.dataset.repaired = 'true';
        }
    });
}


window.addEventListener('load', () => {
    const scene2 = document.querySelector('#scene2');
    const scene3 = document.querySelector('#scene3');
    const nextBtn = document.querySelector('#next');

    nextBtn.addEventListener('click', () => {
        scene2.style.display = 'none';
        scene3.style.display = 'block';
        showQuestion();
    });
});

const questions = [
    { text: "Do you trust intuition or logic more?", options: ["Intuition", "Logic"], category: ["intuition", "logic"] },
    { text: "When making decisions, do you value emotion or facts more?", options: ["Emotion", "Facts"], category: ["emotion", "fact"] },
    { text: "Do you prefer adventure or security?", options: ["Adventure", "Security"], category: ["adventure", "security"] }
];

let current = 0;
const scores = { intuition: 0, logic: 0, emotion: 0, fact: 0, adventure: 0, security: 0 };

// Initialize or load stored scores
for (const key in scores) {
    const stored = localStorage.getItem(`soul-${key}`);
    if (stored) scores[key] = parseInt(stored, 10);
}

// Chart.js configuration
const ctx = document.querySelector('#soul-chart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: Object.keys(scores),
        datasets: [{ label: 'Soul Profile', data: Object.values(scores), fill: true }]
    },
    options: { scales: { r: { beginAtZero: true, suggestedMax: 5 } } }
});

const questionText = document.querySelector('#question-text');
const opt1 = document.querySelector('#option1');
const opt2 = document.querySelector('#option2');

function showQuestion() {
    const q = questions[current];
    questionText.textContent = q.text;
    opt1.textContent = q.options[0];
    opt2.textContent = q.options[1];
}

function updateChart() {
    chart.data.datasets[0].data = Object.values(scores);
    chart.update();
}

function handleAnswer(idx) {
    const cat = questions[current].category[idx];
    scores[cat]++;
    localStorage.setItem(`soul-${cat}`, scores[cat]);
    updateChart();
    current++;
    if (current < questions.length) {
        showQuestion();
    } else {
        finishTest();
    }
}

function finishTest() {
    document.querySelector('#question-container').innerHTML = '<p>Your mission complete. Thank you for participating...</p>';
}

opt1.addEventListener('click', () => handleAnswer(0));
opt2.addEventListener('click', () => handleAnswer(1));

window.onload = showQuestion;

document.querySelectorAll('#option1, #option2').forEach(btn => {
    btn.addEventListener('click', () => {
        setTimeout(() => {
            if (typeof updateChart === 'function') {
                updateChart();
            }
        }, 0);
    });
});

(function () {
    const _origFinish = window.finishTest;

    window.finishTest = function () {
        _origFinish();
        document.querySelector('#soul-chart').style.display = 'none';

        if (!document.querySelector('#ending-scene')) {
            const scene = document.createElement('div');
            scene.id = 'ending-scene';
            scene.innerHTML = `
          <p id="ending-text"></p>
          <button id="restart-btn">Restart Journey</button>
        `;
            document.body.appendChild(scene);

            // restart
            scene.querySelector('#restart-btn')
                .addEventListener('click', () => {
                    Object.keys(localStorage)
                        .forEach(k => {
                            if (k.startsWith('soul-') || k.startsWith('repaired-'))
                                localStorage.removeItem(k);
                        });
                    location.reload();
                });
        }

        // calculate ending based on repaired fragments and scores
        const ids = ['fear', 'scientist', 'childhood', 'future-letter', 'love-memory'];
        let repairedCount = ids.reduce((sum, id) =>
            sum + (localStorage.getItem(`repaired-${id}`) === 'true' ? 1 : 0)
            , 0);

        // calculate scores from localStorage
        const scores = Object.fromEntries(
            ['intuition', 'logic', 'emotion', 'fact', 'adventure', 'security']
                .map(key => [key, parseInt(localStorage.getItem(`soul-${key}`)) || 0])
        );

        let ending;
        if (repairedCount >= 4 && scores.intuition > scores.logic) {
            ending = 'Fusion: You merge your consciousness with the AI.';
        } else if (repairedCount < 2) {
            ending = 'Consumed: The AI deems you a threat and resets your persona.';
        } else {
            ending = 'Escape: You break the rules and return to the real world.';
        }

        const txt = document.querySelector('#ending-text');
        txt.textContent = ending;
        document.querySelector('#ending-scene').style.display = 'block';
    };
})();

// Listen for clicks on the Restart Journey button
document.querySelector('#restart-btn').addEventListener('click', () => {
    // 1. Clear all saved soul & repaired data
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('soul-') || key.startsWith('repaired-')) {
        localStorage.removeItem(key);
      }
    });
  
    // 2. Reset memory cards UI: remove the 'repaired' class & flag
    document.querySelectorAll('.memory-card').forEach(card => {
      card.classList.remove('repaired');
      card.dataset.repaired = 'false';
    });
  
    // 3. Hide Scene 2 and Scene 3
    scene2.classList.remove('active');
    scene3.classList.remove('active');
  
    // 4. Hide the ending scene
    const ending = document.querySelector('#ending-scene');
    ending.classList.remove('active');
    ending.style.display = 'none';
  
    // 5. Show Scene 1 again
    scene1.style.display = 'flex';
  
    // 6. Reset question UI & chart display
    document.querySelector('#question-container').style.display = 'none';
    document.querySelector('#soul-chart').style.display = 'none';
  
    // 7. Reset internal state: question index & all scores
    current = 0;
    Object.keys(scores).forEach(k => scores[k] = 0);
    updateChart();  // redraw chart at zero
  
    // 8. Ensure any modal is closed and its content cleared
    const modal = document.querySelector('#modal');
    modal.classList.add('hidden');
    document.querySelector('#modal-body').innerHTML = '<p id="modal-text">You have selected a memory fragment. Click "Repair" to begin the process.</p>';
  
    // 9. (Optional) Restart your Typewriter animation
    // new Typewriter(app, { /* … */ }).start();
  });
  
  