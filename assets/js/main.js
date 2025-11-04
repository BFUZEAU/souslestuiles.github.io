document.addEventListener('DOMContentLoaded', function(){
  // Initialize Swiper
  const swiper = new Swiper('.swiper', {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 30,
    loop: true,
    speed: 8000,
    autoplay: {
      delay: 1,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 5,
      },
    },
    on: {
      init: function () {
        this.autoplay.start();
      }
    }
  });

  // Hamburger toggle
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('primary-menu');
  if(toggle && menu){
    toggle.addEventListener('click', function(){
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('open');
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length > 1){
        const target = document.querySelector(href);
        if(target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth',block:'start'});
          // close menu on mobile
          if(menu && menu.classList.contains('open')){
            menu.classList.remove('open');
            toggle.setAttribute('aria-expanded','false');
          }
        }
      }
    })
  })

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      })
    },{threshold:0.12});
    reveals.forEach(r=>obs.observe(r));
  } else {
    // fallback
    reveals.forEach(r=>r.classList.add('visible'));
  }
});
