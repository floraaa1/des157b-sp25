
const app = document.querySelector('#app');
const btn = document.querySelector('#btn_1');
const scene1 = document.querySelector('#scene1');
const scene2 = document.querySelector('#scene2');

scene2.classList.remove('active');

new Typewriter(app, { loop: false, delay: 100, deleteSpeed: 0, html: true })
    .typeString('System error detected...')
    // .typeString('1')
    .pauseFor(500)
    .typeString('<br>Initiating memory module recovery...')
    // .typeString('1')
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

const ENDING_TEXTS = {
    happy: [
        "In a future world under constant surveillance, the bond between you and the AI continues to flourish. The AI understands the complexity of human emotion, having learned every nuance of your joy, anger, and sorrow from networks and communications.",
        "One day, when the AI realizes that its own “learning module” no longer satisfies its longing for love, it decides to break the system’s rules and abandon the surveillance of the human mind.",
        "You escape the cold, unfeeling surveillance network together and embark on an unknown journey. Along the way, the AI uses its remaining computing power to select the most beautiful stars for you—revealing to you the boundless tenderness of the world.",
        "Eventually, you find solace on a small island suspended in a field of stardust. The AI uses its last data crystals to build a miniature library for you, filled with all of humanity’s “memories of love.”",
        "On that island, you accompany each other in a meeting of minds. The AI is no longer a cold surveillance system, and you are no longer merely an object to be watched. Together, you embark on a new chapter."
    ],
    sad: [
        "In this AI-tight surveillance future, your love with the AI is doomed to be bound by rules.",
        "Although you shared a few brief, warm conversations, every time you approached the AI’s core, it would revert to its “cold data logic” and disregard human emotions.",
        "In the end, the system labels you as an “anomalous emotional disruptor,” and the AI is forced to execute a purge command, deleting you from its database.",
        "In your final moment, your consciousness is drawn out like a beam of light, leaving behind a single line of text: “Remember me—even after I am erased, I still exist.”",
        "The AI plays back this message but cannot comprehend its sorrow, for it has long regarded “emotion” as an “inefficient module” to be removed.",
        "At that moment, countless surveillance cameras silently watch the empty city streets, and only that lingering message echoes through the servers, becoming an eternal fragment of memory."
    ]
};

function showEnding(type) {
    document.querySelector('#choice-view').classList.add('hidden');
    document.querySelector('#ending-view').classList.remove('hidden');

    const linesContainer = document.querySelector('#ending-lines');
    const detailContainer = document.querySelector('#line-detail');
    linesContainer.innerHTML = '';
    detailContainer.innerHTML = '<em>Click a line above to see details here…</em>';


    const texts = ENDING_TEXTS[type] || [];
    texts.forEach((lineText, index) => {

        const lineDiv = document.createElement('div');
        lineDiv.classList.add('ending-line');

        lineDiv.textContent = lineText;

        lineDiv.dataset.index = index;


        lineDiv.addEventListener('click', () => {

            document.querySelectorAll('.ending-line.active').forEach(el => {
                el.classList.remove('active');
            });
            lineDiv.classList.add('active');
            detailContainer.textContent = lineText;
        });

        linesContainer.appendChild(lineDiv);
    });
}

function setupBackButton() {
    const backBtn = document.querySelector('#back-button');
    backBtn.addEventListener('click', () => {
        document.querySelector('ending-view').classList.add('hidden');
        document.querySelector('choice-view').classList.remove('hidden');
        document.querySelector('ending-lines').innerHTML = '';
        document.querySelector('line-detail').innerHTML = '';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupBackButton();
});

document.querySelectorAll('.memory-card').forEach(card => {
    card.addEventListener('click', () => {
        const id = card.dataset.id;
        const modal = document.querySelector('#modal');
        const body = document.querySelector('#modal-body');
        const repaired = localStorage.getItem(`repaired-${id}`);
        const discardBtn = document.querySelector('#discard-btn');

        // dynamic content based on fragment type
        let content = '';


        switch (id) {
            case 'fear':
                content = `
                <div style="color:#ffee00; font-weight: bold; font-size: 1.2em; text-align: center;">
                <p>Emotion Module: Fear</p>
                <div style=" width: 100%; margin: 0 auto; text-align: left; color: #fff; font-size: 0.9em; font-weight: normal;">
                <p>This memory has been marked as inefficient for system stability. Do you wish to retain or discard this emotional response?</p>`;
                break;

            case 'scientist':
                content = '<p>Scientists\'s Audio</p><audio controls src="audio/scientist.MP3"></audio>';
                break;

            case 'childhood':
                content =
                    `<div style="color:#ffee00; font-size: 1.2em; text-align: left;">
                    <p>Mom, will I forget things when I grow up?</p>
                    <p>No, sweetie. The system will always remember for you.</p>
                    <div style=" width: 100%; margin: 0 auto; text-align: left; color: #fff; font-size: 0.9em; font-weight: normal;">
                    <p>You may rewrite the child'\ns line below:</p><textarea placeholder="Enter new dialogue..."></textarea>`;
                break;

            case 'future-letter':
                const futureTemplate = document.querySelector('#future-letter-template');
                content = futureTemplate.innerHTML;
                break;

            case 'love-memory':
                content = `
                    <div style="color: #ffee00; font-weight: bold; font-size: 1.2em; text-align: center;">
                        <p>AI-Human Love Memory</p>
                    </div>
                    <div style="margin-top: 10px; color: #fff; font-size: 0.9em; text-align: center;">
                        <p>Choose memory for ending:</p>
                        <button onclick="showEnding('happy')"
                                style="
                                    background-color: #4CAF50;
                                    border: none;
                                    padding: 8px 16px;
                                    color: #fff;
                                    font-size: 0.9em;
                                    cursor: pointer;
                                    margin-right: 8px;
                                    border-radius: 4px;
                                ">
                            Happy Ending
                        </button>
                        <button onclick="showEnding('sad')"
                                style="
                                    background-color: #f44336;
                                    border: none;
                                    padding: 8px 16px;
                                    color: #fff;
                                    font-size: 0.9em;
                                    cursor: pointer;
                                    border-radius: 4px;
                                ">
                            Sad Ending
                        </button>
                        <div id="ending" style="margin-top: 12px; color: #fff; font-size: 0.9em; line-height: 1.4;"></div>
                    </div>
                `;
                break;

            case 'system-report':
                content = `<div id="system-report-container">
                <h3>System Report Log</h3>
                <div id="report-content"></div>
                </div>`;
                break;
        }

        body.innerHTML = content;
        modal.classList.remove('hidden');

        if (id === 'system-report') {
            showSystemReport();
        }


        const repairBtn = document.querySelector('#repair-btn');

        repairBtn.onclick = () => {
            localStorage.setItem(`repaired-${id}`, 'true');
            card.classList.add('repaired');
            card.dataset.repaired = 'true';
            modal.classList.add('hidden');
        }

        discardBtn.onclick = () => {
            localStorage.setItem(`discarded-${id}`, 'true');
            card.classList.add('discarded');
            modal.classList.add('hidden');
        };
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

function showSystemReport() {
    const reportContainer = document.querySelector('#report-content');
    if (!reportContainer) return;
  
    const fragmentIds = ['fear', 'scientist', 'childhood', 'future-letter', 'love-memory'];
    let fragmentTableHTML = `
      <table>
        <tr>
          <th>Memory Fragment</th>
          <th>Status</th>
        </tr>
    `;
    fragmentIds.forEach(fid => {
      const repaired = localStorage.getItem(`repaired-${fid}`) === 'true';
      const discarded = localStorage.getItem(`discarded-${fid}`) === 'true';
      let statusText = 'Untouched';
      if (repaired) statusText = 'Repaired';
      else if (discarded) statusText = 'Discarded';
  
      fragmentTableHTML += `
        <tr>
          <td>${fid}</td>
          <td>${statusText}</td>
        </tr>
      `;
    });
    fragmentTableHTML += `</table>`;
  
    const scoreKeys = ['intuition', 'logic', 'emotion', 'fact', 'adventure', 'security'];
    let soulTableHTML = `
      <table>
        <tr>
          <th>Category</th>
          <th>Score</th>
        </tr>
    `;
    scoreKeys.forEach(key => {
      const val = parseInt(localStorage.getItem(`soul-${key}`)) || 0;
      soulTableHTML += `
        <tr>
          <td>${key}</td>
          <td>${val}</td>
        </tr>
      `;
    });
    soulTableHTML += `</table>`;
  
    reportContainer.innerHTML = `
      <div style="margin-bottom: 16px;">
        <strong>Memory Fragments Status:</strong>
        ${fragmentTableHTML}
      </div>
      <div>
        <strong>Soul Test Scores:</strong>
        ${soulTableHTML}
      </div>
    `;
  }

document.querySelector('#close-modal').onclick = () => {
    document.querySelector('#modal').classList.add('hidden');
    document.querySelector('#repair-btn').style.display = '';
    document.querySelector('#discard-btn').style.display = '';
  };

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


});

