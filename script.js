const langButton=document.querySelector('#lang');
function setLanguage(lang){const arabic=lang==='ar';document.documentElement.lang=lang;document.documentElement.dir=arabic?'rtl':'ltr';document.querySelectorAll('[data-en][data-ar]').forEach(el=>{el.innerHTML=el.dataset[arabic?'ar':'en']});langButton.textContent=arabic?'English':'عربي';localStorage.setItem('portfolio-language',lang)}
langButton.addEventListener('click',()=>setLanguage(document.documentElement.lang==='en'?'ar':'en'));
setLanguage(localStorage.getItem('portfolio-language')||'en');
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
