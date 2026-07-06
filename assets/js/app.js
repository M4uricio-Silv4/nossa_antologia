const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function pad(value) {
    return String(value).padStart(2, "0");
}

function updateTimer() {
    const daysEl = $("#days");
    // Trava de segurança: se não estiver na página inicial, ignora o timer
    if (!daysEl) return;

    const diff = Math.max(0, Date.now() - CONFIG.startDate.getTime());
    daysEl.textContent = Math.floor(diff / 86400000);
    $("#hours").textContent = pad(Math.floor(diff / 3600000) % 24);
    $("#minutes").textContent = pad(Math.floor(diff / 60000) % 60);
    $("#seconds").textContent = pad(Math.floor(diff / 1000) % 60);
}

function updateCapsule() {
    const count = $("#capsuleCount");
    if (!count) return;

    const now = Date.now();
    const diff = CONFIG.capsuleDate.getTime() - now;

    // QUANDO A CÁPSULA ESTIVER ABERTA (A data chegou)
    if (diff <= 0) {
        // 1. Injeta o texto gigante na cápsula
        $("#capsuleText").innerHTML = CONFIG.capsuleOpenText;
        count.style.display = 'none'; // Esconde a área das pílulas de contagem

        // 2. Remove a imagem lateral para o texto ter espaço para respirar
        const capsuleMark = document.querySelector(".capsule-mark");
        if (capsuleMark) capsuleMark.style.display = "none";

        // 3. Muda o layout para 1 coluna só (tela cheia)
        const capsuleContainer = document.querySelector(".capsule");
        if (capsuleContainer) capsuleContainer.style.gridTemplateColumns = "1fr";

        // 4. Libera a "Carta trancada" lá na seção de Cartas, mas SEM o texto gigante
        const lockedLetter = $("#lockedLetter");
        if (lockedLetter) lockedLetter.classList.remove("locked");

        const lockedBody = $("#lockedBody");
        if (lockedBody) {
            lockedBody.innerHTML = "A cápsula do tempo foi revelada. Role a página até o final para ler o nosso capítulo especial.";
        }
        return;
    }

    // ENQUANTO A CÁPSULA ESTIVER FECHADA (Contagem Regressiva)
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff / 3600000) % 24;
    const minutes = Math.floor(diff / 60000) % 60;

    count.innerHTML = `
        <span class="pill">${days} dias</span>
        <span class="pill">${pad(hours)} horas</span>
        <span class="pill">${pad(minutes)} min</span>
    `;

    const lockedBody = $("#lockedBody");
    if (lockedBody) lockedBody.textContent = `Ainda faltam ${days} dias para esta carta abrir.`;
}

function showToast(message) {
    const toast = $("#toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function petals() {
    for (let i = 0; i < 28; i += 1) {
        const petal = document.createElement("span");
        petal.className = "petal";
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animationDelay = `${Math.random() * 0.9}s`;
        petal.style.setProperty("--drift", `${Math.random() * 160 - 80}px`);
        document.body.appendChild(petal);
        setTimeout(() => petal.remove(), 4700);
    }
}

function setupLetters() {
    $$(".letter button").forEach((button) => {
        button.addEventListener("click", () => {
            const letter = button.closest(".letter");
            const isLocked = letter.classList.contains("locked");

            $$(".letter").forEach((item) => {
                if (item !== letter) item.classList.remove("open");
            });

            letter.classList.toggle("open");
            if (isLocked) showToast("Ela ainda está guardada para o futuro.");
        });
    });
}

function setupReason() {
    const reasonBtn = $("#reasonButton");
    if (!reasonBtn) return;

    // Cria a nossa "sacola" de bilhetes vazia
    let sacolaDeFrases = [];

    reasonBtn.addEventListener("click", () => {

        // Se a sacola estiver vazia (leu todas as frases), nós recarregamos!
        if (sacolaDeFrases.length === 0) {
            // Copia todas as frases do data.js para dentro da sacola
            sacolaDeFrases = [...CONFIG.reasons];

            // Embaralha as frases muito bem (Algoritmo de Fisher-Yates)
            for (let i = sacolaDeFrases.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [sacolaDeFrases[i], sacolaDeFrases[j]] = [sacolaDeFrases[j], sacolaDeFrases[i]];
            }

            // Truque extra: Para não correr o risco da última frase lida 
            // acabar sendo a primeira da nova sacola embaralhada:
            const fraseAtual = $("#reasonText").textContent;
            if (sacolaDeFrases[0] === fraseAtual && sacolaDeFrases.length > 1) {
                sacolaDeFrases.push(sacolaDeFrases.shift()); // Joga pro fundo da sacola
            }
        }

        // Tira o primeiro "bilhete" da sacola e mostra na tela
        const fraseSorteada = sacolaDeFrases.shift();
        $("#reasonText").textContent = fraseSorteada;
    });
}

function setupTheme() {
    const themeBtn = $("#themeButton");
    if (!themeBtn) return;

    themeBtn.addEventListener("click", () => {
        const night = document.body.classList.toggle("is-night");
        themeBtn.textContent = night ? "Dia" : "Noite";
    });
}

function setupCassette() {
    const openBtn = $("#openPlayerBtn");
    const overlay = $("#mixtape-overlay");
    if (!openBtn || !overlay) return;

    const closeBtn = $("#closePlayerBtn");
    const audio = new Audio();
    const wheels = $$(".wheel");

    // Controles da interface
    const trackTitle = $("#track-title");
    const progressBar = $("#progress-bar");
    const currentTimeEl = $("#current-time");
    const totalTimeEl = $("#total-time");

    // Botões
    const btnPlay = $("#btn-play");
    const btnPrev = $("#btn-prev");
    const btnNext = $("#btn-next");
    const btnLoop = $("#btn-loop");
    const playlistUl = $("#playlist-list");

    let currentIndex = 0;
    let isPlaying = false;
    let isLooping = false;

    // 1. Criar a lista de músicas clicável
    CONFIG.playlist.forEach((song, index) => {
        const li = document.createElement("li");
        li.textContent = song.title;
        li.addEventListener("click", () => loadTrack(index, true));
        playlistUl.appendChild(li);
    });

    // 2. Carregar uma música
    function loadTrack(index, playImmediately = false) {
        currentIndex = index;
        const song = CONFIG.playlist[currentIndex];

        audio.src = song.file;
        trackTitle.textContent = song.title;

        // Destacar a música na lista
        $$(".playlist-list li").forEach((li, i) => {
            li.classList.toggle("playing-now", i === currentIndex);
        });

        if (playImmediately) {
            playTrack();
        } else {
            pauseTrack();
        }
    }

    // 3. Play e Pause
    function playTrack() {
        audio.play().catch(() => showToast("Coloque os arquivos .mp3 na pasta assets/audio!"));
        isPlaying = true;
        btnPlay.textContent = "⏸"; // Ícone de Pause
        wheels.forEach(w => w.classList.add("spinning"));
    }

    function pauseTrack() {
        audio.pause();
        isPlaying = false;
        btnPlay.textContent = "▶"; // Ícone de Play
        wheels.forEach(w => w.classList.remove("spinning"));
    }

    btnPlay.addEventListener("click", () => {
        if (!audio.src) loadTrack(0); // Carrega a primeira se não houver nenhuma
        isPlaying ? pauseTrack() : playTrack();
    });

    // 4. Avançar e Retroceder
    btnNext.addEventListener("click", () => {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= CONFIG.playlist.length) nextIndex = 0; // Volta pra primeira
        loadTrack(nextIndex, true);
    });

    btnPrev.addEventListener("click", () => {
        // Se a música tocou mais de 3 segundos, volta pro começo dela. Se não, volta pra anterior.
        if (audio.currentTime > 3) {
            audio.currentTime = 0;
        } else {
            let prevIndex = currentIndex - 1;
            if (prevIndex < 0) prevIndex = CONFIG.playlist.length - 1;
            loadTrack(prevIndex, true);
        }
    });

    // 5. Repetir (Loop)
    btnLoop.addEventListener("click", () => {
        isLooping = !isLooping;
        audio.loop = isLooping;
        btnLoop.classList.toggle("active-loop", isLooping);
        showToast(isLooping ? "Música em repetição." : "Repetição desativada.");
    });

    // Ao terminar uma música, pular pra próxima (se não estiver em loop)
    audio.addEventListener("ended", () => {
        if (!isLooping) btnNext.click();
    });

    // 6. Barra de Progresso e Tempo
    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${pad(sec)}`;
    }

    audio.addEventListener("loadedmetadata", () => {
        progressBar.max = audio.duration;
        totalTimeEl.textContent = formatTime(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
        progressBar.value = audio.currentTime;
        currentTimeEl.textContent = formatTime(audio.currentTime);
    });

    // Arrastar a barra
    progressBar.addEventListener("input", () => {
        audio.currentTime = progressBar.value;
    });

    // 7. Lógica de Abrir/Fechar o Painel
    openBtn.addEventListener("click", () => overlay.classList.add("active"));

    closeBtn.addEventListener("click", () => overlay.classList.remove("active"));

    // Fechar clicando fora do card (a música continua tocando!)
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.classList.remove("active");
    });

    // Inicializar carregando a primeira música (sem tocar)
    loadTrack(0, false);
}

function setupReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.02 }); /* <-- O SEGREDO ESTÁ AQUI: Mudamos de 0.16 para 0.02 (2%) */

    $$(".reveal").forEach((item) => observer.observe(item));
}

function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const photos = document.querySelectorAll('.photo-item img');

    photos.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            const caption = img.nextElementSibling;
            lightboxCaption.textContent = caption ? caption.textContent : '';
            lightbox.classList.add('active');
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
    };

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// INICIALIZAÇÃO DE TODAS AS FUNÇÕES
setupLetters();
setupReason();
setupTheme();
setupCassette();
setupReveal();
setupLightbox();

const petalBtn = $("#petalButton");
if (petalBtn) {
    petalBtn.addEventListener("click", () => {
        petals();
        showToast("Um abraço virtual, daqueles demorados.");
    });
}

updateTimer();
updateCapsule();
setInterval(updateTimer, 1000);
setInterval(updateCapsule, 60000);

// Easter Egg
let secretCode = "";
const targetCode = "teamo";
window.addEventListener("keydown", (e) => {
    secretCode += e.key.toLowerCase();
    if (secretCode.length > targetCode.length) {
        secretCode = secretCode.slice(1);
    }
    if (secretCode === targetCode) {
        petals();
        showToast("Você achou o segredo. Eu te amo muito!");
        secretCode = "";
    }
});