/* =============================================
   SMARTED – script.js
   ============================================= */

'use strict';

/* ===== BOOK DEMO MODAL ===== */
(function () {
  const overlay = document.getElementById('demoModal');
  const closeBtn = document.getElementById('modalClose');
  const triggers = document.querySelectorAll('.open-demo');

  function openModal() {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Focus first input
    setTimeout(() => {
      const first = overlay.querySelector('input, select, textarea');
      if (first) first.focus();
    }, 350);
  }

  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggers.forEach(btn => btn.addEventListener('click', openModal));
  closeBtn.addEventListener('click', closeModal);

  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
  });
})();

/* ===== FORM VALIDATION & WHATSAPP SUBMIT ===== */
(function () {
  const form = document.getElementById('demoForm');
  if (!form) return;

  const WHATSAPP_NUMBER = '918604015058'; // Change to your WhatsApp number

  const fields = {
    fullName: { el: document.getElementById('fullName'), err: document.getElementById('fullNameError') },
    phone: { el: document.getElementById('phone'), err: document.getElementById('phoneError') },
    email: { el: document.getElementById('email'), err: document.getElementById('emailError') },
    schoolName: { el: document.getElementById('schoolName'), err: document.getElementById('schoolNameError') },
    students: { el: document.getElementById('students'), err: document.getElementById('studentsError') },
  };

  function setError(key, msg) {
    fields[key].el.classList.add('error');
    fields[key].err.textContent = msg;
  }

  function clearError(key) {
    fields[key].el.classList.remove('error');
    fields[key].err.textContent = '';
  }

  function validateEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function validatePhone(v) {
    return /^[\d\s\+\-\(\)]{7,15}$/.test(v.trim());
  }

  // Real-time clearing
  Object.keys(fields).forEach(key => {
    fields[key].el.addEventListener('input', () => clearError(key));
    fields[key].el.addEventListener('change', () => clearError(key));
  });

 form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  const name = fields.fullName.el.value.trim();
  const phone = fields.phone.el.value.trim();
  const email = fields.email.el.value.trim();
  const school = fields.schoolName.el.value.trim();
  const students = fields.students.el.value;
  const message = document.getElementById('message').value.trim();

  if (!name) { setError('fullName', 'Full name is required'); valid = false; }
  if (!phone) { setError('phone', 'Phone number is required'); valid = false; }
  else if (!validatePhone(phone)) { setError('phone', 'Enter a valid phone number'); valid = false; }
  if (!email) { setError('email', 'Email address is required'); valid = false; }
  else if (!validateEmail(email)) { setError('email', 'Enter a valid email address'); valid = false; }
  if (!school) { setError('schoolName', 'School name is required'); valid = false; }
  if (!students) { setError('students', 'Please select number of students'); valid = false; }

  if (!valid) return;

  // 🔥 Professional WhatsApp message
  const waMsg = [
    `🚀 SMARTED Demo Request`,
    ``,
    `👤 Name: ${name}`,
    `🏫 School: ${school}`,
    `📊 Students: ${students}`,
    `📧 Email: ${email}`,
    `📞 Phone: ${phone}`,
    message ? `💬 Message: ${message}` : '',
    ``,
    `🔐 Data is secure and used only for demo purpose.`
  ].filter(Boolean).join('\n');

  const waURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`;

  // 🔥 Email backup (IMPORTANT)
  const emailSubject = "SMARTED Demo Request";
  const emailBody = waMsg;

  const mailURL = `mailto:smartedsystemss@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  // 🔥 Save lead locally
  localStorage.setItem("smarted_lead", JSON.stringify({
    name, phone, email, school, students
  }));

  // Button loading state
  const btn = document.getElementById('submitBtn');
  const btnText = btn.querySelector('.btn-text');
  const btnLoading = btn.querySelector('.btn-loading');

  btn.disabled = true;
  btnText.style.display = 'none';
  btnLoading.style.display = '';

  setTimeout(() => {
    // WhatsApp open
   window.open(waURL, '_blank');

// optional fallback (only if WhatsApp not used)
// window.location.href = mailURL;

    // Success message
    btnText.innerText = "Request Sent!";

    // Reset button
    btn.disabled = false;
    btnText.style.display = '';
    btnLoading.style.display = 'none';

    // Reset form
    form.reset();

    // Close modal
    setTimeout(() => {
      document.getElementById('demoModal').classList.remove('active');
      document.body.style.overflow = '';
    }, 500);

  }, 800);
});
})();
/* ===== NAVBAR SCROLL ===== */
(function () {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });
})();

/* ===== HAMBURGER MENU ===== */
(function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
})();

/* ===== SCROLL REVEAL (Intersection Observer) ===== */
(function () {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger children of feature grids
          const delay = entry.target.dataset.delay
            ? parseInt(entry.target.dataset.delay)
            : 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  reveals.forEach(el => observer.observe(el));
})();

/* ===== STAGGERED FEATURE CARDS ===== */
(function () {
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.feature-card');
          cards.forEach((card, index) => {
            const baseDelay = card.dataset.delay ? parseInt(card.dataset.delay) : 0;
            const stagger = index * 60;
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, baseDelay + stagger);
          });
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
  );

  document.querySelectorAll('.feature-grid').forEach(grid => {
    // Initially hide cards
    grid.querySelectorAll('.feature-card').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    cardObserver.observe(grid);
  });
})();

/* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = document.getElementById('navbar').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();

/* ===== RIPPLE EFFECT ON BUTTONS ===== */
(function () {
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height) * 2;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px; height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        left: ${x}px; top: ${y}px;
        pointer-events: none;
        animation: rippleAnim 0.6s ease-out forwards;
      `;

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  // Inject ripple animation keyframe
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleAnim {
      0% { transform: scale(0); opacity: 1; }
      100% { transform: scale(1); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
})();

/* ===== ANIMATED COUNTERS ===== */
(function () {
  function animateCounter(el, from, to, duration, suffix = '') {
    const start = performance.now();
    const update = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(from + (to - from) * eased);
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  const statsEl = document.querySelector('.hero-stats');
  if (!statsEl) return;

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const nums = entry.target.querySelectorAll('.stat-num');
          const targets = [
            { el: nums[0], from: 0, to: 5, suffix: '+' },
            { el: nums[1], from: 0, to: 1000, suffix: '+' },
            { el: nums[2], from: 90, to: 99.9, suffix: '%', float: true }
          ];
          targets.forEach(({ el, from, to, suffix, float }) => {
            if (!el) return;
            if (float) {
              // Handle decimal
              const start = performance.now();
              const duration = 1500;
              const update = (time) => {
                const progress = Math.min((time - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = (from + (to - from) * eased).toFixed(1);
                el.textContent = current + suffix;
                if (progress < 1) requestAnimationFrame(update);
              };
              requestAnimationFrame(update);
            } else {
              animateCounter(el, from, to, 1500, suffix);
            }
          });
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statsObserver.observe(statsEl);
})();

/* ===== ACTIVE NAV HIGHLIGHT ON SCROLL ===== */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(section => sectionObserver.observe(section));

  // Style for active nav
  const style = document.createElement('style');
  style.textContent = `.nav-links a.active { color: var(--black) !important; font-weight: 600; }`;
  document.head.appendChild(style);
})();

/* ===== TYPING ANIMATION IN HERO ===== */
(function () {
  const headline = document.querySelector('.hero-headline');
  if (!headline) return;

  // Subtle blink on load
  headline.style.opacity = '0';
  headline.style.transform = 'translateY(20px)';
  headline.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';
  requestAnimationFrame(() => {
    headline.style.opacity = '1';
    headline.style.transform = 'translateY(0)';
  });
})();

/* ===== DASHBOARD BAR ANIMATION ===== */
(function () {
  const dashboard = document.querySelector('.full-dashboard');
  if (!dashboard) return;

  const bars = dashboard.querySelectorAll('.fd-bar');
  const hFills = dashboard.querySelectorAll('.fd-hfill');

  // Store real heights and reset
  const realHeights = [];
  bars.forEach(bar => {
    realHeights.push(bar.style.getPropertyValue('--h'));
    bar.style.setProperty('--h', '0%');
    bar.style.transition = 'height 1s cubic-bezier(0.4, 0, 0.2, 1)';
  });

  const realWidths = [];
  hFills.forEach(fill => {
    realWidths.push(fill.style.width);
    fill.style.width = '0%';
    fill.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
  });

  const dbObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          bars.forEach((bar, i) => {
            setTimeout(() => {
              bar.style.setProperty('--h', realHeights[i]);
            }, i * 100);
          });
          hFills.forEach((fill, i) => {
            setTimeout(() => {
              fill.style.width = realWidths[i];
            }, 300 + i * 150);
          });
          dbObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  dbObserver.observe(dashboard);
})();

/* ===== MOCKUP BAR ANIMATION ===== */
(function () {
  const mockup = document.querySelector('.dashboard-mockup');
  if (!mockup) return;

  const bars = mockup.querySelectorAll('.bar');
  const realHeights = [];
  bars.forEach(bar => {
    realHeights.push(bar.style.getPropertyValue('--h'));
    bar.style.setProperty('--h', '0%');
    bar.style.transition = 'height 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
  });

  const mockupObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          bars.forEach((bar, i) => {
            setTimeout(() => {
              bar.style.setProperty('--h', realHeights[i]);
            }, 400 + i * 80);
          });
          mockupObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  mockupObserver.observe(mockup);
})();

/* ===== AI SECTION CHAT ANIMATION ===== */
(function () {
  const chatMsgs = document.querySelectorAll('.chat-msg');
  if (!chatMsgs.length) return;

  chatMsgs.forEach(msg => {
    msg.style.opacity = '0';
    msg.style.transform = 'translateX(-10px)';
    msg.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  });

  const chatObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const msgs = entry.target.querySelectorAll('.chat-msg');
          msgs.forEach((msg, i) => {
            setTimeout(() => {
              msg.style.opacity = '1';
              msg.style.transform = 'translateX(0)';
            }, 300 + i * 400);
          });
          chatObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.ai-chat-demo').forEach(demo => chatObserver.observe(demo));
})();

/* ===== PREDICTION BARS ANIMATION ===== */
(function () {
  const fills = document.querySelectorAll('.p-fill');
  const realWidths = [];

  fills.forEach(fill => {
    realWidths.push(fill.style.width);
    fill.style.width = '0';
    fill.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
  });

  const pObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fills.forEach((fill, i) => {
            setTimeout(() => {
              fill.style.width = realWidths[i];
            }, 300 + i * 200);
          });
          pObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const predictSection = document.querySelector('.ai-predict-demo');
  if (predictSection) pObserver.observe(predictSection);
})();

/* ===== GRAPH BAR ANIMATIONS ===== */
(function () {
  const gBars = document.querySelectorAll('.g-bar');
  const realWidths = [];

  gBars.forEach(bar => {
    const computed = getComputedStyle(bar).getPropertyValue('--w').trim();
    realWidths.push(computed);
    bar.style.setProperty('--w', '0%');
  });

  const gObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gBars.forEach((bar, i) => {
            setTimeout(() => {
              bar.style.transition = '--w 1s ease';
              bar.style.setProperty('--w', realWidths[i]);
              bar.style.setProperty('transition', 'all 1s ease');
            }, 200 + i * 150);
          });
          gObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  const graphSection = document.querySelector('.ai-graph-demo');
  if (graphSection) gObserver.observe(graphSection);
})();

/* ===== PARALLAX ON HERO ===== */
(function () {
  const hero = document.querySelector('.hero');
  const grid = document.querySelector('.hero-bg-grid');
  if (!hero || !grid) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < hero.offsetHeight) {
      grid.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  }, { passive: true });
})();

/* ===== CTA SHAPE FLOATING ===== */
(function () {
  const shapes = document.querySelectorAll('.cta-shape');
  shapes.forEach((shape, i) => {
    shape.style.animation = `ctaFloat ${6 + i * 2}s ease-in-out infinite ${i * 1.5}s`;
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes ctaFloat {
      0%, 100% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(${Math.random() > 0.5 ? '' : '-'}20px, -20px) scale(1.05); }
    }
  `;
  document.head.appendChild(style);
})();

/* ===== MINI CARD HOVER TILT ===== */
(function () {
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${y * -6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ===== INIT LOG ===== */
console.log('%cSMARTED 🚀', 'color: #2563EB; font-size: 20px; font-weight: bold;');
console.log('%cPowered by Modern Web Tech', 'color: #64748b; font-size: 12px;');
