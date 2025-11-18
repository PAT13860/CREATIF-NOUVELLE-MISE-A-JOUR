// form.js - ES6+
// Gère : rdv/login flow, modale mot de passe oublié, création de compte (validation + génération pw)

document.addEventListener('DOMContentLoaded', () => {
  // RDV / login
  const login         = document.getElementById('login');
  const suivant       = document.getElementById('suivant');
  const passwordField = document.getElementById('passwordField');
  const password      = document.getElementById('password');
  const valider       = document.getElementById('valider');
  const pwlabel       = document.getElementById('pwlabel');
  const togglePw      = document.getElementById('togglePw');

  if (login && suivant) {
    login.addEventListener('input', () => suivant.disabled = login.value.trim().length < 4);
    suivant.addEventListener('click', () => {
      if (passwordField) passwordField.classList.remove('hidden');
      password && password.focus();
    });
  }

  if (password) {
    password.addEventListener('focus', () => { if (pwlabel) pwlabel.textContent = ''; });
    password.addEventListener('blur', () => { if (pwlabel) pwlabel.textContent = 'Mot de passe'; });
    password.addEventListener('input', () => { if (valider) valider.disabled = password.value.length < 4; });
  }

  if (togglePw && password) {
    togglePw.addEventListener('click', e => {
      e.preventDefault();
      password.type = password.type === 'password' ? 'text' : 'password';
      togglePw.textContent = password.type === 'password' ? 'Afficher' : 'Cacher';
    });
  }

  // Modale "mot de passe oublié"
  const forgotLink = document.getElementById('forgotLink');
  const forgotModal = document.getElementById('forgotModal');
  const closeModal = document.getElementById('closeModal');
  const email = document.getElementById('email');
  const sendEmail = document.getElementById('sendEmail');

  if (forgotLink && forgotModal) {
    forgotLink.addEventListener('click', e => { e.preventDefault(); forgotModal.classList.add('show'); forgotModal.setAttribute('aria-hidden','false'); });
    closeModal && closeModal.addEventListener('click', () => { forgotModal.classList.remove('show'); forgotModal.setAttribute('aria-hidden','true'); });
    const emailRe = /.+@.+\..+/;
    if (email && sendEmail) {
      email.addEventListener('input', () => sendEmail.disabled = !emailRe.test(email.value));
      sendEmail.addEventListener('click', () => {
        alert('Simulation : email de réinitialisation envoyé.');
        forgotModal.classList.remove('show');
      });
    }
  }

  // Création de compte
  const createForm = document.getElementById('createForm');
  const genPw = document.getElementById('genPw');
  const pwCreate = document.getElementById('pwCreate');
  const emailCreate = document.getElementById('emailCreate');
  const createSubmit = document.getElementById('createSubmit');

  const checkCreateForm = () => {
    if (!createForm) return;
    const requireds = Array.from(createForm.querySelectorAll('[required]'));
    const allFilled = requireds.every(i => i.value && i.value.trim().length > 0);
    const emailRe = /.+@.+\..+/;

    createSubmit.disabled = !(allFilled && emailCreate && emailRe.test(emailCreate.value));
  };

  if (createForm) {
    createForm.addEventListener('input', checkCreateForm);
    checkCreateForm();
  }

  if (genPw && pwCreate) {
    genPw.addEventListener('click', (e) => {
      e.preventDefault();
      const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*()';
      const arr = new Uint8Array(12);
      window.crypto.getRandomValues(arr);
      let pw = '';
      for (let i = 0; i < arr.length; i++) pw += alphabet[arr[i] % alphabet.length];
      pwCreate.value = pw;
      checkCreateForm();
    });
  }
});