import "./style.css";
import VanillaRouter from "./router/vanillarouter";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";

const section = document.querySelector("section");

const options = {
    historyMode: true,
};
const router = new VanillaRouter(options);

router.get("/", homeCallback).setName("home");

router
    .get("/about", (req, router) => {
        section.innerHTML = About();
        console.log(`Welcome to about page! The request url is ${req.uri}`);
    })
    .setName("about");

router
    .get("/products", (req, router) => {
        section.innerHTML = Products();
        console.log(router);
    })
    .setName("products");

router.notFoundHandler(function (req, router) {
    console.log("oops! the page you are looking for is probably eaten by a snake");
    router.pathFor("home");
});

router.init();

function homeCallback(req, router) {
    section.innerHTML = Home();
    console.log(`Welcome to my home page! The request url is ${req.uri}`);

    window.query = req.query;
}

document.addEventListener("click", (event) => {
    const { target } = event;

    if (target instanceof HTMLAnchorElement) {
        event.preventDefault();

        router._goTo(target.href);
        console.log(router);
        console.log(window.Request.pathname);
    }
});

window.router = router;
