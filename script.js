const hero = document.querySelector('.hero');
const heroGap = document.querySelector('.hero-gap');
const pill = document.querySelector('.pill');

const LEAD = 30; // px pill always stays ahead

function updatePill() {
  const rect = hero.getBoundingClientRect();
  const heroHeight = rect.height;

  // 1️⃣ Pure scroll progress
  let progress = -rect.top / heroHeight;
  progress = Math.max(0, Math.min(1, progress));

  // 2️⃣ Normal movement range
  // Use heroGap height to allow full travel equal to scroll distance + buffer
  const normalMax = heroGap.offsetHeight - pill.offsetHeight;

  // 3️⃣ Base movement
  // We want the pill to move such that it stays fixed or moves slightly.
  // Ideally, translateY should be approximately equal to scrolled distance to appear fixed.
  // scrolled distance = -rect.top (when positive)
  // Let's calculate a base target.
  let targetY = progress * normalMax;
  
  // 4️⃣ Add constant lead
  targetY += LEAD;

  // 5️⃣ SAFETY CLAMP: Never touch top
  // Pill visual top = rect.top + translateY
  // Requirement: rect.top + translateY >= LEAD
  // So: translateY >= LEAD - rect.top
  const minRequiredY = LEAD - rect.top;
  
  // We apply the max of targetY and minRequiredY
  // This effectively makes it "sticky" at LEAD px from top if the targetY is too slow.
  let finalY = Math.max(targetY, minRequiredY);

  // 6️⃣ Clamp to container bounds
  finalY = Math.min(finalY, normalMax);

  pill.style.transform = `translate(-50%, ${finalY}px)`;
}

window.addEventListener('scroll', updatePill);
window.addEventListener('resize', updatePill);
updatePill();
