<template>

      <!--Links-->
      <nav class="navbar-light bg-white">
        <ul class="navbar-nav">

          <div v-for=" route in routes " :key="route.id">
            <template v-if="route.meta.ManageAppMenu">
              <li v-if="can(route.meta.permission)" class="nav-item mb-2">
                <router-link :to="{ name: route.name }" class="nav-link">
                  <i :class="route.meta.icon" class="text-primary"></i>
                  <span :class="minifyMenu" class="nav-link-text nav-text">
                  {{ route.meta.title ? route.meta.title : route.name }}
                </span>
                </router-link>
              </li>
            </template>

          </div>


        </ul>
      </nav>
</template>

<script>
export default {
  /**
   * name
   */
  name: "AppMenu",

  /**
   * props
   */
  props: {
    minifyMenu : {
      required: false
    }
  },

  /**
   * computed properties
   */
  computed: {
    /**
     * routes
     */
    routes() {
      return this.$router.options.routes.find(i => i.name === "ManageApp").children
    },
  }

}
</script>

<style scoped>

.menu {
  width: 17rem;
  position: absolute;
  max-height: calc(100% - 155px);
  overflow-y: auto;
  /*border-right: 1px solid rgba( 128, 128, 128, 0.1);*/
  transition: all 0.4s;
}

.mini-menu {
  width: 6rem !important;
  transition: all 0.4s;
}

.nav-text {
  padding-left: 20px;
}

.nav-link {
  padding-top: 1rem;
  padding-bottom: 1rem;
  transition: all 0.4s;
}

.nav-link:hover {
  background: #f6f9fc;
  margin-right: .5rem;
  padding-right: 1rem;
  padding-left: 1rem;
  border-radius: .375rem;
  transition: all 0.4s;
}

.mini-menu.nav-text {
  display: none !important;
  transition: all 0.4s;
}

.mini-menu.text-align-center {
  text-align: center;
}

.menu::-webkit-scrollbar {
  width: 5px; /* width of the entire scrollbar */
}

.menu::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.1); /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
}

.router-link-active {
  top: 0.25rem;
  bottom: 0.25rem;
  left: 0;
  right: auto;
  border-left: 4px solid #1e0a45 ;
  border-bottom: 0;

  margin-right: .5rem;
  padding-right: 1rem;
  padding-left: 1rem;
  border-radius: .375rem;
  background: #f6f9fc;
}
</style>
