<template>
  <main-layout>

    <div slot="content">

      <card class="pb-9">
        <template slot="header">
          <h5>Account</h5>

        </template>

        <template slot="body">

          <div class="card card-body col-lg-8">
            <h3>Account Details</h3>

            <div class="row pt-5">

              <!---------------------------------------------------------------------->
              <!-- Account Details-->
              <!---------------------------------------------------------------------->
              <div class="col-lg-6">
                <base-input v-model="userdata.first_name" :formError="formError" text="First Name" name="first_name"
                            helper=""></base-input>
              </div>

              <div class="col-lg-6">
                <base-input v-model="userdata.last_name" :formError="formError" text="Last Name" name="last_name"></base-input>
              </div>

              <div class="col-lg-6">
                <base-input v-model="userdata.username" :formError="formError" text="Username" name="username"></base-input>
              </div>

              <div class="col-12"></div>

              <div class="col-lg-6">
                <base-input v-model="userdata.email" :formError="formError" text="Email" name="email"></base-input>
                <small>This email has not been verified. <a href="#" @click="resendEmailVerification">Resend email verification</a></small>
              </div>

              <div class="col-12 mt-lg-5">

                <small class="form-text">Update profile</small>
                <button @click="updateUser" class="btn btn-primary">Update</button>

              </div>


            </div>

          </div>

          <div class="card card-body col-lg-8 mt-3">
            <h3>Password</h3>

            <div class="row pt-5">
              <!---------------------------------------------------------------------->
              <!-- Reset password-->
              <!---------------------------------------------------------------------->
              <div class="col-lg-6">
                <base-input v-model="passwordData.new_password1" type="password" :formError="formError" text="New password"
                            name="new_password1"
                            helper=""></base-input>
              </div>

              <div class="col-lg-6">
                <base-input v-model="passwordData.new_password2" type="password" :formError="formError" text="Confirm new password"
                            name="new_password2"></base-input>
              </div>

              <div class="col-12 mt-lg-5">

                <small class="form-text">Change password</small>
                <button @click="updatePassword" class="btn btn-primary">change password</button>

              </div>


            </div>

          </div>

        </template>
      </card>

    </div>

  </main-layout>
</template>

<script>
import GettingStarted from "../Components/GettingStarted";

export default {
  /**
   * name
   */
  name: "Home",

  /**
   * data
   */
  data() {
    return {
      userdata: {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
      },
      passwordData: {
        new_password1: '',
        new_password2: '',
      },
      formError: {},
    }
  },

  /**
   * created
   */
  created() {
    this.userdata = this.user
  },

  /**
   * components
   */
  components: {GettingStarted},

  /**
   * methods
   */
  methods: {

    /**
     * updateUser
     */
    updateUser() {
      this.$loading(true,"Updating account")
      this.$axios.put('/rest-auth/user/', this.userdata )
          .then(response => {
            swal("Your profile has been updated", "", "success")
                .then(() => {
                  this.setUserDetails(false)
                })
            this.$loading(false)
          })
          .catch(error => {
            this.$loading(false)
            if (error.response.data !== undefined) {
              this.formError = error.response.data
            }
            console.log(error)
          })
    },

    /**
     * updatePassword
     */
    updatePassword() {
      this.$loading(true,"Updating password")
      this.$axios.post('/rest-auth/password/change/', this.passwordData )
          .then(response => {
            swal("Your password has been updated", "", "success")
            this.$loading(false)
          })
          .catch(error => {
            this.$loading(false)
            if (error.response.data !== undefined) {
              this.formError = error.response.data
            }
            console.log(error)
          })
    },

    /**
     * resendEmailVerification
     * the resend email
     */
    resendEmailVerification() {
      this.$loading(true,"Resending verification email")
      this.$axios.get('/rest-auth/user/' )
          .then(response => {
            swal("Verification email sent. Check your email", "", "success")
            this.$loading(false)
          })
          .catch(error => {
            this.$loading(false)
            if (error.response.data !== undefined) {
              this.formError = error.response.data
            }
            console.log(error)
          })
    }
  }
}
</script>

<style scoped>

</style>
