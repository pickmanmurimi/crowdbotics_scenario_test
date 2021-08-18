<template>
  <div>
    <h3>Basic Info</h3>
    <div class="row mt-3">

      <div class="col-lg-4">
        <base-input v-model="app.name" :formError="formError" text="Application name" name="name"
                    helper="unique name for yor application"></base-input>
      </div>

      <div class="col-lg-8">

        <div class="form-group">
          <small class="form-control-label d-block mb-2 text-capitalize">Description</small>
          <div class="input-group input-group-alternative">
            <!-- icon-->
            <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="ni ni-single-copy-04"></i></span>
            </div>

            <!-- input-->
            <textarea
                class="form-control"
                v-model="app.description"
                placeholder="Briefly describe your application"
                required
                maxlength="200"
                type="text"></textarea>

          </div>
          <!-- helper text-->
          <small class="text-muted">Describe what your application will do. </small>
          <small
              :class="[(200 - app.description.length) > 30 ? 'text-success' : 'text-warning']"
          >
            {{ 200 - app.description.length }} characters remaining</small>
          <!-- error-->
          <small class="form-text text-danger" v-if="formError['description']">
            {{ formError.description[0] }} </small>
        </div>

      </div>

      <div class="col-lg-4">
        <base-input v-model="app.domain_name" :formError="formError" text="Domain Name" name="description"
                    helper="Domain name"></base-input>
      </div>

      <div class="col-lg-8">
      </div>

      <div class="col-lg-4">
        <p>Framework</p>
        <p>{{ app.framework }}</p>
      </div>

      <div class="col-lg-4">
        <p>Type</p>
        <p>{{ app.type }}</p>
      </div>

      <div class="col-lg-12 border-top p-3">
        <button @click="editApp" class="btn btn-primary">Edit application</button>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  /**
   * name
   */
  name: "Home",

  /**
   * props
   */
  props: {
    app_id: {
      required: true,
    }
  },

  /**
   * data
   */
  data() {
    return {
      app: {
        name : '',
        framework : '',
        description: '',
        type : '',
      },
      loading: false,
      formError: {}
    }
  },

  /**
   * mounted
   */
  mounted() {
    this.getApp()
  },

  /**
   * methods
   */
  methods: {

    /**
     * editApp
     */
    editApp() {

      this.$loading(true, "Editing Application")

      this.$axios.patch(`/api/v1/apps/${this.app_id}`, this.app )
          .then(response => {
            this.$loading(false);
            this.getApp()
            this.app = response.data
          })
          .catch(error => {
            this.$loading(false);
            if (error.response.data !== undefined) {
              this.formError = error.response.data
            }
            console.log(error)
          })
    },

    /**
     * getApp
     */
    getApp() {

      this.$loading(true, "Getting Application")

      this.$axios.get(`/api/v1/apps/${this.app_id}`)
          .then(response => {
            this.$loading(false);
            this.app = response.data
          })
          .catch(error => {
            this.$loading(false);
            console.log(error)
          })
    }
  }
}
</script>

<style scoped>

</style>
