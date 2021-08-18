<template>
  <div>
    <!---------------------------------------------------------------------->
    <!-- Create an app-->
    <!---------------------------------------------------------------------->
    <h1 class="mt-2 mb-5">
      <img src="/img/icons/favicon.png" class="mr-4" height="40" alt=""> <br>
      Lets Create an app to get started </h1>

    <card>

      <template slot="header">
        <div class="d-flex">
          <h2 class="mr-4">Create an app </h2>
        </div>

      </template>

      <template slot="body">
        Scaffold and deploy a working app in just a few minutes.

        <div class="mt-4">
          <router-link :to="{ name: 'CreateApp'}" class="btn btn-primary"> Create App</router-link>
        </div>
      </template>

    </card>
  </div>
</template>

<script>
export default {
  /**
   * name
   */
  name: "GettingStarted"
}
</script>

<style scoped>

</style>
