const langButton=document.querySelector('#lang');
const menuToggle=document.querySelector('#menu-toggle');
const primaryNav=document.querySelector('#primary-nav');
const topActions=document.querySelector('.top-actions');
const mobileNavQuery=window.matchMedia('(max-width:760px)');
function placeLanguageToggle(){if(mobileNavQuery.matches){primaryNav.append(langButton)}else{topActions.prepend(langButton)}}
placeLanguageToggle();
mobileNavQuery.addEventListener('change',placeLanguageToggle);
function setLanguage(lang){const arabic=lang==='ar';document.documentElement.lang=lang;document.documentElement.dir=arabic?'rtl':'ltr';document.querySelectorAll('[data-en][data-ar]').forEach(el=>{el.innerHTML=el.dataset[arabic?'ar':'en']});langButton.textContent=arabic?'English':'عربي';localStorage.setItem('portfolio-language',lang)}
langButton.addEventListener('click',()=>setLanguage(localStorage.getItem('portfolio-language')==='ar'?'en':'ar'));
setLanguage(localStorage.getItem('portfolio-language')||'en');
const closeMobileNav=()=>{document.querySelector('.topbar').classList.remove('nav-open');menuToggle.setAttribute('aria-expanded','false')};
menuToggle.addEventListener('click',()=>{const isOpen=document.querySelector('.topbar').classList.toggle('nav-open');menuToggle.setAttribute('aria-expanded',String(isOpen))});
primaryNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMobileNav));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMobileNav()});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const barberShots=[
 {src:'assets/barber-house-full.png',alt:'Full BARBER HOUSE homepage screenshot'},
 {src:'assets/barber-house-dashboard-bookings.png',alt:'BARBER HOUSE owner dashboard and booking management'},
 {src:'assets/barber-house-customers.png',alt:'BARBER HOUSE customer directory'},
 {src:'assets/barber-house-services.png',alt:'BARBER HOUSE service management'},
 {src:'assets/barber-house-accounts.png',alt:'BARBER HOUSE accounts and customer balances'},
 {src:'assets/barber-house-reports.png',alt:'BARBER HOUSE sales and performance reports'},
 {src:'assets/barber-house-inventory.png',alt:'BARBER HOUSE inventory management'},
 {src:'assets/barber-house-notifications.png',alt:'BARBER HOUSE notifications'},
 {src:'assets/barber-house-settings.png',alt:'BARBER HOUSE shop settings'},
 {src:'assets/barber-house-mobile-home.png',alt:'BARBER HOUSE mobile homepage'},
 {src:'assets/barber-house-mobile-booking-methods.png',alt:'BARBER HOUSE mobile booking methods'},
 {src:'assets/barber-house-mobile-booking-form.jpg',alt:'BARBER HOUSE mobile booking form'},
 {src:'assets/barber-house-mobile-service-options.jpg',alt:'BARBER HOUSE mobile service options'},
 {src:'assets/barber-house-mobile-order-success.jpg',alt:'BARBER HOUSE mobile booking confirmation'},
 {src:'assets/barber-house-mobile-bookings.jpg',alt:'BARBER HOUSE mobile customer bookings'},
 {src:'assets/barber-house-mobile-notifications.jpg',alt:'BARBER HOUSE mobile notifications'}
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
 const dotGroups=[root.querySelectorAll(dotSelector),lightbox.querySelectorAll(dotSelector)];
 const setIndex=n=>{index=(n+shots.length)%shots.length;const shot=shots[index];[cover,zoom].forEach(img=>{img.src=shot.src;img.alt=shot.alt});dotGroups.forEach(dots=>dots.forEach((dot,i)=>dot.classList.toggle('active',i===index)))};
 const dots=[...dotGroups].flatMap(group=>[...group]);
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
const barberDotMarkup=barberShots.map((shot,i)=>`<button class="gallery-dot${i===0?' active':''}" type="button" aria-label="Screenshot ${i+1}: ${shot.alt}"></button>`).join('');
barberRoot.querySelector('.gallery-dots').innerHTML=barberDotMarkup;
document.querySelector('#project-lightbox .gallery-dots').innerHTML=barberDotMarkup;
initGallery({root:barberRoot,shots:barberShots,lightbox:document.querySelector('#project-lightbox'),coverSelector:'.project-cover',openSelector:'.project-image-button',closeSelector:'.lightbox-close',prevSelector:'.gallery-prev',nextSelector:'.gallery-next',dotSelector:'.gallery-dot',lightboxImageSelector:'.lightbox-image'});
const fluentoRoot=document.querySelector('.fluento-gallery');
const fluentoDotsMarkup=fluentoShots.map((shot,i)=>`<button class="gallery-dot${i===0?' active':''}" type="button" aria-label="Screenshot ${i+1}: ${shot.alt}"></button>`).join('');
fluentoRoot.querySelector('.fluento-dots').innerHTML=fluentoDotsMarkup;
const fluentoLightbox=document.querySelector('#fluento-lightbox');
fluentoLightbox.querySelector('.fluento-dots').innerHTML=fluentoDotsMarkup;
initGallery({root:fluentoRoot,shots:fluentoShots,lightbox:fluentoLightbox,coverSelector:'.fluento-cover',openSelector:'.fluento-image-button',closeSelector:'.fluento-close',prevSelector:'.fluento-prev',nextSelector:'.fluento-next',dotSelector:'.gallery-dot',lightboxImageSelector:'.fluento-lightbox-image'});
const quranRoot=document.querySelector('.quran-gallery');
const quranShots=[
 {src:'assets/quran-home.png',alt:'Quran app home screen with buttons for surahs, search, tasbih and Qibla'},
 {src:'assets/quran-surahs.png',alt:'Quran app surah list with Arabic names, transliterations and verse counts'},
 {src:'assets/quran-fatiha.png',alt:'Reading Surah Al-Fatiha with verse playback and tafsir controls'},
 {src:'assets/quran-baqarah.png',alt:'Reading Surah Al-Baqarah with page navigation'},
 {src:'assets/quran-tafsir.png',alt:'Quran verse tafsir panel with Arabic verse and explanation'},
 {src:'assets/quran-search.png',alt:'Search Quran verses with optional surah and verse filters'},
 {src:'assets/quran-tasbih.png',alt:'Digital tasbih counter screen'},
 {src:'assets/quran-tasbih-dhikr.png',alt:'Choose a dhikr for the digital tasbih'},
 {src:'assets/quran-tasbih-history.png',alt:'Tasbih counter with saved dhikr history'},
 {src:'assets/quran-qibla.png',alt:'Qibla compass and direction information'}
];
const quranDots=quranShots.map((shot,i)=>`<button class="gallery-dot${i===0?' active':''}" type="button" aria-label="Screenshot ${i+1}: ${shot.alt}"></button>`).join('');
document.querySelectorAll('.quran-dots').forEach(group=>group.innerHTML=quranDots);
initGallery({root:quranRoot,shots:quranShots,lightbox:document.querySelector('#quran-lightbox'),coverSelector:'.quran-cover',openSelector:'.quran-image-button',closeSelector:'.quran-close',prevSelector:'.quran-prev',nextSelector:'.quran-next',dotSelector:'.gallery-dot',lightboxImageSelector:'.quran-lightbox-image'});

const perfumeRoot=document.querySelector('.perfume-gallery');
const perfumeShots=[
 {src:'assets/perfume-home.png',alt:'Kareem Perfume homepage with fragrance carousel'},
 {src:'assets/perfume-products.png',alt:'Perfume product catalog with search and category filters'},
 {src:'assets/perfume-about.png',alt:'About Kareem Perfume and its brand story'},
 {src:'assets/perfume-contact.png',alt:'Kareem Perfume contact form'},
 {src:'assets/perfume-cart.png',alt:'Shopping cart and order summary'}
];
const perfumeDots=perfumeShots.map((shot,i)=>`<button class="gallery-dot${i===0?' active':''}" type="button" aria-label="Screenshot ${i+1}: ${shot.alt}"></button>`).join('');
document.querySelectorAll('.perfume-dots').forEach(group=>group.innerHTML=perfumeDots);
initGallery({root:perfumeRoot,shots:perfumeShots,lightbox:document.querySelector('#perfume-lightbox'),coverSelector:'.perfume-cover',openSelector:'.perfume-image-button',closeSelector:'.perfume-close',prevSelector:'.perfume-prev',nextSelector:'.perfume-next',dotSelector:'.gallery-dot',lightboxImageSelector:'.perfume-lightbox-image'});


const carDealerRoot=document.querySelector('.car-dealer-gallery');
const carDealerShots=[
 {src:'assets/car-dealer-cars.png',alt:'Car dealership system cars management screen'},
 {src:'assets/car-dealer-customers.png',alt:'Customer records management screen'},
 {src:'assets/car-dealer-employees.png',alt:'Employee records management screen'},
 {src:'assets/car-dealer-orders.png',alt:'Car dealership orders management screen'},
 {src:'assets/car-dealer-payments.png',alt:'Payment records management screen'},
 {src:'assets/car-dealer-services.png',alt:'Vehicle service records management screen'},
 {src:'assets/car-dealer-reports.png',alt:'Car dealership reports menu'},
 {src:'assets/car-dealer-report-detail.png',alt:'Car dealership service report results'}
];
const carDealerDots=carDealerShots.map((shot,i)=>`<button class="gallery-dot${i===0?' active':''}" type="button" aria-label="Screenshot ${i+1}: ${shot.alt}"></button>`).join('');
document.querySelectorAll('.car-dealer-dots').forEach(group=>group.innerHTML=carDealerDots);
initGallery({root:carDealerRoot,shots:carDealerShots,lightbox:document.querySelector('#car-dealer-lightbox'),coverSelector:'.car-dealer-cover',openSelector:'.car-dealer-image-button',closeSelector:'.car-dealer-close',prevSelector:'.car-dealer-prev',nextSelector:'.car-dealer-next',dotSelector:'.gallery-dot',lightboxImageSelector:'.car-dealer-lightbox-image'});

const webEcommerceRoot=document.querySelector('.web-ecommerce-gallery');
const webEcommerceShots=[
 {src:'assets/web-ecommerce-home.png',alt:'Kareem Online Store homepage with animated night landscape'},
 {src:'assets/web-ecommerce-products.png',alt:'Online store product catalog with category navigation'},
 {src:'assets/web-ecommerce-checkout.png',alt:'Product confirmation before adding an item to the cart'},
 {src:'assets/web-ecommerce-cart.png',alt:'Shopping cart with quantities and total'},
 {src:'assets/web-ecommerce-admin.png',alt:'Administrator product catalog management'},
 {src:'assets/web-ecommerce-admin-ar.png',alt:'Administrator product upload form in Arabic'}
];
const webEcommerceDots=webEcommerceShots.map((shot,i)=>`<button class="gallery-dot${i===0?' active':''}" type="button" aria-label="Screenshot ${i+1}: ${shot.alt}"></button>`).join('');
document.querySelectorAll('.web-ecommerce-dots').forEach(group=>group.innerHTML=webEcommerceDots);
initGallery({root:webEcommerceRoot,shots:webEcommerceShots,lightbox:document.querySelector('#web-ecommerce-lightbox'),coverSelector:'.web-ecommerce-cover',openSelector:'.web-ecommerce-image-button',closeSelector:'.web-ecommerce-close',prevSelector:'.web-ecommerce-prev',nextSelector:'.web-ecommerce-next',dotSelector:'.gallery-dot',lightboxImageSelector:'.web-ecommerce-lightbox-image'});

const companySystemRoot=document.querySelector('.company-system-gallery');
const companySystemShots=[
 {src:'assets/company-home-en.png',alt:'Company System home dashboard in English'},
 {src:'assets/company-home-ar.png',alt:'Company System home dashboard in Arabic'},
 {src:'assets/company-departments.png',alt:'Department management with search and sorting'},
 {src:'assets/company-department-details.png',alt:'Company department details'},
 {src:'assets/company-notes.png',alt:'Employee notes list with filters and pagination'},
 {src:'assets/company-note-create.png',alt:'Create an employee note'},
 {src:'assets/company-note-details.png',alt:'Employee note details'},
 {src:'assets/company-content-management.png',alt:'Manage company home page content'}
];
const companySystemDots=companySystemShots.map((shot,i)=>`<button class="gallery-dot${i===0?' active':''}" type="button" aria-label="Screenshot ${i+1}: ${shot.alt}"></button>`).join('');
document.querySelectorAll('.company-system-dots').forEach(group=>group.innerHTML=companySystemDots);
initGallery({root:companySystemRoot,shots:companySystemShots,lightbox:document.querySelector('#company-system-lightbox'),coverSelector:'.company-system-cover',openSelector:'.company-system-image-button',closeSelector:'.company-system-close',prevSelector:'.company-system-prev',nextSelector:'.company-system-next',dotSelector:'.gallery-dot',lightboxImageSelector:'.company-system-lightbox-image'});

const certificateModal=document.querySelector('#certificate-lightbox');
const certificateImage=certificateModal.querySelector('.certificate-image');
const certificateClose=certificateModal.querySelector('.certificate-close');
document.querySelectorAll('.degree-link').forEach(link=>link.addEventListener('click',()=>{
 const isAsal=link.classList.contains('certificate-link');
 certificateImage.src=link.dataset.certificate||(isAsal?'assets/asal-backend-training-certificate.jpeg':'assets/bethlehem-university-degree.jpg');
 certificateImage.alt=link.dataset.certificateAlt||(isAsal?'ASAL Technologies training certificate for Kareem Abu Ayyash':'Bethlehem University degree certificate for Kareem Abu Ayyash');
 certificateModal.setAttribute('aria-label',link.title||(isAsal?'ASAL Technologies training certificate':'Bethlehem University degree certificate'));
 certificateModal.hidden=false;
 document.body.classList.add('lightbox-open');
 certificateClose.focus();
}));
const closeCertificate=()=>{certificateModal.hidden=true;document.body.classList.remove('lightbox-open')};
certificateClose.addEventListener('click',closeCertificate);
certificateModal.addEventListener('click',event=>{if(event.target===certificateModal)closeCertificate()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!certificateModal.hidden)closeCertificate()});

const sightDemoPlayer=document.querySelector('#sight-demo-player');
const sightDemoVideos=[
 {src:'assets/sight-demo.mp4',poster:'assets/sight-demo-poster.jpg',label:'Sight demo video 1'},
 {src:'assets/sight-demo-2.mp4',poster:'assets/sight-demo-poster-2.jpg',label:'Sight demo video 2'}
];
let sightDemoIndex=0;
const setSightDemo=index=>{
 sightDemoIndex=(index+sightDemoVideos.length)%sightDemoVideos.length;
 const demo=sightDemoVideos[sightDemoIndex];
 document.querySelector('.sight-video').classList.toggle('sight-video-portrait',sightDemoIndex===1);
 sightDemoPlayer.pause();
 sightDemoPlayer.src=demo.src;
 sightDemoPlayer.poster=demo.poster;
 sightDemoPlayer.setAttribute('aria-label',demo.label);
 sightDemoPlayer.load();
 document.querySelectorAll('.sight-demo-dots .gallery-dot').forEach((dot,i)=>dot.classList.toggle('active',i===sightDemoIndex));
};
document.querySelector('.sight-demo-prev').addEventListener('click',()=>setSightDemo(sightDemoIndex-1));
document.querySelector('.sight-demo-next').addEventListener('click',()=>setSightDemo(sightDemoIndex+1));
document.querySelectorAll('.sight-demo-dots .gallery-dot').forEach((dot,i)=>dot.addEventListener('click',()=>setSightDemo(i)));
