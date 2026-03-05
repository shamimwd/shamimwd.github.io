/* ============================================================
   SHAMIM AHSAN PORTFOLIO — script.js v2
   ============================================================ */
'use strict';

/* ============================================================ SECURITY */
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && ['c','u','s','a','p','j'].includes(e.key.toLowerCase())) e.preventDefault();
  if (['F12','F5'].includes(e.key)) e.preventDefault();
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['i','j','c'].includes(e.key.toLowerCase())) e.preventDefault();
});
document.addEventListener('dragstart', e => e.preventDefault());
document.addEventListener('copy',  e => e.preventDefault());
document.addEventListener('cut',   e => e.preventDefault());

/* ============================================================ CURSOR GLOW */
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});

/* ============================================================ NAVBAR SCROLL */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ============================================================ MOBILE MENU */
const menuBtn    = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('open');
  });
});

/* ============================================================ LANGUAGE TOGGLE */
let lang = 'bn';
const langToggle = document.getElementById('langToggle');
const langLabel  = document.getElementById('langLabel');

function applyLang(l) {
  document.querySelectorAll('[data-' + l + ']').forEach(el => {
    const t = el.getAttribute('data-' + l);
    if (t) el.textContent = t;
  });
  document.documentElement.lang = l === 'bn' ? 'bn' : 'en';
}

langToggle.addEventListener('click', () => {
  lang = lang === 'bn' ? 'en' : 'bn';
  langLabel.textContent = lang === 'bn' ? 'EN' : 'বাং';
  applyLang(lang);
});

/* ============================================================ INTERSECTION OBSERVERS */
function makeObserver(selector, stagger = 0) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0) || (stagger ? i * stagger : 0);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll(selector).forEach(el => obs.observe(el));
}

makeObserver('.timeline-item',  80);
makeObserver('.about-card',     0);   // delay from data-delay attr
makeObserver('.skill-category', 70);
makeObserver('.project-card',   100);

/* Skill bar fill */
const barObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(fill => {
        const w = fill.dataset.width;
        if (w) setTimeout(() => { fill.style.width = w + '%'; }, 280);
      });
      barObs.unobserve(entry.target);
    }
  });
}, { threshold: .15 });
document.querySelectorAll('.skill-category').forEach(el => barObs.observe(el));

/* ============================================================ ACTIVE NAV ON SCROLL */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const secObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        const active = link.getAttribute('href') === '#' + id;
        link.classList.toggle('active', active);
      });
    }
  });
}, { threshold: .35 });
sections.forEach(s => secObs.observe(s));

/* ============================================================ SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const id = anchor.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - (navbar.offsetHeight + 8);
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ============================================================ PROFILE HOVER */
const profileOuter = document.querySelector('.profile-outer-ring');
if (profileOuter) {
  profileOuter.addEventListener('mouseenter', () => {
    profileOuter.style.boxShadow = '0 0 80px rgba(201,168,76,.45), 0 0 160px rgba(201,168,76,.15)';
  });
  profileOuter.addEventListener('mouseleave', () => {
    profileOuter.style.boxShadow = '';
  });
}

/* ============================================================ CONSOLE MSG */
console.log('%c⛔ সতর্কতা', 'color:#c9a84c;font-size:2rem;font-weight:bold;');
console.log('%cএই ওয়েবসাইটের কন্টেন্ট কপিরাইট সংরক্ষিত। অননুমতিপ্রাপ্ত ব্যবহার নিষিদ্ধ।', 'color:#888;font-size:.85rem;');
