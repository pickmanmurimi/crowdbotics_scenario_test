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
                      <h3>Password Reset</h3>
                      <p>Enter your email to recover your password.</p>
                    </div>

                    <!------------------------------------------------------------------------------------------------->
                    <!-- Form -->
                    <!------------------------------------------------------------------------------------------------->
                    <div class="text-left">

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
                              v-model="passwordResetData.email"
                              placeholder="Email"
                              type="email"
                              :disabled="loading">

                        </div>
                        <!-- error-->
                        <small class="form-text text-danger" v-if="formError['email']"> {{
                            formError.email[0]
                          }} </small>
                      </div>

                      <!----------------------------------------------------------------------------------------------->
                      <!-- Loader -->
                      <!----------------------------------------------------------------------------------------------->
                      <center-loader color="warning" v-if="loading"></center-loader>

                      <!----------------------------------------------------------------------------------------------->
                      <!-- sign in -->
                      <!----------------------------------------------------------------------------------------------->

                      <div class="text">
                        <button :disabled="loading" type="button" @click="resetPassword()"
                                class="btn btn-primary my-4"> Reset Password
                        </button>
                      </div>

                      <!----------------------------------------------------------------------------------------------------->
                      <!-- Forgot Password -->
                      <!----------------------------------------------------------------------------------------------------->
                      <div class="row mt-3">
                        <div class="col-12">
                          <router-link :to="{ name: 'Register'}" class="text-primary"><small>Not registered? Register</small></router-link>
                          <br>
                          <router-link :to="{ name: 'Login'}" class="text-primary"><small>Login</small></router-link>
                        </div>
                      </div>

                    </div>
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
   * @return {{passwordResetData: {password: string, email: string}, formError: []}}
   */
  data() {
    return {
      passwordResetData: {
        email: '',
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
     * resetPassword
     */
    resetPassword() {
      this.loading = true;
      this.formError = []
      this.$axios({
        url: 'rest-auth/password/reset/',
        method: 'post',
        data: this.passwordResetData
      })
          .then(response => {
            this.loading = false;
            swal("Password reset e-mail has been sent.", "", "success")
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
