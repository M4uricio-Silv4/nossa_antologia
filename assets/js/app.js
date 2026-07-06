
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function pad(value) {
    return String(value).padStart(2, "0");
}

function updateTimer() {
    const diff = Math.max(0, Date.now() - CONFIG.startDate.getTime());
    $("#days").textContent = Math.floor(diff / 86400000);
    $("#hours").textContent = pad(Math.floor(diff / 3600000) % 24);
    $("#minutes").textContent = pad(Math.floor(diff / 60000) % 60);
    $("#seconds").textContent = pad(Math.floor(diff / 1000) % 60);
}

function updateCapsule() {
    const now = Date.now();
    const diff = CONFIG.capsuleDate.getTime() - now;
    const count = $("#capsuleCount");

    if (diff <= 0) {
        $("#capsuleText").textContent = CONFIG.capsuleOpenText;
        count.innerHTML = '<span class="pill">Aberta</span>';
        $("#lockedLetter").classList.remove("locked");
        $("#lockedBody").textContent = CONFIG.capsuleOpenText;
        return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff / 3600000) % 24;
    const minutes = Math.floor(diff / 60000) % 60;
    count.innerHTML = `
        <span class="pill">${days} dias</span>
        <span class="pill">${pad(hours)} horas</span>
        <span class="pill">${pad(minutes)} min</span>
      `;
    $("#lockedBody").textContent = `Ainda faltam ${days} dias para esta carta abrir.`;
}

function showToast(message) {
    const toast = $("#toast");
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
    let previous = -1;
    $("#reasonButton").addEventListener("click", () => {
        let next = previous;
        while (next === previous) {
            next = Math.floor(Math.random() * CONFIG.reasons.length);
        }
        previous = next;
        $("#reasonText").textContent = CONFIG.reasons[next];
    });
}

function setupTheme() {
    $("#themeButton").addEventListener("click", () => {
        const night = document.body.classList.toggle("is-night");
        $("#themeButton").textContent = night ? "Dia" : "Noite";
    });
}

function setupMusic() {
    const audio = $("#soundtrack");
    const button = $("#musicButton");
    let playing = false;

    button.addEventListener("click", async () => {
        if (playing) {
            audio.pause();
            button.textContent = "Tocar trilha";
            playing = false;
            return;
        }

        try {
            await audio.play();
            button.textContent = "Pausar trilha";
            playing = true;
        } catch (error) {
            showToast("Coloque sua música em assets/audio/trilha sonora.mp3 para ativar a trilha.");
        }
    });
}

function setupReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.16 });

    $$(".reveal").forEach((item) => observer.observe(item));
}

$("#petalButton").addEventListener("click", () => {
    petals();
    showToast("Um abraço virtual, daqueles demorados.");
});

setupLetters();
setupReason();
setupTheme();
setupMusic();
setupReveal();
updateTimer();
updateCapsule();
setInterval(updateTimer, 1000);
setInterval(updateCapsule, 60000);