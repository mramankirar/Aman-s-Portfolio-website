const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* Mouse spotlight only — cursor ring removed */
document.addEventListener("pointermove",e=>{
  document.documentElement.style.setProperty(
    "--mx",
    e.clientX+"px"
  );

  document.documentElement.style.setProperty(
    "--my",
    e.clientY+"px"
  );
});

/* Scroll progress */
function scrollUI(){

  const max =
    document.documentElement.scrollHeight - innerHeight;

  $("#progress").style.width =
    (max > 0 ? scrollY / max * 100 : 0) + "%";

  $("#topBtn").classList.toggle(
    "show",
    scrollY > 600
  );
}

addEventListener(
  "scroll",
  scrollUI,
  {passive:true}
);

scrollUI();

/* Back to top */
$("#topBtn").onclick = () =>
  scrollTo({
    top:0,
    behavior:"smooth"
  });

/* Mobile menu */
const menu = $("#menu");
const mobile = $("#mobile");

menu.onclick = () => {

  const open =
    mobile.classList.toggle("open");

  menu.setAttribute(
    "aria-expanded",
    open
  );

  menu.textContent =
    open ? "×" : "☰";
};

$$(".mobile a").forEach(a =>
  a.onclick = () => {

    mobile.classList.remove("open");

    menu.textContent = "☰";

    menu.setAttribute(
      "aria-expanded",
      "false"
    );

  }
);

/* Reveal on scroll */
const reveal =
  new IntersectionObserver(
    entries => {

      entries.forEach(e => {

        if(e.isIntersecting)
          e.target.classList.add("show");

      });

    },
    {threshold:.12}
  );

$$(".reveal").forEach(
  x => reveal.observe(x)
);

/* Active navigation */
const links =
  $$(".navlinks a:not(.nav-cta)");

const sections =
  $$("section[id]");

const activeObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(e => {

        if(e.isIntersecting){

          links.forEach(l =>
            l.classList.toggle(
              "active",
              l.getAttribute("href") ===
              "#" + e.target.id
            )
          );

        }

      });

    },
    {
      rootMargin:"-35% 0px -55% 0px"
    }
  );

sections.forEach(
  s => activeObserver.observe(s)
);

/* Card spotlight */
$$(".panel").forEach(card => {

  card.addEventListener(
    "pointermove",
    e => {

      const r =
        card.getBoundingClientRect();

      card.style.setProperty(
        "--x",
        (e.clientX - r.left) + "px"
      );

      card.style.setProperty(
        "--y",
        (e.clientY - r.top) + "px"
      );

    }
  );

});

/* Role rotation */
const roles = [
  "Aspiring Software Developer",
  "Web Developer",
  "Problem Solver",
  "B.Tech CSE Student"
];

let ri = 0;

setInterval(() => {

  ri = (ri + 1) % roles.length;

  const el = $("#role");

  el.style.opacity = 0;

  setTimeout(() => {

    el.textContent =
      roles[ri];

    el.style.opacity = 1;

  },180);

},3200);

/* Project modal */
const modal = $("#modal");

$$(".project-open").forEach(
  btn => btn.onclick = () => {

    $("#modalTitle").textContent =
      btn.dataset.title;

    $("#modalDesc").textContent =
      btn.dataset.desc;

    modal.classList.add("show");

  }
);

function closeModal(){
  modal.classList.remove("show");
}

$("#modalClose").onclick =
  closeModal;

modal.onclick = e => {

  if(e.target === modal)
    closeModal();

};

addEventListener(
  "keydown",
  e => {

    if(e.key === "Escape")
      closeModal();

  }
);
