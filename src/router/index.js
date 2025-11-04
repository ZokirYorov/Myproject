import { createRouter, createWebHistory } from "vue-router";
const routes = [
    {
        path: "/",
        name: "Main",
        redirect: "/hello",
    },
    {
        path: "/hello",
        name: "Hello",
        component: () => import("../components/HelloWorld.vue"),
    },
    {
        path: "/header",
        name: "Header",
        component: () => import("../components/Header.vue"),
    },
    {
        path: "/brands",
        name: "Brands",
        component: () => import(("../views/counter.vue")),
        meta: { requiresAuth: true },
    },
    {
        path: "/models",
        name: "Models",
        component: () => import(("../views/models.vue")),
    },
    {
        path: "/transaction",
        name: "Transaction",
        component: () => import("../views/Transaction.vue"),
    },
    {
        path: "/to-do",
        name: "Todo",
        component: () => import('../views/Todo.vue'),
    },
    {
        path: "/products",
        name: "Products",
        component: () => import("../views/Products.vue"),
    },
    {
        path: "/login",
        name: "Login",
        component: () => import(("../components/Login.vue")),
    }
];
const router = createRouter({
    routes,
    history: createWebHistory(),
});
export default router;
