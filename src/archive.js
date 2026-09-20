import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.css';

gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({ duration: 1.05, smoothWheel: true, lerp: 0.09 });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) {
  gsap.from('.site-header', { y: -25, opacity: 0, duration: 0.8 });
  gsap.from('.archive-title', { yPercent: 35, opacity: 0, duration: 1.1, delay: 0.15, ease: 'power4.out' });
  gsap.from('.archive-hero-copy', { y: 30, opacity: 0, duration: 0.8, delay: 0.35 });
  gsap.utils.toArray('.archive-item').forEach((item, i) => {
    gsap.from(item, {
      y: 70,
      opacity: 0,
      duration: 0.75,
      delay: (i % 4) * 0.05,
      ease: 'power3.out',
      scrollTrigger: { trigger: item, start: 'top 88%', once: true }
    });
    gsap.to(item, {
      x: i % 2 === 0 ? 8 : -8,
      scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: 1.4 }
    });
  });
  gsap.from('.archive-card-big', { scale: 0.92, opacity: 0, duration: 1, scrollTrigger: { trigger: '.archive-cta', start: 'top 78%', once: true } });
}

const progress = document.querySelector('.scroll-progress span');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max ? (window.scrollY / max) * 100 : 0}%`;
}, { passive: true });

const isTouch = window.matchMedia('(hover: none)').matches;
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
      const r = el.getBoundingClientRect();
      gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.16, y: (e.clientY - r.top - r.height / 2) * 0.16, duration: 0.3, overwrite: true });
    });
  });
}

window.addEventListener('load', () => ScrollTrigger.refresh());
