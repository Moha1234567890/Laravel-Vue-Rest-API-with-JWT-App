import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import store from "./store";

Vue.use(Router);

const router =  new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        guest: true
      }
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      meta: {
        secure: true
      }
    }

  ]
});


router.beforeEach((to, from, next) => {
   //console.log(to)

   if(to.matched.some(record => record.meta.secure)) {
     if(!store.state.loggedIn) {
       next({
         path: "/login"
       });
     } else {
       next();
     }
   } else if(to.matched.some(record => record.meta.guest)) {
      if(!store.state.loggedIn) {
        next();
       
      } else {
        next({
          path: "/profile"
        });
      }

   }
   else {
     next()
   }
});


/**
 * 
 */
export default router
