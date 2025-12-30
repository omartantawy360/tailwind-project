const toggle = document.getElementById('darkToggle');
const html = document.documentElement;
toggle.addEventListener('change', function () {
if (toggle.checked) {
html.classList.add('dark');
localStorage.setItem('theme', 'dark');
} else {
html.classList.remove('dark');
localStorage.setItem('theme', 'light');
}
});
// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
html.classList.add('dark');

toggle.checked = true;
}

/* Features scroll reveal */
(function () {
  const features = document.getElementById('features');
  if (!features) return;
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        features.classList.add('in-view');
        // subtle pop for image
        const img = features.querySelector('.feature-img');
        if (img) img.style.transform = 'translateY(-6px) scale(1.02)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });
  obs.observe(features);
})();

  function togglePricing(plan) {
    const monthlyBtn = document.getElementById('monthlyBtn');
    const yearlyBtn = document.getElementById('yearlyBtn');
    
    if (plan === 'monthly') {
      monthlyBtn.classList.add('bg-blue-600', 'text-white');
      monthlyBtn.classList.remove('bg-transparent', 'text-gray-700', 'dark:text-gray-300');
      
      yearlyBtn.classList.remove('bg-blue-600', 'text-white');
      yearlyBtn.classList.add('bg-transparent', 'text-gray-700', 'dark:text-gray-300');
    } else {
      yearlyBtn.classList.add('bg-blue-600', 'text-white');
      yearlyBtn.classList.remove('bg-transparent', 'text-gray-700', 'dark:text-gray-300');
      
      monthlyBtn.classList.remove('bg-blue-600', 'text-white');
      monthlyBtn.classList.add('bg-transparent', 'text-gray-700', 'dark:text-gray-300');
    }
  }

// Auth modal logic (login/signup panels)
const openSignupBtn = document.getElementById('openSignup');
const openLoginBtn = document.getElementById('openLogin');
const closeModalBtn = document.getElementById('closeSignup');
const signupModal = document.getElementById('signupModal');
const modalLogin = document.getElementById('modalLogin');
const modalSignup = document.getElementById('modalSignup');

function openModal(mode = 'login') {
  if (!signupModal) return;
  signupModal.classList.add('open');
  signupModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  if (modalLogin && modalSignup) {
    if (mode === 'signup') {
      modalSignup.classList.remove('hidden');
      modalLogin.classList.add('hidden');
      setTimeout(() => { document.getElementById('modal-signup-name')?.focus(); }, 120);
    } else {
      modalLogin.classList.remove('hidden');
      modalSignup.classList.add('hidden');
      setTimeout(() => { document.getElementById('modal-email')?.focus(); }, 120);
    }
  }
}

function closeModal() {
  if (!signupModal) return;
  signupModal.classList.remove('open');
  signupModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (modalLogin) modalLogin.classList.add('hidden');
  if (modalSignup) modalSignup.classList.add('hidden');
}

if (openSignupBtn) openSignupBtn.addEventListener('click', (e) => { e.preventDefault(); openModal('signup'); });
if (openLoginBtn) openLoginBtn.addEventListener('click', (e) => { e.preventDefault(); openModal('login'); });
if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

if (signupModal) {
  signupModal.addEventListener('click', (e) => {
    // close when clicking the overlay or outside the content
    if (e.target === signupModal || e.target.classList.contains('modal-overlay') || e.target.dataset.close !== undefined) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && signupModal.classList.contains('open')) closeModal();
  });
}

