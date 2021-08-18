<template>
  <main-layout>

    <div slot="content">

      <card>
        <template slot="header">
          <div>
            <router-link :to="{ name: 'CreateApp'}" class="btn btn-primary"> Create new App</router-link>
          </div>

        </template>

        <template slot="body">

          <div v-if="apps.length === 0" class="row justify-content-center pt-5 pb-9">
            <div class="col-md-6 col-xl-4">
              <!---------------------------------------------------------------------->
              <!-- Create an app-->
              <!---------------------------------------------------------------------->
              <getting-started v-if="!loading"></getting-started>

            </div>
          </div>

          <div v-else>
            <!---------------------------------------------------------------------->
            <!-- Apps-->
            <!---------------------------------------------------------------------->

            <h1>Apps</h1>
            <apps-list :apps="apps"></apps-list>


          </div>

        </template>
      </card>

    </div>

  </main-layout>
</template>

<script>
import GettingStarted from "../../Home/Components/GettingStarted";
import AppsList from "../Components/AppsList";

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
      apps: [],
      loading: false
    }
  },

  /**
   * components
   */
  components: {AppsList, GettingStarted},

  /**
   * mounted
   */
  mounted() {
    this.getApps()
  },

  /**
   * methods
   */
  methods: {
    /**
     * getApps
     */
    getApps() {
      this.loading = true;
      this.$loading(true, "Getting Applications")

      this.$axios.get('/api/v1/apps/')
          .then(response => {
            this.$loading(false);
            this.loading = false
            this.apps = response.data
          }).catch(error => {
        this.loading = false
        this.$loading(false)
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
