/* ================= ELEMENTS ================= */
const yesBtn = document.querySelector(".yes");
const noBtn = document.querySelector(".no");
const text = document.getElementById("text");
const img = document.getElementById("img");
const giftBtn = document.getElementById("gift");
const cover = document.getElementById("cover");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
const saveShot = document.getElementById("saveShot");
const card = document.getElementById("card");
const music = document.getElementById("bgMusic");
const awwSound = document.getElementById("awwSound");
const musicBtn = document.getElementById("music");
const themeBtn = document.getElementById("theme");

/* ================= STATE ================= */
let step = 0;
let yesScale = 1;
let noScale = 1;
let noOpacity = 1;
let heartsStarted = false;
let musicUnlocked = false;

/* ================= MUSIC ================= */
function updateMusicIcon() {
  musicBtn.innerText = music.paused ? "🔊" : "🔈";
}

function playMusic() {
  music.play().catch(() => {});
  updateMusicIcon();
}

function pauseMusic() {
  music.pause();
  updateMusicIcon();
}

/* Autoplay muted (allowed everywhere) */
window.addEventListener("load", () => {
  music.muted = true;
  playMusic();
});

/* Unlock music on FIRST real interaction (Mobile Safe) */
function unlockMusic() {
  if (musicUnlocked) return;

  music.muted = false;
  music.currentTime = 0;

  const p = music.play();
  if (p !== undefined) {
    p.then(() => {
      musicUnlocked = true;
      updateMusicIcon();
    }).catch(()=>{});
  }
}

/* Listen to ALL possible first interactions */
["click","touchstart","touchend","pointerdown"].forEach(evt => {
  document.addEventListener(evt, unlockMusic, { once:true });
});

musicBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  music.paused ? playMusic() : pauseMusic();
});

/* ================= SCREEN SHAKE ================= */
function screenShake() {
  document.body.classList.add("shake");
  setTimeout(() => document.body.classList.remove("shake"), 400);
}

/* ================= NO ESCAPE ================= */
function moveNoButton(e) {
  const rect = noBtn.getBoundingClientRect();
  const mouseX = e.clientX || (e.touches && e.touches[0].clientX);
  const mouseY = e.clientY || (e.touches && e.touches[0].clientY);

  const btnX = rect.left + rect.width / 2;
  const btnY = rect.top + rect.height / 2;

  const dx = btnX - mouseX;
  const dy = btnY - mouseY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 120) {
    const speed = 60;
    noBtn.style.transform = `translate(${(dx / distance) * speed}px, ${(dy / distance) * speed}px) scale(${noScale})`;
  }
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("mousemove", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);

/* ================= DIALOGUE ================= */
const stepsData = [
  { text: "Soch lo 🤔", image: "assets/think.gif" },
  { text: "Ek baar aur soch lo 😢", image: "assets/sadface.gif" },
  { text: "Please maan jao 🥺", image: "assets/plz.gif" },
  { text: "Itna bhaav mat khao 😠", image: "assets/attitude.gif" },
  { text: "Sach me nahi? 😭", image: "assets/cry.gif" },
  { text: "Oyeeeeeeeeeeeeee!!!", image: "assets/cute.gif" },
  { text: "Last chance ❤️", image: "assets/loveme.gif" },
  { text: "Dil tod dogi kya? 💔", image: "assets/cry.gif" },
  { text: "Main ro dunga sach me 😭", image: "assets/sadface.gif" },
  { text: "Itna bhi kya sochna 😩", image: "assets/think.gif" },
  { text: "Tum haan hi bolne wali ho 😌", image: "assets/cute.gif" },
  { text: "Fate already decided 💘", image: "assets/loveme.gif" },
  { text: "Universe bhi haan bol raha hai ✨", image: "assets/cute.gif" },
  { text: "Dekho YES button kitna cute hai 😏", image: "assets/cute.gif" },
  { text: "NO dabake kya milega 😤", image: "assets/attitude.gif" },
  { text: "Maan jao warna main phir puchunga 😈", image: "assets/attitude.gif" },
  { text: "Still no?? 😳", image: "assets/sadface.gif" },
  { text: "Ye unfair hai 😭", image: "assets/cry.gif" }
];

/* ================= NO CLICK ================= */
noBtn.addEventListener("click", () => {
  screenShake();

  if (step < stepsData.length) {
    text.innerText = stepsData[step].text;
    img.style.backgroundImage = `url(${stepsData[step].image})`;
    step++;
  }

  yesScale += 0.18;
  const translateY = (yesScale - 1) * 30;
  yesBtn.style.transform = `scale(${yesScale}) translateY(${translateY}px)`;

  noScale -= 0.07;
  noOpacity -= 0.08;

  noScale = Math.max(noScale, 0.4);
  noOpacity = Math.max(noOpacity, 0);

  noBtn.style.transform = `scale(${noScale})`;
  noBtn.style.opacity = noOpacity;

  if (noOpacity <= 0.15) {
    noBtn.style.pointerEvents = "none";
  }

  if (yesScale >= 2.6) {
    acceptLove();
  }
});

/* ================= YES ================= */
yesBtn.addEventListener("click", acceptLove);

function acceptLove() {
  text.innerText = "Mujhe pata tha tum maan jaogi ❤️";
  img.style.backgroundImage = "url(assets/thanks.gif)";
  yesBtn.style.display = "none";
  noBtn.style.display = "none";
  giftBtn.style.display = "block";
  startHearts();
  playMusic();
}

/* ================= HEARTS ================= */
function startHearts() {
  if (heartsStarted) return;
  heartsStarted = true;

  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = "💖";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 16 + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  }, 300);
}

/* ================= GIFT ================= */
giftBtn.addEventListener("click", () => cover.style.display = "flex");

cover.addEventListener("click", () => {
  cover.style.display = "none";
  popup.style.display = "flex";
});

closePopup.addEventListener("click", () => {
  popup.style.display = "none";
  awwSound.play().catch(() => {});
});

/* ================= SCREENSHOT ================= */
saveShot.addEventListener("click", () => {
  html2canvas(card).then(canvas => {
    const link = document.createElement("a");
    link.download = "love-memory.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});

/* ================= THEME ================= */
const themes = ["#ff4ecd", "#00eaff", "#7CFF00", "#FFD700"];
let themeIndex = 0;
themeBtn.addEventListener("click", () => {
  card.style.boxShadow = `0 0 70px ${themes[themeIndex]}`;
  themeIndex = (themeIndex + 1) % themes.length;
});
