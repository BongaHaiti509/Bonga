const $ = (s) => document.querySelector(s);
const menu = $("#menuToggle"), nav = $("#mainNav");
menu?.addEventListener("click", () => nav.classList.toggle("show"));
nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("show")));
$("#year").textContent = new Date().getFullYear();
const modal = $("#loginModal");
function openModal(){ modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); }
function closeModal(){ modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); }
$("#loginOpen")?.addEventListener("click",openModal);
$("#modalClose")?.addEventListener("click",closeModal);
$("#modalX")?.addEventListener("click",closeModal);
$("#loginInfo")?.addEventListener("click",()=>{$("#loginMessage").textContent="La connexion sécurisée sera activée après la configuration Supabase.";});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});
