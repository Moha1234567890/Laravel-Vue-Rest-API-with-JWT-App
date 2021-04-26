<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <router-link class="navbar-brand" to="/">Laravel Api</router-link>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" v-if="!loggedIn">
          <router-link to="/login" class="btn btn-primary my-1 btn-block" >Login</router-link>
        </li>
        <li class="nav-item" v-if="!loggedIn">
          <router-link
            to="/register" class="btn btn-success my-1 ml-1 btn-block"
           
            aria-disabled="true"
          >Register</router-link>
        </li>

        <li class="nav-item" v-if="loggedIn">
          <button class="btn btn-warning" @click.prevent="doLogout">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      token: null
    };
  },

  mounted() {
    this.checkUserStatus();
  },

  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn
    }
  },

  methods: {
    checkUserStatus() {
      if(localStorage.getItem("token") !== null) {
        this.token = localStorage.getItem("token")

      }
    },

    doLogout() {
      this.$store.dispatch('doLogoutAction')
      .then(res => {
        this.$router.push('/')
      }).
      catch(err => {
        console.log(err)
      })
      // localStorage.removeItem("token")
      // localStorage.removeItem("user")
      // this.token = null
      // this.$router.push("/") 
    }
  }
  
};
</script>