import Dashboard from "./pages/Dashboard.js";
import Products from "./pages/Products.js";
import Posts from "./pages/Posts.js";
import NotFound from "./pages/NotFound.js";
// 1. what view show to user based on Route ?
function router(params) {
  // dashboard, products, posts :
  const routes = [
    { path: "/", view: Dashboard },
    { path: "/posts", view: Posts },
    { path: "/products", view: Products },
  ];

  const potentialRoutes = routes.map((item) => {
    return {
      route: item,
      isMatch: location.pathname === item.path,
    };
  });

  let match = potentialRoutes.find((route) => route.isMatch);

  if (!match) {
    match = {
      route: { path: "/not-found", view: NotFound },
      isMatch: true,
    };
  }
  document.querySelector("#app").innerHTML = match.route.view();
}

// 2. push user to new url :
function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}

window.addEventListener("popstate", router);

// SIDEBAR TOGGLER :
const sidebarToggler = document.querySelector(".sidebar-toggler");
const sidebar = document.querySelector(".nav");
const root = document.documentElement;
sidebarToggler.addEventListener("click", () => {
  sidebar.classList.toggle("mini-sidebar");
  if (sidebar.classList.contains("mini-sidebar")) {
    root.style.setProperty("--nav-width", 70 + "px");
  } else {
    root.style.setProperty("--nav-width", 250 + "px");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});
