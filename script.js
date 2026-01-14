const hero = document.querySelector('.hero');
const pill = document.querySelector('.pill');

//const START_OFFSET = 20; // px from top
const LEAD = 20; // px pill always stays ahead

function updatePill() {
  const rect = hero.getBoundingClientRect();
  const heroHeight = rect.height;

  // 1️⃣ Pure scroll progress
  let progress = -rect.top / heroHeight;
  progress = Math.max(0, Math.min(1, progress));

  // 2️⃣ Normal movement range
  const normalMax = heroHeight - pill.offsetHeight;

  // 3️⃣ Base movement
  let translateY = progress * normalMax;

  // 4️⃣ Add constant lead (THIS is the fix)
  translateY += LEAD;

  pill.style.transform = `translate(-50%, ${translateY}px)`;
}

window.addEventListener('scroll', updatePill);
window.addEventListener('resize', updatePill);
updatePill();
