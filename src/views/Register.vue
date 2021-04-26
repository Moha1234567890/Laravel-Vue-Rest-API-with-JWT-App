<template>
  <div class="register">
    <div class>
      <div class="col-md-6 offset-md-3">
        <h2 class="display-4 text-center mt-5">Register Form</h2>

        <form action="#">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" v-model="name" name="Name" id="Name"  class="form-control" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="text" v-model="email" name="email" id="email" class="form-control" />
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
            <button
              type="submit"
              class="btn btn-info btn-block"
              @click.prevent="doRegister"
            >Register</button>
          </div>
        </form>
        <bounce-loader v-if="isLoading" class="d-block mt-4 m-auto" :color="color"  :size="40" ></bounce-loader>

      </div>
    </div>
  </div>
</template>


<script>
  import axios from "axios"
  export default {

      data() {
          return {
               name:"",
               email:"",
               password:"",
               error: "",
               color:"",
               sizeUnit:"",
               isLoading: false

          }
         
      },

      methods: {
          doRegister() {

              this.isLoading = true,
              this.$store
              .dispatch('doRegisrAction', {
                name: this.name,
                email: this.email,
                password: this.password,
              }) 
              .then(res => {
                this.isLoading = false,
                this.$router.push("/profile")


              })
              .catch(err => {
                this.error = "smth is wrong"
                console.log(err.message) 

              })
            }
      }

  }

</script>