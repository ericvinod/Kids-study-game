/* ============================================================
   LITTLE CONFETTI — a tiny, dependency-free canvas confetti burst
   ============================================================ */

const Confetti = (() => {
  let canvas, ctx, particles = [], rafId = null;
  const COLORS = ["#FF6B6B", "#FFD43B", "#51CF66", "#4DABF7", "#845EF7", "#F783AC", "#FF922B"];

  function ensureCanvas() {
    if (canvas) return;
    canvas = document.getElementById("confetti-canvas");
    ctx = canvas.getContext("2d");
    resize();
    window.addEventListener("resize", resize);
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function makeParticle(originX, originY) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 8;
    return {
      x: originX, y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 6,
      size: 6 + Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * 360,
      spin: (Math.random() - 0.5) * 20,
      life: 0,
      shape: Math.random() > 0.5 ? "rect" : "circle"
    };
  }

  function burst(x, y, count = 120) {
    ensureCanvas();
    const ox = x !== undefined ? x : canvas.width / 2;
    const oy = y !== undefined ? y : canvas.height / 3;
    for (let i = 0; i < count; i++) particles.push(makeParticle(ox, oy));
    if (!rafId) tick();
  }

  function fullCelebration() {
    ensureCanvas();
    burst(canvas.width * 0.2, canvas.height * 0.3, 90);
    burst(canvas.width * 0.5, canvas.height * 0.2, 90);
    burst(canvas.width * 0.8, canvas.height * 0.3, 90);
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.life += 1;
      p.vy += 0.18; // gravity
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.spin;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, 1 - p.life / 140);
      if (p.shape === "rect") {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });
    particles = particles.filter(p => p.life < 140 && p.y < canvas.height + 50);
    if (particles.length > 0) {
      rafId = requestAnimationFrame(tick);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rafId = null;
    }
  }

  return { burst, fullCelebration };
})();
