/*
Credit for theme changing logic
https://github.com/math-queiroz/rusty-typewriter
*/

function getCachedTheme() {
  const theme = document.body.getAttribute("colour-scheme");
  const cachedTheme = localStorage.getItem("colour-scheme");
  if (cachedTheme) {
    return cachedTheme;
  } else if (theme !== "dark" || theme !== "light") {
    return "light";
  } else {
    return theme;
  }
}

const toggle = (state) => (state === "light" ? "dark" : "light");
const initTheme = (state) => {
  document.documentElement.setAttribute("colour-scheme", state);
};

const toggleTheme = () => {
  const state = getCachedTheme();
  const newTheme = toggle(state);
  localStorage.setItem("colour-scheme", newTheme);
  initTheme(newTheme);
};

window.addEventListener("DOMContentLoaded", () => {
  initTheme(getCachedTheme());

  const toggle = document.getElementById("theme-toggle");
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    toggleTheme();
  });
});
