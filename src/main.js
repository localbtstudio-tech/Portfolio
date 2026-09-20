import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.css';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.05,
  smoothWheel: true,
  syncTouch: false,
  lerp: 0.09
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover: none)').matches;

if (!reduceMotion) {
  // Hero entrance
  const heroTimeline = gsap.timeline({ defaults: { ease: 'power4.out' } });
  heroTimeline
    .from('.site-header', { y: -30, opacity: 0, duration: 0.85, delay: 0.1 })
    .from('.hero-kicker', { y: 30, opacity: 0, duration: 0.7 }, '-=0.35')
    .from('.hero-word', { yPercent: 110, rotate: 5, opacity: 0, duration: 1, stagger: 0.12 }, '-=0.45')
    .from('.hero-bottom', { y: 25, opacity: 0, duration: 0.7 }, '-=0.45')
    .from('.hero-floating', { opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.25');

  // Hero scroll composition
  gsap.to('.hero-word.word-1', {
    xPercent: -24,
    rotate: -3,
    scale: 0.94,
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
  });
  gsap.to('.hero-word.word-2', {
    xPercent: 18,
    rotate: 2,
    scale: 0.9,
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.1 }
  });
  gsap.to('.hero-word.word-3', {
    xPercent: 8,
    scale: 1.07,
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.25 }
  });
  gsap.to('.hero-orb-a', { yPercent: -65, xPercent: 20, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 } });
  gsap.to('.hero-orb-b', { yPercent: -30, xPercent: -18, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.3 } });
  gsap.to('.hero-grid', { yPercent: 16, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 2 } });

  // General reveals
  gsap.utils.toArray('.reveal-up').forEach((el) => {
    gsap.from(el, {
      y: 70,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  // About typography
  gsap.from('.split-heading', {
    yPercent: 15,
    opacity: 0,
    duration: 1.1,
    scrollTrigger: { trigger: '.about', start: 'top 72%', once: true }
  });
  gsap.to('.about', {
    '--about-blob-x': '90%',
    scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: 1 }
  });

  // Floating skills
  gsap.utils.toArray('.skill-pill').forEach((pill, i) => {
    gsap.fromTo(pill,
      { y: 50 + (i % 3) * 12, opacity: 0, rotation: -i % 2 ? -4 : 4 },
      {
        y: 0,
        opacity: 1,
        rotation: i % 2 ? 2 : -2,
        duration: 0.9,
        delay: i * 0.03,
        ease: 'back.out(1.2)',
        scrollTrigger: { trigger: '.skills-cloud', start: 'top 78%', once: true }
      }
    );
  });
  gsap.to('.skills-cloud', { xPercent: 1.5, yPercent: -3, scrollTrigger: { trigger: '.skills', start: 'top bottom', end: 'bottom top', scrub: 1 } });
  gsap.to('.marquee-track', { xPercent: -22, ease: 'none', scrollTrigger: { trigger: '.skills-marquee', start: 'top bottom', end: 'bottom top', scrub: 1 } });

  // Project stage: each panel pins and animates out as next arrives
  const panels = gsap.utils.toArray('.project-panel');
  panels.forEach((panel, index) => {
    const copy = panel.querySelector('.project-copy');
    const visual = panel.querySelector('.project-visual');
    const meta = panel.querySelector('.project-meta');

    gsap.fromTo(copy, { y: 80, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1,
      scrollTrigger: { trigger: panel, start: 'top 70%', once: true }
    });
    gsap.fromTo(visual, { scale: 0.82, rotate: index === 0 ? 2 : -2, opacity: 0 }, {
      scale: 1, rotate: 0, opacity: 1, duration: 1.15, ease: 'power3.out',
      scrollTrigger: { trigger: panel, start: 'top 72%', once: true }
    });
    gsap.from(meta, { y: -15, opacity: 0, duration: 0.7, scrollTrigger: { trigger: panel, start: 'top 78%', once: true } });

    if (index < panels.length - 1) {
      gsap.to(panel, {
        scale: 0.9,
        opacity: 0.55,
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: panel,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }
  });

  gsap.to('.noire-card-a', { yPercent: -12, xPercent: 4, rotate: -4, scrollTrigger: { trigger: '.project-noire', start: 'top bottom', end: 'bottom top', scrub: 1.4 } });
  gsap.to('.noire-card-b', { yPercent: 13, xPercent: -5, rotate: 5, scrollTrigger: { trigger: '.project-noire', start: 'top bottom', end: 'bottom top', scrub: 1.7 } });
  gsap.to('.noire-sun', { scale: 1.3, xPercent: -12, yPercent: 6, scrollTrigger: { trigger: '.project-noire', start: 'top bottom', end: 'bottom top', scrub: 1.5 } });

  gsap.to('.archive-card', { y: -14, rotate: 0.5, scrollTrigger: { trigger: '.archive-tease', start: 'top bottom', end: 'bottom top', scrub: 1 } });

  gsap.from('.contact-title', { yPercent: 20, opacity: 0, duration: 1.2, scrollTrigger: { trigger: '.contact', start: 'top 70%', once: true } });

  // Background color progression
  gsap.to(document.body, {
    backgroundColor: '#f3f7ff',
    scrollTrigger: { trigger: '.skills', start: 'top 55%', end: 'bottom 35%', scrub: 1 }
  });
  gsap.to(document.body, {
    backgroundColor: '#fff7ea',
    scrollTrigger: { trigger: '.work', start: 'top 55%', end: 'bottom 40%', scrub: 1 }
  });
  gsap.to(document.body, {
    backgroundColor: '#fffdf7',
    scrollTrigger: { trigger: '.contact', start: 'top 60%', end: 'bottom top', scrub: 1 }
  });
}

// Progress indicator
const progress = document.querySelector('.scroll-progress span');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max ? (window.scrollY / max) * 100 : 0;
  progress.style.width = `${pct}%`;
}, { passive: true });

// Active nav and hover states
const sections = ['about', 'skills', 'work', 'contact'].map((id) => document.getElementById(id));
const navLinks = [...document.querySelectorAll('.nav-link')];
const observer = new IntersectionObserver((entries) => {
  const visible = entries.find((entry) => entry.isIntersecting);
  if (!visible) return;
  navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`));
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
sections.forEach((section) => section && observer.observe(section));

if (!isTouch) {
  document.addEventListener('pointermove', (e) => {
    gsap.to('.cursor-dot', { x: e.clientX, y: e.clientY, duration: 0.15, overwrite: true });
    gsap.to('.cursor-ring', { x: e.clientX, y: e.clientY, duration: 0.45, ease: 'power3.out', overwrite: true });
  });

  document.querySelectorAll('.magnetic').forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-active');
      gsap.to(el, { x: 0, y: 0, duration: 0.45, ease: 'elastic.out(1, .35)' });
    });
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.18;
      gsap.to(el, { x, y, duration: 0.35, ease: 'power2.out', overwrite: true });
    });
  });
}

// Smooth anchor navigation
for (const anchor of document.querySelectorAll('a[href^="#"]')) {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: -24, duration: 1.25 });
  });
}

window.addEventListener('load', () => ScrollTrigger.refresh());
