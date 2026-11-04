const langButton=document.querySelector('#lang');
function setLanguage(lang){const arabic=lang==='ar';document.documentElement.lang=lang;document.documentElement.dir=arabic?'rtl':'ltr';document.querySelectorAll('[data-en][data-ar]').forEach(el=>{el.innerHTML=el.dataset[arabic?'ar':'en']});langButton.textContent=arabic?'English':'عربي';localStorage.setItem('portfolio-language',lang)}
langButton.addEventListener('click',()=>setLanguage(localStorage.getItem('portfolio-language')==='ar'?'en':'ar'));
setLanguage(localStorage.getItem('portfolio-language')||'en');
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const barberShots=[
 {src:'assets/barber-house-full.png',alt:'Full BARBER HOUSE homepage screenshot'},
 {src:'assets/barber-house-dashboard-bookings.png',alt:'BARBER HOUSE owner dashboard with bookings, sales and the management sidebar'}
];
const fluentoShots=[
 {src:'assets/fluento-admin-dashboard.png',alt:'Fluento admin dashboard'},
 {src:'assets/fluento-instructor-dashboard.png',alt:'Fluento instructor dashboard'},
 {src:'assets/fluento-student-dashboard.png',alt:'Fluento student dashboard'},
 {src:'assets/fluento-quiz-creation.png',alt:'Fluento quiz creation'},
 {src:'assets/fluento-quiz-management.png',alt:'Fluento quiz management'},
 {src:'assets/fluento-assignment-creation.png',alt:'Fluento assignment creation'},
 {src:'assets/fluento-grading-dashboard.png',alt:'Fluento assignment grading dashboard'},
 {src:'assets/fluento-quiz-review.png',alt:'Fluento quiz submission review'},
 {src:'assets/fluento-quiz-results.png',alt:'Fluento quiz results'},
 {src:'assets/fluento-quiz-student-view.png',alt:'Fluento student quiz view'},
 {src:'assets/fluento-login.png',alt:'Fluento sign in page'}
];
function initGallery({root,shots,lightbox,coverSelector,openSelector,closeSelector,prevSelector,nextSelector,dotSelector,lightboxImageSelector}){
 let index=0;
 const cover=root.querySelector(coverSelector), zoom=lightbox.querySelector(lightboxImageSelector);
 const dots=[...root.querySelectorAll(dotSelector),...lightbox.querySelectorAll(dotSelector)];
 const setIndex=n=>{index=(n+shots.length)%shots.length;const shot=shots[index];[cover,zoom].forEach(img=>{img.src=shot.src;img.alt=shot.alt});dots.forEach((dot,i)=>dot.classList.toggle('active',i===index))};
 root.querySelector(openSelector).addEventListener('click',()=>{lightbox.hidden=false;document.body.classList.add('lightbox-open');lightbox.querySelector(closeSelector).focus()});
 const close=()=>{lightbox.hidden=true;document.body.classList.remove('lightbox-open')};
 lightbox.querySelector(closeSelector).addEventListener('click',close);
 lightbox.addEventListener('click',e=>{if(e.target===lightbox)close()});
 [...root.querySelectorAll(prevSelector),...lightbox.querySelectorAll(prevSelector)].forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();setIndex(index-1)}));
 [...root.querySelectorAll(nextSelector),...lightbox.querySelectorAll(nextSelector)].forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();setIndex(index+1)}));
 dots.forEach((dot,i)=>dot.addEventListener('click',e=>{e.stopPropagation();setIndex(i)}));
 document.addEventListener('keydown',e=>{if(!lightbox.hidden){if(e.key==='Escape')close();if(e.key==='ArrowLeft')setIndex(index+1);if(e.key==='ArrowRight')setIndex(index-1)}});
}
const barberRoot=document.querySelector('.barber');
initGallery({root:barberRoot,shots:barberShots,lightbox:document.querySelector('#project-lightbox'),coverSelector:'.project-cover',openSelector:'.project-image-button',closeSelector:'.lightbox-close',prevSelector:'.gallery-prev',nextSelector:'.gallery-next',dotSelector:'.gallery-dot',lightboxImageSelector:'.lightbox-image'});
const fluentoRoot=document.querySelector('.fluento-gallery');
const fluentoDotsMarkup=fluentoShots.map((shot,i)=>`<button class="gallery-dot${i===0?' active':''}" type="button" aria-label="Screenshot ${i+1}: ${shot.alt}"></button>`).join('');
fluentoRoot.querySelector('.fluento-dots').innerHTML=fluentoDotsMarkup;
const fluentoLightbox=document.querySelector('#fluento-lightbox');
fluentoLightbox.querySelector('.fluento-dots').innerHTML=fluentoDotsMarkup;
initGallery({root:fluentoRoot,shots:fluentoShots,lightbox:fluentoLightbox,coverSelector:'.fluento-cover',openSelector:'.fluento-image-button',closeSelector:'.fluento-close',prevSelector:'.fluento-prev',nextSelector:'.fluento-next',dotSelector:'.gallery-dot',lightboxImageSelector:'.fluento-lightbox-image'});
const quranRoot=document.querySelector('.quran-gallery');
const quranShots=[{src:'assets/quran-home.png',alt:'Quran app home screen with Quran, search, tasbih and Qibla tools'},{src:'assets/quran-surahs.png',alt:'Quran app surah list and search screen'}];
initGallery({root:quranRoot,shots:quranShots,lightbox:document.querySelector('#quran-lightbox'),coverSelector:'.quran-cover',openSelector:'.quran-image-button',closeSelector:'.quran-close',prevSelector:'.quran-prev',nextSelector:'.quran-next',dotSelector:'.gallery-dot',lightboxImageSelector:'.quran-lightbox-image'});
