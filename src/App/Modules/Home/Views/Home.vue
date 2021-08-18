<template>
  <main-layout>

    <div slot="content">

      <card class="pb-9">
        <template slot="header">
          <h5>Home</h5>

        </template>

        <template slot="body">

          <div class="row justify-content-center pt-5">
            <div class="col-md-6 col-xl-4">

              <!---------------------------------------------------------------------->
              <!-- Create an app-->
              <!---------------------------------------------------------------------->
              <getting-started></getting-started>

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
   * components
   */
  components: {GettingStarted},
}
</script>

<style scoped>

</style>
