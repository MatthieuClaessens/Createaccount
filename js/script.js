// Validation du formulaire de création de compte

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registerForm');
  const fullname = document.getElementById('fullname');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const securityCode = document.getElementById('securityCode');
  const terms = document.getElementById('terms');

  // Messages d'erreur
  const fullnameError = document.getElementById('fullname-error');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  const securityCodeError = document.getElementById('securityCode-error');
  const termsError = document.getElementById('terms-error');

  // Regex
  const fullnameRegex = /^([A-Za-zÀ-ÖØ-öø-ÿ]+[\s\-']){1,}[A-Za-zÀ-ÖØ-öø-ÿ]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.com$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-{};':",.<>/?]).{8,}$/;
  const securityCodeRegex = /^[A-Za-z]{3}-\d{3}-[A-Za-z]{3}$/;

  function validateFullname() {
    const value = fullname.value.trim();
    if (!value) {
      fullnameError.textContent = 'Format : Prénom Nom (min 2 mots)';
      return false;
    }
    if (!fullnameRegex.test(value)) {
      fullnameError.textContent = 'Format : Prénom Nom (min 2 mots, lettres uniquement)';
      return false;
    }
    fullnameError.textContent = '';
    return true;
  }

  function validateEmail() {
    const value = email.value.trim();
    if (!value) {
      emailError.textContent = 'Email requis (domaines acceptés : gmail, yahoo, outlook, hotmail)';
      return false;
    }
    if (!emailRegex.test(value)) {
      emailError.textContent = 'Email valide (domaines acceptés : gmail, yahoo, outlook, hotmail)';
      return false;
    }
    emailError.textContent = '';
    return true;
  }

  function validatePassword() {
    const value = password.value;
    if (!value) {
      passwordError.textContent = 'Le mot de passe est requis';
      return false;
    }
    if (!passwordRegex.test(value)) {
      passwordError.textContent = 'Le mot de passe doit contenir 8 caractères avec maj, min, chiffre et caractère spécial';
      return false;
    }
    passwordError.textContent = '';
    return true;
  }

  function validateSecurityCode() {
    const value = securityCode.value.trim();
    if (!value) {
      securityCodeError.textContent = 'Format attendu : ABC-123-XYZ';
      return false;
    }
    if (!securityCodeRegex.test(value)) {
      securityCodeError.textContent = 'Format attendu : ABC-123-XYZ';
      return false;
    }
    securityCodeError.textContent = '';
    return true;
  }

  function validateTerms() {
    if (!terms.checked) {
      termsError.textContent = 'Vous devez accepter les conditions';
      return false;
    }
    termsError.textContent = '';
    return true;
  }

  // Fonction pour activer/désactiver le bouton selon la validité
  function updateButtonState() {
    const isFullnameValid = validateFullname();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isSecurityCodeValid = validateSecurityCode();
    const isTermsValid = validateTerms();
    form.querySelector('button[type="submit"]').disabled = !(isFullnameValid && isEmailValid && isPasswordValid && isSecurityCodeValid && isTermsValid);
  }

  // Validation réactive
  fullname.addEventListener('input', function(){validateFullname(); updateButtonState();});
  email.addEventListener('input', function(){validateEmail(); updateButtonState();});
  password.addEventListener('input', function(){validatePassword(); updateButtonState();});
  securityCode.addEventListener('input', function(){validateSecurityCode(); updateButtonState();});
  terms.addEventListener('change', function(){validateTerms(); updateButtonState();});

  // État initial
  updateButtonState();

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.querySelector('button[type="submit"]').disabled) {
      alert('Compte créé avec succès !');
      // Envoi des données via GET
      const params = new URLSearchParams({
        fullname: fullname.value,
        email: email.value,
        password: password.value,
        securityCode: securityCode.value
      });
      window.location.href = `http://127.0.0.1:5500/?${params.toString()}`;
    }
  });

  // Réinitialisation de l'URL à chaque chargement de la page
  if (window.location.search) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
});
