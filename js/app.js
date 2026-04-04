// ============================================
// ACADEMIC PORTFOLIO — Nazeer Haider
// Vanilla JS — No jQuery dependency
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Navbar Scroll Effect ----------
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');
  const heroScrollIndicator = document.querySelector('.hero-scroll-indicator');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (backToTop) {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }

    // Hide scroll indicator after scrolling
    if (heroScrollIndicator) {
      heroScrollIndicator.style.opacity = window.scrollY > 100 ? '0' : '';
      heroScrollIndicator.style.transition = 'opacity 0.4s ease';
    }
  });

  // ---------- Back to Top ----------
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- Mobile Navigation ----------
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
      if (navOverlay) navOverlay.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      navOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close mobile nav when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // ---------- Smooth Scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---------- Active Nav Link Highlighting ----------
  const sections = document.querySelectorAll('.section[id]');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 150;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === '#' + sectionId) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  // ---------- Copy Email to Clipboard ----------
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const emailContact = document.getElementById('emailContact');
  if (copyEmailBtn && emailContact) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailContact.textContent)
        .then(() => {
          const originalHTML = copyEmailBtn.innerHTML;
          copyEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
          copyEmailBtn.style.color = '#64ffda'; // Highlight color
          setTimeout(() => {
            copyEmailBtn.innerHTML = originalHTML;
            copyEmailBtn.style.color = '';
          }, 2000);
        })
        .catch(err => {
          console.error("Failed to copy email: ", err);
        });
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  // ---------- Scroll Animations (IntersectionObserver) ----------
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));

  // ---------- Hero Typing Effect ----------
  const typingElement = document.querySelector('.typing-text');
  if (typingElement) {
    const phrases = [
      'Computer Vision',
      'Agricultural Imaging',
      'Medical Imaging'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1500);
  }

  // ---------- Achievement Collapsible ----------
  document.querySelectorAll('.achievement-category-header').forEach(header => {
    header.addEventListener('click', () => {
      const list = header.nextElementSibling;
      const toggle = header.querySelector('.achievement-toggle');

      if (list.classList.contains('collapsed')) {
        list.classList.remove('collapsed');
        list.style.maxHeight = list.scrollHeight + 'px';
        if (toggle) toggle.classList.remove('rotated');
      } else {
        list.classList.add('collapsed');
        list.style.maxHeight = '0px';
        if (toggle) toggle.classList.add('rotated');
      }
    });
  });

  // ---------- Staggered animation delays ----------
  document.querySelectorAll('.research-card, .teaching-card, .project-card, .skill-category').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });
  // ---------- Theme Toggle ----------
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme') || 'dark';

  if (storedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeToggle) {
      themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
      }
    });
  }

});