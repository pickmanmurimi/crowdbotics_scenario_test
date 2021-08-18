<template>
  <div :class="minifyMenu" class="menu">

    <div class="col-12 p-0 mb-3">
      <button v-if="minifyMenu === 'mini-menu'" class="btn btn-white btn-link text-primary" @click="toggleMenu">
        <i class="fas fa-list-ul"></i>
      </button>
      <button v-else class="btn btn-white btn-link text-primary" @click="toggleMenu"><i class="fas fa-stream"></i></button>
    </div>

    <div :class="minifyMenu" class="col-12 mt-2 text-align-center">
      <!--Links-->
      <app-menu-links :minify-menu="minifyMenu"></app-menu-links>
    </div>

  </div>
</template>

<script>
import AppMenuLinks from "./AppMenuLinks";
export default {
  /**
   * name
   */
  name: "AppMenu",

  /**
   * components
   */
  components: {AppMenuLinks},

  /**
   * data
   */
  data() {
    return {
      minifyMenu: ""
    }
  },

  /**
   * created
   */
  created() {
  },

  /**
   * methods
   */
  methods: {

    /**
     * toggleContent
     */
    toggleMenu() {
      if (this.minifyMenu === "mini-menu") {
        this.minifyMenu = ""
      } else {
        this.minifyMenu = "mini-menu"
      }
      this.$emit('toggleContent')
    },
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
