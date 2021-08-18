<template>
  <div>
    <h3>Settings</h3>
    <button @click="deleteApp" class="btn btn-danger">Delete</button>
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
      app: {},
      loading: false
    }
  },

  /**
   * mounted
   */
  mounted() {
  },

  /**
   * methods
   */
  methods: {
    /**
     * deleteApp
     */
    deleteApp() {

      swal({
        dangerMode: true,
        icon: "warning",
        title: "Are you sure you want to delete your app?",
        text: "This action cannot be undone",
        buttons: [ "Cancel", "OK"]
      }).then( ok => {
        if(ok) {
          this.$loading(true, "Deleting Application")

          this.$axios.delete(`/api/v1/apps/${this.app_id}`)
              .then(response => {
                this.$loading(false);
                swal("Application deleted", "", "success")
                .then( () => { this.$router.push({ name: 'Apps'})})
              })
              .catch(error => {
                this.$loading(false);
                console.log(error)
              })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
