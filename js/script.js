// Validation du formulaire de création de compte

// Attendre que le DOM soit chargé avant d'exécuter le script
// Cela garantit que tous les éléments HTML sont accessibles

document.addEventListener('DOMContentLoaded', function () {
  // Récupération des éléments du formulaire et des champs
  const form = document.getElementById('registerForm');
  const fullname = document.getElementById('fullname');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const securityCode = document.getElementById('securityCode');
  const terms = document.getElementById('terms');

  // Récupération des éléments pour afficher les messages d'erreur
  const fullnameError = document.getElementById('fullname-error');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  const securityCodeError = document.getElementById('securityCode-error');
  const termsError = document.getElementById('terms-error');

  // Définition des expressions régulières pour la validation
  // Nom complet : au moins 2 mots, lettres accentuées ou non, pas de chiffres
  const fullnameRegex = /^([A-Za-zÀ-ÖØ-öø-ÿ]+[\s\-']){1,}[A-Za-zÀ-ÖØ-öø-ÿ]+$/;
  // Email : uniquement gmail, yahoo, outlook, hotmail en .com
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.com$/;
  // Mot de passe : 8 caractères min, majuscule, minuscule, chiffre, caractère spécial
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-{};':",.<>/?]).{8,}$/;
  // Code sécurisé : 3 lettres - 3 chiffres - 3 lettres
  const securityCodeRegex = /^[A-Za-z]{3}-\d{3}-[A-Za-z]{3}$/;

  // Fonction de validation du nom complet
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

  // Fonction de validation de l'email
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

  // Fonction de validation du mot de passe
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

  // Fonction de validation du code sécurisé
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

  // Fonction de validation de l'acceptation des conditions
  function validateTerms() {
    if (!terms.checked) {
      termsError.textContent = 'Vous devez accepter les conditions';
      return false;
    }
    termsError.textContent = '';
    return true;
  }

  // Fonction pour activer/désactiver le bouton selon la validité de tous les champs
  function updateButtonState() {
    const isFullnameValid = validateFullname();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isSecurityCodeValid = validateSecurityCode();
    const isTermsValid = validateTerms();
    // Le bouton est activé seulement si tout est valide
    form.querySelector('button[type="submit"]').disabled = !(isFullnameValid && isEmailValid && isPasswordValid && isSecurityCodeValid && isTermsValid);
  }

  // Validation réactive : à chaque saisie ou changement, on valide et on met à jour le bouton
  fullname.addEventListener('input', function(){validateFullname(); updateButtonState();});
  email.addEventListener('input', function(){validateEmail(); updateButtonState();});
  password.addEventListener('input', function(){validatePassword(); updateButtonState();});
  securityCode.addEventListener('input', function(){validateSecurityCode(); updateButtonState();});
  terms.addEventListener('change', function(){validateTerms(); updateButtonState();});

  // État initial du bouton à l'ouverture de la page
  updateButtonState();

  // Gestion de la soumission du formulaire
  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche l'envoi classique du formulaire
    // Si le bouton est activé (tout est valide)
    if (!form.querySelector('button[type="submit"]').disabled) {
      alert('Compte créé avec succès !'); // Affiche l'alerte de succès
      // Envoi des données via GET dans l'URL
      const params = new URLSearchParams({
        fullname: fullname.value,
        email: email.value,
        password: password.value,
        securityCode: securityCode.value
      });
      window.location.href = `http://127.0.0.1:5500/?${params.toString()}`;
    }
  });

  // Réinitialisation de l'URL à chaque chargement de la page (supprime les paramètres GET)
  if (window.location.search) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
});
