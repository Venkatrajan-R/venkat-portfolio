const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];
function resize(){ W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize(); window.addEventListener('resize', resize);
class Particle {
  constructor(){ this.reset(); }
  reset(){ this.x=Math.random()*W; this.y=Math.random()*H; this.size=Math.random()*1.5+.5; this.vx=(Math.random()-.5)*.3; this.vy=(Math.random()-.5)*.3; this.alpha=Math.random()*.5+.1; }
  update(){ this.x+=this.vx; this.y+=this.vy; if(this.x<0||this.x>W||this.y<0||this.y>H) this.reset(); }
  draw(){ ctx.beginPath(); ctx.arc(this.x,this.y,this.size,0,Math.PI*2); ctx.fillStyle=`rgba(0,229,255,${this.alpha})`; ctx.fill(); }
}
for(let i=0;i<120;i++) particles.push(new Particle());
function drawLines(){ for(let i=0;i<particles.length;i++){ for(let j=i+1;j<particles.length;j++){ const dx=particles[i].x-particles[j].x; const dy=particles[i].y-particles[j].y; const dist=Math.sqrt(dx*dx+dy*dy); if(dist<120){ ctx.beginPath(); ctx.strokeStyle=`rgba(0,229,255,${.12*(1-dist/120)})`; ctx.lineWidth=.5; ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y); ctx.stroke(); } } } }
function animate(){ ctx.clearRect(0,0,W,H); particles.forEach(p=>{p.update();p.draw();}); drawLines(); requestAnimationFrame(animate); }
animate();

const phrases = ['Java Developer','Python Enthusiast','VR Innovator','ML Explorer','Frontend Designer','Problem Solver'];
let pi=0,ci=0,deleting=false;
const tw = document.getElementById('typewriter');
function type(){
  const cur=phrases[pi];
  if(!deleting){ ci++; if(ci>cur.length){ deleting=true; setTimeout(type,1800); return; } }
  else { ci--; if(ci===0){ deleting=false; pi=(pi+1)%phrases.length; setTimeout(type,400); return; } }
  tw.innerHTML=`<span style="color:var(--muted)">&gt; </span>${cur.slice(0,ci)}<span class="cursor"></span>`;
  setTimeout(type,deleting?60:100);
}
setTimeout(type,1500);

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      const bar = e.target.querySelector('.skill-bar-fill');
      if(bar) bar.style.width = bar.dataset.w + '%';
    }
  });
},{threshold:.15});
reveals.forEach(r=>observer.observe(r));