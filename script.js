// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Load saved theme preference or default to dark mode
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
  htmlElement.classList.add('light-mode');
  if (themeToggle) themeToggle.textContent = '☀️';
}

// Theme toggle event listener
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('light-mode');
    const isLightMode = htmlElement.classList.contains('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    themeToggle.textContent = isLightMode ? '☀️' : '🌙';
  });
}

const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    navToggle.classList.toggle('active');
  });
}

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener('click', (event) => {
    const parent = toggle.closest('.nav-item');
    if (parent) {
      event.preventDefault();
      parent.classList.toggle('open');
      const expanded = parent.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    }
  });
});

window.addEventListener('click', (event) => {
  const insideDropdown = event.target.closest('.nav-item');
  if (!insideDropdown && mainNav) {
    document.querySelectorAll('.nav-item.open').forEach((item) => item.classList.remove('open'));
  }
});

const scrollLinks = document.querySelectorAll('a[href^="#"]');
scrollLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (targetId.length > 1) {
      event.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
      }
    }
  });
});

const cardRows = document.querySelectorAll('.conference-row');
cardRows.forEach((row) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'card-section-wrap';

  const leftArrow = document.createElement('div');
  leftArrow.className = 'arrow-btn left';
  leftArrow.setAttribute('aria-label', 'Scroll left');
  leftArrow.setAttribute('role', 'button');
  leftArrow.setAttribute('tabindex', '0');
  leftArrow.innerHTML = '<div class="arrow">‹</div>';

  const rightArrow = document.createElement('div');
  rightArrow.className = 'arrow-btn right';
  rightArrow.setAttribute('aria-label', 'Scroll right');
  rightArrow.setAttribute('role', 'button');
  rightArrow.setAttribute('tabindex', '0');
  rightArrow.innerHTML = '<div class="arrow">›</div>';

  row.parentNode.insertBefore(wrapper, row);
  wrapper.appendChild(leftArrow);
  wrapper.appendChild(row);
  wrapper.appendChild(rightArrow);

  const scrollAmount = () => Math.min(row.clientWidth * 0.85, 320);

  const scrollRow = (direction) => {
    row.scrollBy({ left: direction * scrollAmount(), behavior: 'smooth' });
  };

  leftArrow.addEventListener('click', () => scrollRow(-1));
  rightArrow.addEventListener('click', () => scrollRow(1));

  [leftArrow, rightArrow].forEach((arrow) => {
    arrow.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        arrow.click();
      }
    });
  });
});

// AI Assistant functionality
const assistantBtn = document.querySelector('.assistant-btn');
if (assistantBtn) {
  assistantBtn.addEventListener('click', () => {
    // Collect page content for AI
    const pageContent = document.body.innerText;
    const pageTitle = document.title;
    const url = window.location.href;
    
    // For now, show an alert with collected info
    alert(`AI Assistant activated!\n\nPage: ${pageTitle}\nURL: ${url}\nContent length: ${pageContent.length} characters\n\nThis AI can answer questions about the content on this page.`);
  });
}
