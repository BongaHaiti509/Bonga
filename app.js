const $ = (s) => document.querySelector(s);
const menu = $("#menuToggle"), nav = $("#mainNav");
const SUPABASE_URL = "https://gvoxrxdfizlhpayfmqzm.supabase.co";
const SUPABASE_KEY = "sb_publishable_MDnRgJvyKAnMSgnEDaPjyQ_SQQWuLiX";
menu?.addEventListener("click", () => nav.classList.toggle("show"));
nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("show")));
if ($("#year")) $("#year").textContent = new Date().getFullYear();
const modal = $("#loginModal");
function openModal(){ modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); }
function closeModal(){ modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); }
$("#loginOpen")?.addEventListener("click",openModal);
$("#modalClose")?.addEventListener("click",closeModal);
$("#modalX")?.addEventListener("click",closeModal);
$("#loginInfo")?.addEventListener("click",()=>{$("#loginMessage").textContent="La connexion sécurisée sera activée après la configuration Supabase.";});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});
const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const signupForm = $("#signupForm");
const signinForm = $("#signinForm");
const switchAuth = $("#switchAuth");
const authMessage = $("#authMessage");
const authTitle = $("#authTitle");

let signupMode = true;

switchAuth?.addEventListener("click", () => {
  signupMode = !signupMode;
  signupForm.hidden = !signupMode;
  signinForm.hidden = signupMode;
  authTitle.textContent = signupMode ? "Créer un compte" : "Se connecter";
  switchAuth.textContent = signupMode
    ? "J'ai déjà un compte"
    : "Créer un compte";
  authMessage.textContent = "";
});

signupForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = $("#fullName").value.trim();
  const email = $("#signupEmail").value.trim();
  const password = $("#signupPassword").value;
  const confirm = $("#confirmPassword").value;

  if (password !== confirm) {
    authMessage.textContent = "Les mots de passe ne correspondent pas.";
    return;
  }

  authMessage.textContent = "Création du compte en cours...";

  const { error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: { data: { full_name: name } }
  });

  authMessage.textContent = error
    ? error.message
    : "Compte créé ! Vérifiez votre courriel pour confirmer votre inscription.";
});

signinForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = $("#signinEmail").value.trim();
  const password = $("#signinPassword").value;

  authMessage.textContent = "Connexion en cours...";

  const { error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    authMessage.textContent = error.message;
  } else {
    authMessage.textContent = "Connexion réussie !";
    closeModal();
  }
});
