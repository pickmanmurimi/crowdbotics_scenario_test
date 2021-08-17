<template>
  <div>
    <auth-layout>
      <template slot="content">
        <div>
          <!-- Page content -->
          <div class="container mt-8 pb-5">
            <div class="row justify-content-center">
              <div class="col-12 col-xl-8">
                <div class="card bg-white mt-8 border-0">
                  <div class="card-body px-lg-5 py-lg-5">
                    <div class=" text-muted mb-4">
                      <p>sign up with credentials</p>
                    </div>

                    <!------------------------------------------------------------------------------------------------->
                    <!-- Form -->
                    <!------------------------------------------------------------------------------------------------->
                    <div class="text-left">

                      <!----------------------------------------------------------------------------------------------->
                      <!-- name -->
                      <!----------------------------------------------------------------------------------------------->

                      <div class="form-group mb-5">
                        <div class="input-group input-group-alternative">

                          <!-- icon-->
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="ni ni-single-02"></i></span>
                          </div>

                          <!-- input-->
                          <input
                              class="form-control"
                              v-model="registerData.name"
                              placeholder="Name"
                              type="text"
                              :disabled="loading || authentication_loader">

                        </div>
                        <!-- error-->
                        <small class="form-text text-danger" v-if="formError['name']"> {{
                            formError.name[0]
                          }} </small>
                      </div>

                      <!----------------------------------------------------------------------------------------------->
                      <!-- email -->
                      <!----------------------------------------------------------------------------------------------->

                      <div class="form-group mb-5">
                        <div class="input-group input-group-alternative">

                          <!-- icon-->
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                          </div>

                          <!-- input-->
                          <input
                              class="form-control"
                              v-model="registerData.email"
                              placeholder="Email"
                              type="email"
                              :disabled="loading || authentication_loader">

                        </div>
                        <!-- error-->
                        <small class="form-text text-danger" v-if="formError['email']"> {{
                            formError.email[0]
                          }} </small>
                      </div>

                      <!----------------------------------------------------------------------------------------------->
                      <!-- password -->
                      <!----------------------------------------------------------------------------------------------->

                      <div class="form-group">
                        <div class="input-group input-group-alternative">

                          <!-- icon-->
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="ni ni-lock-circle-open"></i></span>
                          </div>

                          <!-- input-->
                          <input
                              class="form-control"
                              v-model="registerData.password"
                              placeholder="Password"
                              type="password"
                              :disabled="loading || authentication_loader">

                        </div>
                        <!-- error-->
                        <small class="form-text text-danger" v-if="formError['password']">
                          {{ formError.password[0] }} </small>
                      </div>

                      <!----------------------------------------------------------------------------------------------->
                      <!-- Loader -->
                      <!----------------------------------------------------------------------------------------------->
                      <center-loader color="warning" v-if="loading"></center-loader>
                      <center-loader color="success" v-if="authentication_loader"></center-loader>

                      <!----------------------------------------------------------------------------------------------->
                      <!-- sign in -->
                      <!----------------------------------------------------------------------------------------------->

                      <div class="text">
                        <button :disabled="loading || authentication_loader" type="button" @click="login()" class="btn btn-primary my-4">Sign
                          up
                        </button>
                      </div>

                    </div>
                  </div>
                </div>

                <!----------------------------------------------------------------------------------------------------->
                <!-- Forgot Password -->
                <!----------------------------------------------------------------------------------------------------->
                <div class="row mt-3">
                  <div class="col-6">
                    <!-- <a href="#" class="text-light"><small>Forgot password?</small></a> -->
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </template>
    </auth-layout>
  </div>
</template>

<script>
import AuthLayout from "@/App/Modules/Authentication/Components/AuthLayout";

export default {

  /**
   * name
   */
  name: "Login",

  /**
   * components
   */
  components: {AuthLayout},

  /**
   * data
   * @return {{registerData: {password: string, email: string}, formError: []}}
   */
  data() {
    return {
      registerData: {
        name: '',
        email: '',
        password: '',
      },
      formError: [],
      loading: false,
      user_details_loading: false
    }
  },

  /**
   * methods
   */
  methods: {
    /**
     * login
     */
    login() {
      this.loading = true;
      this.formError = []
      this.$axios({
        baseURL: process.env.VUE_APP_AUTH_API_ROOT,
        url: 'rest-auth/registration/',
        method: 'post',
        data: this.registerData
      })
          .then(response => {
            this.loading = false;
            let token = response.data.key;

            //set token to store
            if (token) {
              this.$store.dispatch('set_token', token);
              this.setUserDetails();
              this.loading = false;
            }
          })
          .catch(err => {
            this.loading = false;
            if (err.response.data !== undefined) {
              this.formError = err.response.data
            }
          })
    },
  }
}
</script>

<style scoped>

</style>
