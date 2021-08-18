<template>
  <main-layout>

    <div slot="content">

      <card>
        <template slot="header">
          <div>
            <router-link :to="{name: 'Apps'}" class="text-primary font-weight-bold">
              <i class="fas fa-chevron-left"></i> Check out apps
            </router-link>
          </div>

        </template>

        <template slot="body">

          <div class="row justify-content-center pt-5 pb-9">
            <div class="col-md-6 col-xl-4">
              <!---------------------------------------------------------------------->
              <!-- Create an app-->
              <!---------------------------------------------------------------------->
              <h1><img src="/img/icons/favicon.png" class="mr-4" height="40" alt=""> <br>
                Create your app </h1>

              <!---------------------------------------------------------------------->
              <!-- App name-->
              <!---------------------------------------------------------------------->
              <div class="form-group mt-5">
                <p class="font-weight-bold">Application name</p>
                <div class="input-group input-group-alternative">
                  <!-- icon-->
                  <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="ni ni-spaceship"></i></span>
                  </div>

                  <!-- input-->
                  <input
                      class="form-control"
                      v-model="CreateAppData.name"
                      placeholder="Application name"
                      type="text">

                </div>
                <!-- helper text-->
                <small class="text-muted">Pick a unique name for yor app.</small>
                <!-- error-->
                <small class="form-text text-danger" v-if="formError['name']">
                  {{ formError.name[0] }} </small>
              </div>

              <!---------------------------------------------------------------------->
              <!-- App domain-->
              <!---------------------------------------------------------------------->
              <div class="form-group mt-5">
                <p class="font-weight-bold">Domain name</p>
                <div class="input-group input-group-alternative">
                  <!-- icon-->
                  <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="ni ni-world-2"></i></span>
                  </div>

                  <!-- input-->
                  <input
                      class="form-control"
                      v-model="CreateAppData.domain_name"
                      placeholder="Domain name"
                      type="text">

                </div>
                <!-- helper text-->
                <small class="text-muted">Pick a unique domain name for yor app. (Optional)</small>
                <!-- error-->
                <small class="form-text text-danger" v-if="formError['domain_name']">
                  {{ formError.domain_name[0] }} </small>
              </div>



              <!---------------------------------------------------------------------->
              <!-- App description-->
              <!---------------------------------------------------------------------->
              <div class="form-group mt-5">
                <p class="font-weight-bold">Description</p>
                <div class="input-group input-group-alternative">
                  <!-- icon-->
                  <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="ni ni-single-copy-04"></i></span>
                  </div>

                  <!-- input-->
                  <textarea
                      class="form-control"
                      v-model="CreateAppData.description"
                      placeholder="Briefly describe your application"
                      required
                      maxlength="200"
                      type="text"></textarea>

                </div>
                <!-- helper text-->
                <small class="text-muted">Describe what your application will do. </small>
                <small
                  :class="[(200 - CreateAppData.description.length) > 30 ? 'text-success' : 'text-warning']"
                >
                  {{ 200 - CreateAppData.description.length }} characters remaining</small>
                <!-- error-->
                <small class="form-text text-danger" v-if="formError['description']">
                  {{ formError.description[0] }} </small>
              </div>

              <!---------------------------------------------------------------------->
              <!-- select type-->
              <!---------------------------------------------------------------------->
              <p class="font-weight-bold mt-5">Application Type</p>
              <div class="row">
                <!---------------------------------------------------------------------->
                <!-- Web app-->
                <!---------------------------------------------------------------------->
                <div class="col-6 col-xl-4 offset-xl-1 ml-xl--1">
                  <div class="application-type"
                       :class="[ selected_app === 'Web'?  'application-type-selected' : '']"
                       @click="selectType('Web')">
                    <i class="ni ni-world fa-3x"></i> <br>
                  </div>
                  <p class="text-muted text-primary">Web app</p>

                </div>

                <!---------------------------------------------------------------------->
                <!-- Mobile app app-->
                <!---------------------------------------------------------------------->
                <div class="col-6 col-xl-4 offset-xl-1">
                  <div class="application-type "
                       :class="[ selected_app === 'Mobile'?  'application-type-selected' : '']"
                       @click="selectType('Mobile')">
                    <i class="ni ni-app fa-3x"></i> <br>
                  </div>
                  <p class="text-muted text-primary">Mobile App</p>
                </div>
              </div>

              <!-- helper text-->
              <div class="mt-3">
                <small class="text-muted mt-5">Select the type of app you want to create.</small>
              </div>

              <!---------------------------------------------------------------------->
              <!-- Create App-->
              <!---------------------------------------------------------------------->
              <div class="mt-5">
                <button :disabled="!selected_app" @click="createApp" class="btn btn-primary">Create Application</button>
              </div>

              <!---------------------------------------------------------------------->
              <!-- Loader-->
              <!---------------------------------------------------------------------->
              <center-loader color="primary" v-if="loading"></center-loader>

            </div>
          </div>


        </template>
      </card>

    </div>

  </main-layout>
</template>

<script>
import GettingStarted from "../../Home/Components/GettingStarted";

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
      CreateAppData: {
        name: '',
        description: '',
        type: '',
        framework: '',
        domain_name: '',
      },
      selected_app: '',
      formError: {},
      loading: false
    }
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
     * selectedApp
     * @param selectedApp
     */
    selectType(selectedApp) {
      this.CreateAppData.type = selectedApp
      this.CreateAppData.framework = selectedApp === 'Web' ? 'Django' : 'React Native'
      this.selected_app = selectedApp
    },

    /**
     * createApp
     */
    createApp() {
      this.$loading(true, "Creating application.")
      this.$axios.post('/api/v1/apps/', this.CreateAppData )
          .then(response => {
            this.$loading(false);
            swal("Your application has been created", "", "success").then( () => {
              this.$router.push({ name: 'Apps'})
            })
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
.application-type {
  /*background-color: #1e0a45;*/
  color: #1e0a45;
  padding-top: 30px;
  padding-bottom: 30px;
  /*width: 150px;*/
  /*height: 150px;*/
  border-radius: 12px;
  font-weight: bold;
  text-align: center;
  box-shadow: #1e0a45 0px 0px 10px;
  cursor: pointer;
}

.application-type-selected {
  background-color: #1e0a45 !important;
  color: #ffffff !important;
}
</style>
