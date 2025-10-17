let selectedCharacterImg = localStorage.getItem('selectedCharacter') || '../imgs/sapo.png';

const trampolimSound = new Audio('../sfx/trampolineSound.mp3');

const fredFallSound = new Audio('../sfx/saltoDoFred.mp3');

const musicToggleBtn = document.getElementById('musicToggleBtn');

let shakeDuration = 0;
let shakeMagnitude = 8;

// Evitar zoom com Ctrl + roda do mouse ou Ctrl + +/-
window.addEventListener('keydown', function (e) {
  if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=')) {
    e.preventDefault();
  }
}, { passive: false });

window.addEventListener('wheel', function (e) {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault();
  }
}, { passive: false });

// --- VARIÁVEIS DE MÚSICA E MUTE ---
const bgMusic = document.getElementById('bgMusic');
let bgMusicPlaying = false;
let isMuted = true;
const targetVolume = 0.05;

const config = {
  gravity: 0.35,
  jumpVelocity: -18.4,
  trampolineMultiplier: 2.5,
  platformGapY: 100,
  platformWidth: 60,
  platformHeight: 17,
  playerImage: '../imgs/sapo.png',
  platformImage: '../imgs/platform.png',
  trampolineImage: '../imgs/trampoline.png'
};

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
resizeCanvas();

let gameRunning = false;
let paused = false;
let nickname = '';
let score = 0;
let cameraOffset = 0;
let platforms = [];
let keys = {};
let scoreSaved = false;
let lastFrameTime = performance.now();

let player = {
  x: 0,
  y: 0,
  vy: 0,
  width: 35,
  height: 35,
  speed: 400,
  img: new Image()
};

const platformImg = new Image();
platformImg.src = config.platformImage;
const trampolineImg = new Image();
trampolineImg.src = config.trampolineImage;

let imagesLoaded = 0;
function checkImagesLoaded() {
  imagesLoaded++;
  if (imagesLoaded === 2) {
    document.getElementById('playBtn').disabled = false;
  }
}
player.img.onload = checkImagesLoaded;
platformImg.onload = checkImagesLoaded;
player.img.src = config.playerImage;
document.getElementById('playBtn').disabled = true;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);

window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

document.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => {
  const sound = document.getElementById('buttonClickSound');
  sound.currentTime = 0;
  sound.play();
}));

function startGame() {

  player.img.src = selectedCharacterImg;

  const sound = document.getElementById('buttonClickSound');
  sound.play();
  nickname = document.getElementById('nickname').value.trim();
  if (!nickname) return alert('Please enter a nickname.');
  const playSound = document.getElementById('playSound');
  playSound.play();

  // Iniciar música de fundo
  if (!bgMusicPlaying && !isMuted) {
    fadeAudio(bgMusic, 0, targetVolume, 2000);
    bgMusicPlaying = true;
  }

  document.getElementById('startPanel').style.display = 'none';
  canvas.style.display = 'block';
  document.getElementById('gameOverPanel').style.display = 'none';
  resetGame();
  gameRunning = true;
  paused = false;
  lastFrameTime = performance.now();
  requestAnimationFrame(gameLoop);
}

function resetGame() {
  score = 0;
  cameraOffset = 0;
  platforms = [];
  scoreSaved = false;

  const groundY = canvas.height - config.platformHeight;
  platforms.push({ x: -100, y: groundY + 2, width: canvas.width * 1.1, height: config.platformHeight, trampoline: false });

  let lastY = groundY - config.platformGapY;
  for (let i = 1; i < 11; i++) {
    const x = Math.random() * (canvas.width - config.platformWidth);
    const hasTrampoline = Math.random() < 0.01;
    platforms.push({ x, y: lastY, width: config.platformWidth, height: config.platformHeight, trampoline: hasTrampoline });
    lastY -= config.platformGapY;
  }

  player.x = canvas.width / 2 - player.width / 2;
  player.y = platforms[0].y - player.height;
  player.vy = 0;
}

function applyScreenShake() {
  if (shakeDuration > 0) {
    const dx = (Math.random() - 0.5) * shakeMagnitude;
    const dy = (Math.random() - 0.5) * shakeMagnitude;
    ctx.translate(dx, dy);
    shakeDuration--;
  }
}


function gameLoop(now) {
  if (!gameRunning) return;
  const dt = (now - lastFrameTime) / 1000;
  lastFrameTime = now;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  applyScreenShake();

  if (!paused) {
    if (keys['a'] || keys['arrowleft']) player.x = Math.max(0, player.x - player.speed * dt);
    if (keys['d'] || keys['arrowright']) player.x = Math.min(canvas.width - player.width, player.x + player.speed * dt);

    player.vy += config.gravity * 60 * dt;
    player.y += player.vy * dt * 60;

    platforms.forEach(p => {
      if (player.vy > 0 &&
        player.x + player.width > p.x && player.x < p.x + p.width &&
        player.y + player.height > p.y && player.y + player.height < p.y + p.height + player.vy) {

        if (selectedCharacterImg.includes('fred')) {
          fredFallSound.currentTime = 0;
          fredFallSound.play();
          shakeDuration = 10; // ativa o screenshake durante 10 frames
        }

        if (p.trampoline) {
          trampolimSound.currentTime = 0; // volta o som ao início
          trampolimSound.play();          // toca o som do trampolim
          player.vy = config.jumpVelocity * config.trampolineMultiplier;
        } else {
          player.vy = config.jumpVelocity;
        }
      }
    });

    const camY = canvas.height / 3.5;
    if (player.y < camY) {
      const d = camY - player.y;
      player.y = camY;
      cameraOffset += d;
      platforms.forEach(p => p.y += d);
    }

    score = Math.floor(cameraOffset);

    if (player.y > canvas.height) {
      gameRunning = false;
      document.getElementById('gameOverPanel').style.display = 'flex';
      document.getElementById('finalScore').textContent = score;
      if (!scoreSaved) saveScore();
      return;
    }
  }

  const minGap = 40;
  platforms.forEach((p, i) => {
    if (i === 0) return;
    if (p.y > canvas.height) {
      let ok = false, tries = 0;
      while (!ok && tries < 20) {
        const newY = Math.random() * -100;
        ok = platforms.every(o => Math.abs(o.y - newY) >= minGap || o === p);
        if (ok) {
          p.y = newY;
          p.x = Math.random() * (canvas.width - config.platformWidth);
          p.trampoline = Math.random() < 0.01;
        }
        tries++;
      }
    }
  });

  ctx.drawImage(player.img, player.x, player.y, player.width, player.height);
  platforms.forEach(p => {
    ctx.drawImage(platformImg, p.x, p.y, p.width, p.height);
    if (p.trampoline) {
      const tw = p.width * 0.8, th = 20;
      ctx.drawImage(trampolineImg, p.x + (p.width - tw) / 2, p.y - th + 5, tw, th);
    }
  });

  drawScore();

  ctx.restore();

  requestAnimationFrame(gameLoop);
}

function drawScore() {
  ctx.font = '24px Arial';
  ctx.textBaseline = 'top';
  ctx.shadowColor = 'black';
  ctx.shadowBlur = 4;
  ctx.fillStyle = 'white';
  ctx.fillText(`Altura: ${score}`, 20, 10);
}

function showLeaderboard() {
  document.getElementById('leaderboardPanel').style.display = 'flex';
  const list = document.getElementById('leaderboard');
  list.innerHTML = '';

  fetch('http://localhost:3000/api/scores/bygame/Sky Jump')
    .then(res => res.json())
    .then(scores => {
      scores.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.nickname}: ${entry.score}`;
        list.appendChild(li);
      });
    })
    .catch(err => console.error('Erro ao buscar leaderboard:', err));
}

function hideLeaderboard() {
  document.getElementById('leaderboardPanel').style.display = 'none';
  document.getElementById('nickname').focus();
}

function saveScore() {
  if (!nickname) return;

  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60000;
  const localISOTime = new Date(now.getTime() - offsetMs).toISOString().slice(0, 19).replace('T', ' ');
  const datascore = localISOTime;

  fetch('http://localhost:3000/api/scores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nickname: nickname,
      score: score,
      game: 'Sky Jump',
      datascore: datascore
    })
  })
    .then(res => {
      if (!res.ok) throw new Error('Erro ao salvar score');
      return res.json();
    })
    .then(data => console.log('Score salvo com ID:', data.id))
    .catch(err => console.error('Erro ao salvar score:', err));
}

function exitToMenu() {
  console.log('exitToMenu called');
  playButtonClickSound();
  gameRunning = false;
  paused = true;
  document.getElementById('gameOverPanel').style.display = 'none';
  document.getElementById('startPanel').style.display = 'flex';
  canvas.style.display = 'none';
}

function resumeGame() {
  playButtonClickSound();
  paused = false;
  lastFrameTime = performance.now();
  requestAnimationFrame(gameLoop);
  document.getElementById('confirmExit').style.display = 'none';
}

function fadeAudio(audio, fromVolume, toVolume, duration) {
  if (audio.fadeInterval) clearInterval(audio.fadeInterval);
  const stepTime = 50;
  const steps = duration / stepTime;
  const volumeStep = (toVolume - fromVolume) / steps;
  let currentStep = 0;
  audio.volume = fromVolume;
  if (toVolume > 0 && audio.paused) audio.play();

  audio.fadeInterval = setInterval(() => {
    currentStep++;
    let newVolume = fromVolume + volumeStep * currentStep;
    newVolume = Math.min(Math.max(newVolume, 0), 1);
    audio.volume = newVolume;

    if (currentStep >= steps) {
      clearInterval(audio.fadeInterval);
      if (toVolume === 0) audio.pause();
    }
  }, stepTime);
}

function toggleMute() {
  if (isMuted) {
    fadeAudio(bgMusic, 0, targetVolume, 1000);
    isMuted = false;
  } else {
    fadeAudio(bgMusic, bgMusic.volume, 0, 1000);
    isMuted = true;
  }
  updateMusicButtonIcon();
}


window.addEventListener('keydown', e => {
  if (e.key.toLowerCase() === 'm' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    toggleMute();
  }
});

function playButtonClickSound() {
  const sound = document.getElementById('buttonClickSound');
  sound.currentTime = 0;
  sound.play();
}

// Referências
const pauseMenuPanel = document.getElementById('pauseMenuPanel');
const resumeGameBtn = document.getElementById('resumeGameBtn');
const confirmExitBtn = document.getElementById('confirmExitBtn');

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (!gameRunning) return;

    paused = !paused;

    if (paused) {
      pauseMenuPanel.style.display = 'flex';
    } else {
      pauseMenuPanel.style.display = 'none';
      lastFrameTime = performance.now();
      requestAnimationFrame(gameLoop);
    }
  }
});

resumeGameBtn.addEventListener('click', () => {
  paused = false;
  pauseMenuPanel.style.display = 'none';
  lastFrameTime = performance.now();
  requestAnimationFrame(gameLoop);
});

confirmExitBtn.addEventListener('click', () => {
  pauseMenuPanel.style.display = 'none';
  exitToMenu();
});


let selectedCharacter = localStorage.getItem('selectedCharacter') || '../imgs/sapo.png';
document.getElementById('characterPreview').src = selectedCharacter;

// Atualiza os botões visualmente
function updateCharacterButtons() {
  const buttons = document.querySelectorAll('.character-btn');
  buttons.forEach(btn => {
    const img = btn.getAttribute('data-img');
    if (img === selectedCharacter) {
      btn.style.backgroundColor = '#00cc44';
      btn.textContent = btn.textContent.replace('Selecionar', 'Selecionado');
    } else {
      btn.style.backgroundColor = '';
      const name = btn.textContent.replace('Selecionado', '').trim();
      btn.textContent = `Selecionar ${name}`;
    }
  });

  document.getElementById('confirmCharacterBtn').textContent = 'Selecionado';
  document.getElementById('confirmCharacterBtn').disabled = true;
}

// Adiciona os event listeners após o DOM carregar
document.querySelectorAll('.character-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    selectedCharacter = btn.getAttribute('data-img');
    localStorage.setItem('selectedCharacter', selectedCharacter);
    document.getElementById('characterPreview').src = selectedCharacter;
    updateCharacterButtons();
  });
});

// Abertura e fecho do painel
function openCharacterSelect() {
  document.getElementById('startPanel').style.display = 'none';
  document.getElementById('characterSelectPanel').style.display = 'flex';
  updateCharacterButtons();
}

function closeCharacterSelect() {
  document.getElementById('characterSelectPanel').style.display = 'none';
  document.getElementById('startPanel').style.display = 'flex';
}



// TESTE


function selecionarSapo() {
  bloquearBotao('personagem1');
}

function selecionarChatGPT() {
  bloquearBotao('personagem2');
}

function selecionarFebras() {
  bloquearBotao('personagem3');
}

function selecionarGoblin() {
  bloquearBotao('personagem4');
}

function selecionarFred() {
  bloquearBotao('personagem5');
}

function bloquearBotao(idSelecionado) {
  const botoes = document.querySelectorAll('button[data-id]');

  // Primeiro, resetar todos os botões
  botoes.forEach(botao => {
    botao.disabled = false;
    botao.textContent = 'Select';
  });

  // Depois, aplicar a seleção ao botão clicado
  const botaoSelecionado = document.querySelector(`button[data-id="${idSelecionado}"]`);
  if (botaoSelecionado) {
    botaoSelecionado.disabled = true;
    botaoSelecionado.textContent = 'Selected';

    // Atualizar imagem do personagem selecionado
    const characterCard = botaoSelecionado.closest('.character-card');
    if (characterCard) {
      const img = characterCard.querySelector('img').src;
      selectedCharacterImg = img;
      localStorage.setItem('selectedCharacter', img);
      document.getElementById('characterPreview').src = img;
    }
  }
}

// Atualiza ícone do botão
function updateMusicButtonIcon() {
  musicToggleBtn.textContent = isMuted ? '🔇' : '🔊';
}

// Listener de clique
musicToggleBtn.addEventListener('click', () => {
  toggleMute();
});

// Inicializa ícone no carregamento
updateMusicButtonIcon();