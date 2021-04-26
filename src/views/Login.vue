<template>
    <div class="login">
    <div class>
      <div class="col-md-6 offset-md-3">
        <h2 class="display-4 text-center mt-5">Login Form</h2>

        <form action="#">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="text" v-model="email" name="email" id="email"  class="form-control" />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              v-model="password"
            
              class="form-control"
            />
            <div style="color:red;" v-if="error">{{error}}</div>
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-info btn-block" @click.prevent="doLogin">Login</button>
          </div>
        </form>
        <bounce-loader v-if="isLoading" class="d-block mt-4 m-auto" :color="color"  :size="40" ></bounce-loader>


        <!-- <circle-spin v-show="isLoading"></circle-spin> -->
      </div>
    </div>
  </div>
</template>

<script>
      import axios from "axios"

  export default {


    name:"login",
    data() {
      return {
        email:"",
        password:"",
        error: "",
        color:"#343A40",
        size:"",
        sizeUnit:"",
        isLoading: false
      }
    },
    
    methods: {
      doLogin() {
        //here is where that action works
        this.isLoading = true,
        this.$store
            .dispatch('doLoginAction', {
              email: this.email,
              password: this.password,
            }) 
            .then(res => {
              this.isLoading = true,
              this.$router.push("/profile")


            })
            .catch(err => {
              this.isLoading = false,

              this.error = "smth is wrong"
              console.log(err.message) 

            })

      //   axios.post("http://127.0.0.1:8000/api/auth/login",{
      //    email : this.email,
      //    password : this.password,
          
      //   })
      //   .then(res => {
      //     console.log(res.data)

      //     const token = localStorage.setItem('token', res.data.access_token)
      //     const user = localStorage.setItem('user', res.data.user)
      //     this.$router.push("/profile")  

      //   })
      //   .catch(err => {
      //     console.log(err.message)
      //     this.error = err.message
      //   })
      // }
    }
    }
  }


</script>