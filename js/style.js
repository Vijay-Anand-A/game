(function(){
  var header = document.getElementById('header');
  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');

  document.getElementById('year').textContent = new Date().getFullYear();

  window.addEventListener('scroll', function(){
    header.classList.toggle('scrolled', window.scrollY > 20);
  });

  burger.addEventListener('click', function(){ navLinks.classList.toggle('open'); });
  navLinks.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ navLinks.classList.remove('open'); });
  });

  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var sections = links.map(function(a){ return document.querySelector(a.getAttribute('href')); });
  window.addEventListener('scroll', function(){
    var pos = window.scrollY + 120;
    sections.forEach(function(s, i){
      if(s && pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight){
        links.forEach(function(l){ l.classList.remove('active'); });
        links[i].classList.add('active');
      }
    });
  });

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  var form = document.getElementById('enquiryForm');
  var note = document.getElementById('formNote');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    note.className = 'form-note ok';
    note.textContent = 'Thank you! Your enquiry has been received. We will contact you shortly.';
    form.reset();
  });
})();