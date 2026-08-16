const nav=document.querySelector(".nav"),toggle=document.querySelector(".nav-toggle");
toggle?.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const progress=document.querySelector(".progress");
window.addEventListener("scroll",()=>{
  const h=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=(window.scrollY/h*100)+"%";
},{passive:true});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting) entry.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click",e=>{
    const target=document.querySelector(a.getAttribute("href"));
    if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth",block:"start"})}
  });
});

const themeToggle=document.getElementById("themeToggle");
const savedTheme=localStorage.getItem("vk-theme");
if(savedTheme==="light") document.body.classList.add("light");
function updateThemeButton(){
  const light=document.body.classList.contains("light");
  if(themeToggle){
    themeToggle.querySelector(".theme-icon").textContent=light?"☾":"☼";
    themeToggle.querySelector(".theme-text").textContent=light?"Dark":"Light";
    themeToggle.setAttribute("aria-label",light?"Switch to dark theme":"Switch to light theme");
  }
}
updateThemeButton();
themeToggle?.addEventListener("click",()=>{
  document.body.classList.toggle("light");
  localStorage.setItem("vk-theme",document.body.classList.contains("light")?"light":"dark");
  updateThemeButton();
});

const counters=document.querySelectorAll(".kpi-value");
const counterObserver=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{
   if(!entry.isIntersecting || entry.target.dataset.done) return;
   entry.target.dataset.done="1";
   const target=Number(entry.target.dataset.target), duration=1000, start=performance.now();
   const tick=now=>{
     const p=Math.min((now-start)/duration,1);
     const eased=1-Math.pow(1-p,3);
     entry.target.textContent=Math.round(target*eased);
     if(p<1) requestAnimationFrame(tick);
   };
   requestAnimationFrame(tick);
 });
},{threshold:.6});
counters.forEach(c=>counterObserver.observe(c));

document.querySelectorAll(".project-card").forEach(card=>{
  card.addEventListener("pointermove", e=>{
    if(window.innerWidth<800) return;
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(900px) rotateX(${(-y*2.2).toFixed(2)}deg) rotateY(${(x*2.2).toFixed(2)}deg) translateY(-5px)`;
  });
  card.addEventListener("pointerleave",()=>card.style.transform="");
});
