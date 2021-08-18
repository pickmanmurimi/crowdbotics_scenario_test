<template>
  <div>

    <div class="row">

      <div class="col-12">
        <!---------------------------------------------------------------------->
        <!-- Search -->
        <!---------------------------------------------------------------------->
        <div class="form-group col-12 col-lg-6 mt-5">
          <div class="input-group input-group-alternative">
            <!-- icon-->
            <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="fas fa-search"></i></span>
            </div>

            <!-- input-->
            <input
                class="form-control"
                v-model="search"
                placeholder="Search"
                type="text">

          </div>
          <!-- helper text-->
          <small class="text-muted">Search for an application</small>
        </div>
      </div>

      <div v-for="app in appsList" :key="app.id" class="col-lg-4 p-xl-5 p-5">

        <card header-bg="triangles-bg">
          <template slot="header">
            <div class="row justify-content-center p-5 screenshot">
              <div class="avatar bg-white text-primary rounded-circle">
                <i v-if="app.type === 'Web'" class="ni ni-world fa-3x"></i>
                <i v-else class="ni ni-app fa-3x"></i>
              </div>

            </div>

          </template>

          <template slot="body">
            <div class="text-left">
              <h1 class="mr-4 text-primary"> {{ app.name }} </h1>
              <h1 class="mr-4 text-primary"> {{ app.type }}  </h1>

              <p>
                {{ app.description }}
              </p>

              <div class="mt-4">
                <router-link :to="{ name: 'BasicInfo', params: { app_id : app.id }}"
                    class="btn btn-link text-primary btn-sm"> Manage <i class="fas fa-chevron-right"></i> </router-link>
              </div>
            </div>

          </template>
        </card>

      </div>

    </div>

  </div>
</template>

<script>
export default {
  /**
   * name
   */
  name: "AppsList",

  /**
   * props
   */
  props : {
    apps : {
      type: Array,
      required : true
    }
  },

  /**
   * data
   */
  data() {
    return {
      search: '',
      appsList: this.apps
    }
  },

  /**
   * watch
   */
  watch : {
    /**
     * search
     */
    search( value ) {
      if ( value !== '') {
        this.appsList = this.apps.filter( app => {
          return app.name.toLowerCase().includes(value.toLowerCase())
        } )
      } else {
        this.appsList = this.apps
      }
    }
  }
}
</script>


<style scoped>
.avatar {
  position: absolute;
  top: -25px;
  box-shadow: #0a0c0d 0 0 5px 1px;
  height: 70px;
  width: 70px;
}

.screenshot {
  min-height: 150px;
}
</style>
