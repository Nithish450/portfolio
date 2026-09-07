/**
 * NITHISH G - PROFESSIONAL SOFTWARE DEVELOPER PORTFOLIO
 * High-performance Vanilla JavaScript SPA Controller
 */

(function () {
  'use strict';

  // Allowed SPA section identifiers
  const VALID_SECTIONS = [
    'home',
    'personal',
    'skills',
    'experience',
    'projects',
    'education',
    'certifications',
    'contact'
  ];

  // Section titles for dynamic document title updates
  const SECTION_TITLES = {
    home: 'Software Developer Portfolio',
    personal: 'Personal Information',
    skills: 'Technical Skills & Competencies',
    experience: 'Work Experience',
    projects: 'Featured Projects',
    education: 'Academic Background',
    certifications: 'Professional Certifications',
    contact: "Contact & Let's Build"
  };

  // Cached DOM References
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const primaryNav = document.getElementById('primary-nav');
  const contactForm = document.getElementById('contact-form');
  const contactStatusBanner = document.getElementById('contact-status-banner');
  const currentYearSpan = document.getElementById('current-year');

  /**
   * Set current year in footer
   */
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  /**
   * Retrieve active section from URL hash
   * @returns {string} valid section id
   */
  function getSectionFromHash() {
    const hash = window.location.hash.replace(/^#/, '').toLowerCase().trim();
    if (VALID_SECTIONS.includes(hash)) {
      return hash;
    }
    return 'home';
  }

  /**
   * Activate target section and hide all other sections
   * @param {string} targetSectionId
   */
  function switchSection(targetSectionId) {
    const validId = VALID_SECTIONS.includes(targetSectionId) ? targetSectionId : 'home';

    // 1. Update Section Visibility
    sections.forEach((section) => {
      if (section.id === validId) {
        section.classList.add('active');
        section.removeAttribute('hidden');
      } else {
        section.classList.remove('active');
        section.setAttribute('hidden', 'true');
      }
    });

    // 2. Update Primary Navigation Links
    navLinks.forEach((link) => {
      const sectionAttr = link.getAttribute('data-section');
      if (sectionAttr === validId) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });

    // 3. Update Document Title
    const subtitle = SECTION_TITLES[validId] || 'Software Developer';
    document.title = `Nithish G | ${subtitle}`;

    // 4. Smooth scroll back to top of main area
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // 5. Close mobile navigation if open
    closeMobileMenu();
  }

  /**
   * Hash router listener
   */
  function handleHashChange() {
    const targetSection = getSectionFromHash();
    switchSection(targetSection);
  }

  /**
   * Mobile Menu Controls
   */
  function toggleMobileMenu() {
    if (!primaryNav || !mobileToggle) return;
    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    const newState = !isExpanded;

    mobileToggle.setAttribute('aria-expanded', String(newState));
    primaryNav.classList.toggle('open', newState);
  }

  function closeMobileMenu() {
    if (!primaryNav || !mobileToggle) return;
    mobileToggle.setAttribute('aria-expanded', 'false');
    primaryNav.classList.remove('open');
  }

  // Toggle button event
  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }

  // Close mobile menu on Escape key press
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && primaryNav && primaryNav.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // Close mobile menu when clicking outside of header
  document.addEventListener('click', (event) => {
    if (
      primaryNav &&
      primaryNav.classList.contains('open') &&
      !event.target.closest('#site-header')
    ) {
      closeMobileMenu();
    }
  });

  /**
   * Delegated navigation clicks for internal SPA links
   */
  document.addEventListener('click', (event) => {
    const targetLink = event.target.closest('a[href^="#"]');
    if (!targetLink) return;

    const href = targetLink.getAttribute('href');
    if (!href || href === '#') return;

    const targetSectionId = href.substring(1);
    if (VALID_SECTIONS.includes(targetSectionId)) {
      // If clicking already current hash, manually ensure section is rendered
      if (window.location.hash === href) {
        switchSection(targetSectionId);
      }
      // Otherwise setting location.hash will trigger hashchange
    }
  });

  /**
   * Contact Form Mailto Handler
   * Strictly adheres to no-fake-backend principle.
   */
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      const messageError = document.getElementById('message-error');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameError.classList.add('visible');
        nameInput.focus();
        isValid = false;
      } else {
        nameError.classList.remove('visible');
      }

      // Validate Email (standard regex)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailError.classList.add('visible');
        if (isValid) emailInput.focus();
        isValid = false;
      } else {
        emailError.classList.remove('visible');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageError.classList.add('visible');
        if (isValid) messageInput.focus();
        isValid = false;
      } else {
        messageError.classList.remove('visible');
      }

      if (!isValid) return;

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const userSubject = subjectInput.value.trim() || 'Software Developer Opportunity';
      const userMessage = messageInput.value.trim();

      const fullSubject = `[Portfolio Inquiry] ${userSubject} - from ${name}`;
      const fullBody = `Hello Nithish,\n\n${userMessage}\n\n---\nSender Details:\nName: ${name}\nEmail: ${email}`;

      const mailtoUrl = `mailto:nithidharan24@gmail.com?subject=${encodeURIComponent(
        fullSubject
      )}&body=${encodeURIComponent(fullBody)}`;

      // Display transparent honest UX banner
      if (contactStatusBanner) {
        contactStatusBanner.className = 'contact-status-banner info visible';
        contactStatusBanner.innerHTML = `
          <strong>Drafting Message:</strong> Opening your default email client...<br>
          If your email app didn't open automatically, <a href="${mailtoUrl}" id="direct-mailto-link">click here to send directly</a> 
          or email <span style="font-family: var(--font-mono); color: var(--accent-light);">nithidharan24@gmail.com</span>.
        `;
      }

      // Trigger user's email client
      try {
        window.location.href = mailtoUrl;
      } catch (err) {
        console.warn('Mailto link navigation note:', err);
      }
    });
  }

  /**
   * Copy to Clipboard Functionality
   */
  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback for non-https / older contexts
          const textArea = document.createElement('textarea');
          textArea.value = textToCopy;
          textArea.style.position = 'fixed';
          textArea.style.left = '-9999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }

        // Visual feedback
        const originalHtml = btn.innerHTML;
        btn.classList.add('copied');
        btn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        btn.setAttribute('title', 'Copied!');

        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = originalHtml;
          btn.setAttribute('title', 'Copy');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    });
  });

  /**
   * Project Features & Architecture Modal Controller
   */
  const projectModal = document.getElementById('project-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalFooterCloseBtn = document.getElementById('modal-footer-close-btn');
  const modalCategory = document.getElementById('modal-project-category');
  const modalTitle = document.getElementById('modal-project-title');
  const modalDesc = document.getElementById('modal-project-desc');
  const modalFeaturesContent = document.getElementById('modal-features-content');
  const modalTechStack = document.getElementById('modal-tech-stack');
  let lastActiveTrigger = null;

  function openProjectModal(card, triggerButton) {
    if (!projectModal) return;
    lastActiveTrigger = triggerButton;

    const titleEl = card.querySelector('.project-title');
    const categoryEl = card.querySelector('.project-category');
    const descEl = card.querySelector('.project-description');
    const featuresList = card.querySelector('.project-features-list');
    const techStack = card.querySelector('.project-tech-stack');

    if (modalTitle && titleEl) modalTitle.textContent = titleEl.textContent.trim();
    if (modalCategory && categoryEl) modalCategory.textContent = categoryEl.textContent.trim();
    if (modalDesc && descEl) modalDesc.textContent = descEl.textContent.trim();

    if (modalFeaturesContent && featuresList) {
      modalFeaturesContent.innerHTML = '';
      modalFeaturesContent.appendChild(featuresList.cloneNode(true));
    }

    if (modalTechStack && techStack) {
      modalTechStack.innerHTML = '';
      const tags = techStack.querySelectorAll('.tech-tag');
      tags.forEach((tag) => {
        modalTechStack.appendChild(tag.cloneNode(true));
      });
    }

    projectModal.removeAttribute('hidden');
    // Force reflow for CSS animation
    void projectModal.offsetWidth;
    projectModal.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (triggerButton) {
      triggerButton.setAttribute('aria-expanded', 'true');
    }

    if (modalCloseBtn) {
      modalCloseBtn.focus();
    }
  }

  function closeProjectModal() {
    if (!projectModal || !projectModal.classList.contains('open')) return;

    projectModal.classList.remove('open');
    document.body.style.overflow = '';

    if (lastActiveTrigger) {
      lastActiveTrigger.setAttribute('aria-expanded', 'false');
    }

    setTimeout(() => {
      projectModal.setAttribute('hidden', 'true');
      if (lastActiveTrigger && typeof lastActiveTrigger.focus === 'function') {
        lastActiveTrigger.focus();
      }
    }, 200);
  }

  // Delegated click handler for "Key Features & Architecture" buttons & modal close
  document.addEventListener('click', (event) => {
    const btn = event.target.closest('.btn-features');
    if (btn) {
      const card = btn.closest('.project-card');
      if (card) {
        openProjectModal(card, btn);
      }
      return;
    }

    if (
      event.target === modalBackdrop ||
      event.target.closest('#modal-close-btn') ||
      event.target.closest('#modal-footer-close-btn')
    ) {
      closeProjectModal();
    }
  });

  // Close modal on Escape key press
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && projectModal && projectModal.classList.contains('open')) {
      closeProjectModal();
    }
  });

  /**
   * Router Initialization
   */
  window.addEventListener('hashchange', handleHashChange);
  window.addEventListener('DOMContentLoaded', () => {
    // If no hash in URL, default to #home
    if (!window.location.hash) {
      window.location.hash = '#home';
    } else {
      handleHashChange();
    }
  });
})();
