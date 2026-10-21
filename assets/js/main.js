/**
 * Naples Drain Experts — Interactive Logic & UX Script
 * Features: Mobile drawer, sticky header, diagnostic triage widget,
 * FAQ filter & accordions, quote form validation, smooth scroll handlers,
 * and modal overlays for Privacy Policy & Terms of Service.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Sticky Header Effect ---
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        siteHeader.classList.add('header-scrolled');
      } else {
        siteHeader.classList.remove('header-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // --- 2. Mobile Drawer Navigation ---
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerCloseBtn = document.querySelector('.mobile-drawer-close');
  const drawerBackdrop = document.querySelector('.mobile-drawer-backdrop');

  function openDrawer() {
    if (mobileDrawer && drawerBackdrop) {
      mobileDrawer.classList.add('is-open');
      drawerBackdrop.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
    }
  }

  function closeDrawer() {
    if (mobileDrawer && drawerBackdrop) {
      mobileDrawer.classList.remove('is-open');
      drawerBackdrop.classList.remove('is-active');
      document.body.style.overflow = '';
      if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  // Close drawer when clicking any link inside mobile drawer
  if (mobileDrawer) {
    const drawerLinks = mobileDrawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobileDrawer && mobileDrawer.classList.contains('is-open')) {
        closeDrawer();
      }
      closeAllModals();
    }
  });

  // --- 3. Interactive Drain Diagnostic Helper ---
  const diagnosticData = {
    single_sink: {
      badge: 'Localized Fixture Issue',
      badgeClass: 'badge-primary',
      title: 'Individual Fixture Clearing (Sink / P-Trap)',
      desc: 'When only one sink is draining slowly while nearby fixtures drain normally, the clog is usually located within the fixture trap, pop-up stopper, or localized branch arm. Mechanical cabling or trap disassembly typically clears grease, soap scum, or food waste.',
      urgent: false,
      recommendedAnchor: 'drain-cleaning.html',
      actionText: 'Request Sink Drain Service'
    },
    shower_standing: {
      badge: 'Hair & Soap Scum Build-up',
      badgeClass: 'badge-primary',
      title: 'Shower / Bathtub Line Snaking',
      desc: 'Standing water around your feet in showers is commonly caused by intertwined hair, conditioner residue, and mineral scale in the 1.5” to 2” shower drain pipe. Professional mechanical augers safely extract the hair cluster without damaging pipe walls.',
      urgent: false,
      recommendedAnchor: 'drain-cleaning.html',
      actionText: 'Request Shower Drain Service'
    },
    multiple_slow: {
      badge: 'Main Lateral Warning',
      badgeClass: 'badge-accent',
      title: 'Main Sewer Line Assessment & Camera Inspection',
      desc: 'If multiple fixtures across the home are slow, or your toilet gurgles when the washing machine drains, the blockage is past individual pipes in the main building sewer lateral. A video camera inspection is recommended to pinpoint tree roots, sand intrusion, or heavy scale.',
      urgent: false,
      recommendedAnchor: 'main-sewer-line-cleaning.html',
      actionText: 'Book Camera & Mainline Assessment'
    },
    sewer_smell: {
      badge: 'Sewer Gas Infiltration',
      badgeClass: 'badge-primary',
      title: 'Dry Trap Restoration or Vent Pipe Assessment',
      desc: 'In Naples seasonal homes and guest baths, unused drains dry out, breaking the water barrier that stops sewer gases. If running water into all fixtures does not stop the odor, a line inspection is needed to check for cracked vent lines or shifting joints.',
      urgent: false,
      recommendedAnchor: 'sewer-camera-inspection.html',
      actionText: 'Schedule Odor / Camera Assessment'
    },
    sewage_backup: {
      badge: 'Urgent Mainline Blockage',
      badgeClass: 'badge-emergency',
      title: 'Immediate Main Sewer Line Clearing Required',
      desc: 'CRITICAL: Wastewater or dark sewage backing up into bathtubs, showers, or floor drains indicates that the main sewer lateral is completely obstructed. Stop running all water, keep family and pets away, and call immediately for emergency dispatch.',
      urgent: true,
      urgentMsg: 'Stop running water immediately to prevent overflowing contaminated water.',
      recommendedAnchor: 'tel:+12396880557',
      actionText: 'Call Dispatch Now: +1 (239) 688-0557'
    }
  };

  const diagnosticButtons = document.querySelectorAll('.diagnostic-btn');
  const resultBadge = document.getElementById('diag-badge');
  const resultTitle = document.getElementById('diag-title');
  const resultDesc = document.getElementById('diag-desc');
  const resultUrgent = document.getElementById('diag-urgent');
  const resultLink = document.getElementById('diag-link');

  if (diagnosticButtons.length && resultTitle) {
    diagnosticButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        diagnosticButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const key = btn.getAttribute('data-symptom');
        const data = diagnosticData[key];

        if (data) {
          if (resultBadge) {
            resultBadge.textContent = data.badge;
            resultBadge.className = 'badge ' + data.badgeClass;
          }
          if (resultTitle) resultTitle.textContent = data.title;
          if (resultDesc) resultDesc.textContent = data.desc;

          if (resultUrgent) {
            if (data.urgent) {
              resultUrgent.textContent = data.urgentMsg;
              resultUrgent.style.display = 'block';
            } else {
              resultUrgent.style.display = 'none';
            }
          }

          if (resultLink) {
            if (data.urgent) {
              resultLink.href = 'tel:+12396880557';
              resultLink.textContent = data.actionText;
              resultLink.className = 'btn btn-emergency btn-lg';
            } else {
              resultLink.href = data.recommendedAnchor;
              resultLink.textContent = data.actionText;
              resultLink.className = 'btn btn-primary btn-lg';
            }
          }
        }
      });
    });
  }

  // --- 4. Interactive FAQ Accordion & Search Filter ---
  const faqItems = document.querySelectorAll('.faq-item');
  const faqSearchInput = document.getElementById('faqSearch');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('is-open');
            const otherTrigger = other.querySelector('.faq-trigger');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          }
        });
        if (isOpen) {
          item.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  if (faqSearchInput) {
    faqSearchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      faqItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(term)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // --- 5. Interactive Inquiry Form Validation & Submission ---
  const inquiryForms = document.querySelectorAll('form[data-drain-form]');

  inquiryForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = form.querySelector('.form-feedback');
      const nameInput = form.querySelector('[name="customer_name"]');
      const phoneInput = form.querySelector('[name="customer_phone"]');

      if (!nameInput || !nameInput.value.trim()) {
        showFeedback(feedback, 'Please enter your full name.', 'error');
        if (nameInput) nameInput.focus();
        return;
      }

      if (!phoneInput || !phoneInput.value.trim() || phoneInput.value.trim().length < 7) {
        showFeedback(feedback, 'Please enter a valid telephone number so our technician can reach you.', 'error');
        if (phoneInput) phoneInput.focus();
        return;
      }

      // Successful simulated submission
      showFeedback(
        feedback,
        'Thank you! Your service inquiry has been received. A Naples Drain Experts representative will review your drain symptoms and call you at ' + phoneInput.value.trim() + ' to confirm availability and discuss upfront pricing before any work begins.',
        'success'
      );

      form.reset();
    });
  });

  function showFeedback(element, message, type) {
    if (!element) return;
    element.textContent = message;
    element.className = 'form-feedback ' + type;
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // --- 6. Modal Overlays (Privacy Policy & Terms of Service) ---
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const modalCloses = document.querySelectorAll('.site-modal-close, .site-modal-backdrop');

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-modal-target');
      const modal = document.getElementById(targetId);
      if (modal) {
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeAllModals() {
    const modals = document.querySelectorAll('.site-modal-backdrop');
    modals.forEach(m => m.classList.remove('is-open'));
    document.body.style.overflow = '';
  }

  modalCloses.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (e.target.classList.contains('site-modal-backdrop') || e.target.classList.contains('site-modal-close')) {
        closeAllModals();
      }
    });
  });

  // --- 7. Click-to-Call Tracking Hook ---
  const callLinks = document.querySelectorAll('a[href^="tel:"]');
  callLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'click_to_call', {
          event_category: 'Contact',
          event_label: link.getAttribute('href')
        });
      }
    });
  });
});
