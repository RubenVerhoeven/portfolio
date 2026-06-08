document.addEventListener('DOMContentLoaded', function() {

  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const hamburger = document.getElementById('hamburger');
  const navOverlay = document.getElementById('navOverlay');
  if (hamburger && navOverlay) {
    hamburger.addEventListener('click', function() {
      const isOpen = navOverlay.classList.contains('active');
      if (isOpen) {
        navOverlay.classList.remove('active');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      } else {
        navOverlay.classList.add('active');
        hamburger.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  const cursor = document.getElementById('cursor');
  if (cursor) {
    document.addEventListener('mousemove', function(e) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    document.addEventListener('mouseenter', function() {
      cursor.style.opacity = '1';
    });
    document.addEventListener('mouseleave', function() {
      cursor.style.opacity = '0';
    });
  }

  const followImg = document.getElementById('followImg');
  const followImgEl = document.getElementById('followImgEl');
  const serviceItems = document.querySelectorAll('.service-item');

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  if (followImg) {
    function animateFollow() {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;
      followImg.style.left = currentX + 'px';
      followImg.style.top = currentY + 'px';
      requestAnimationFrame(animateFollow);
    }
    animateFollow();

    serviceItems.forEach(function(item) {
      item.addEventListener('mouseenter', function() {
        const img = item.querySelector('.service-hover-img');
        if (img) {
          followImgEl.src = img.src;
          followImg.classList.add('visible');
        }
      });
      item.addEventListener('mouseleave', function() {
        followImg.classList.remove('visible');
      });
    });
  }

const animateEls = document.querySelectorAll('main *:not(script):not(style):not(.slider-section):not(.slider-track):not(.slide):not(.slide *):not(.pill-hover-img):not(.pill-follow-img):not(.pill-follow-img *):not(.title-overlay):not(.service-hover-img):not(.service-follow-img):not(.service-follow-img *):not(.skill-icon):not(.skill-icon *), .site-footer');
  
  const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
          }
      });
  }, {
      threshold: 0,
      rootMargin: '0px 0px -40px 0px'
  });

  animateEls.forEach(function(el) {
      el.classList.add('animate-in');
      setTimeout(() => observer.observe(el), 100);
  });

  const titleOverlay = document.querySelector('.title-overlay');
if (titleOverlay) {
    titleOverlay.classList.add('animate-in');
    setTimeout(() => observer.observe(titleOverlay), 100);
}

  const pillFollowImg = document.getElementById('pillFollowImg');
  const pillFollowImgEl = document.getElementById('pillFollowImgEl');
  const pills = document.querySelectorAll('.pill[data-follow]');

  let pillMouseX = 0, pillMouseY = 0;
  let pillCurrentX = 0, pillCurrentY = 0;

  document.addEventListener('mousemove', function(e) {
    pillMouseX = e.clientX;
    pillMouseY = e.clientY;
  });

  if (pillFollowImg) {
    function animatePillFollow() {
      pillCurrentX += (pillMouseX - pillCurrentX) * 0.08;
      pillCurrentY += (pillMouseY - pillCurrentY) * 0.08;
      pillFollowImg.style.left = pillCurrentX + 'px';
      pillFollowImg.style.top = pillCurrentY + 'px';
      requestAnimationFrame(animatePillFollow);
    }
    animatePillFollow();

    pills.forEach(function(pill) {
      pill.addEventListener('mouseenter', function() {
        const img = pill.querySelector('.pill-hover-img');
        if (img) {
          pillFollowImgEl.src = img.src;
          pillFollowImg.classList.add('visible');
        }
      });
      pill.addEventListener('mouseleave', function() {
        pillFollowImg.classList.remove('visible');
      });
    });
  }

  const sliderTrack = document.querySelector('.slider-track');
  if (sliderTrack) {
  const basePixelsPerSec = 80;
  const fastPixelsPerSec = 150;

    let currentSpeed = basePixelsPerSec;
    let targetSpeed = basePixelsPerSec;
    let sliderPos = 0;
    let lastTime = null;
    let scrollTimer;

    function getHalfWidth() {
      return sliderTrack.scrollWidth / 2;
    }

    function tickSlider(timestamp) {
      if (!lastTime) lastTime = timestamp;
      const delta = (timestamp - lastTime) / 1000;
      lastTime = timestamp;

      currentSpeed += (targetSpeed - currentSpeed) * 0.06;
      sliderPos += currentSpeed * delta;

      const half = getHalfWidth();
      if (sliderPos >= half) sliderPos -= half;

      sliderTrack.style.transform = 'translateX(-' + sliderPos + 'px)';
      requestAnimationFrame(tickSlider);
    }

    requestAnimationFrame(tickSlider);

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const sliderSection = document.querySelector('.slider-section');
      if (!sliderSection) return;
      const rect = sliderSection.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      if (inView) {
        const scrollDelta = Math.abs(window.scrollY - lastScrollY);
        targetSpeed = basePixelsPerSec + scrollDelta * 20;
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          targetSpeed = basePixelsPerSec;
        }, 150);
      }

      lastScrollY = window.scrollY;
    });
  }

});

const scrollHint = document.querySelector('.scroll-hint');
if (scrollHint) {
    scrollHint.classList.add('animate-in');
    const scrollHintObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollHintObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0,
        rootMargin: '0px 0px 0px 0px'
    });
    setTimeout(() => scrollHintObserver.observe(scrollHint), 100);
}

const backBtn = document.querySelector('.back-btn');
if (backBtn) {
    const referrer = document.referrer;
    if (referrer.includes('index.html') || referrer.endsWith('/')) {
        backBtn.href = 'index.html';
    } else {
        backBtn.href = 'work.html';
    }
}

document.querySelectorAll('.toggle-btn').forEach(function(btn) {
    const target = document.getElementById(btn.dataset.target);
    if (!target) return;
    btn.addEventListener('click', function() {
        const isOpen = target.classList.contains('open');
        target.classList.toggle('open');
        btn.textContent = isOpen ? btn.dataset.open : btn.dataset.close;
    });
});