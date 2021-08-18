<template>
  <main-layout>

    <div slot="content">

      <card>
        <template slot="header">
          <div>
            <router-link :to="{name: 'Apps'}" class="text-primary font-weight-bold">
              <i class="fas fa-chevron-left"></i> back to apps
            </router-link>
          </div>

        </template>

        <template slot="body">

          <!---------------------------------------------------------------------->
          <!-- App-->
          <!---------------------------------------------------------------------->
          <!---------------------------------------------------------------------->
          <!-- App Menu-->
          <!---------------------------------------------------------------------->
          <app-menu class="d-none d-lg-block" @toggleContent="toggleContent"></app-menu>

          <div :class="'collapse navbar-collapse ' + showClass" id="sidenav-collapse-main">
            <div class="navbar-collapse-header d-md-none">
              <div class="row">
                <div class="col-6 collapse-brand">
                  <a href="#">
                    <img src="/img/icons/favicon.png">
                  </a>
                </div>
                <div class="col-6 collapse-close">
                  <button type="button" class="navbar-toggler" data-toggle="collapse" @click="closeMenu()"
                          aria-controls="sidenav-main" aria-expanded="true"
                          aria-label="Toggle sidenav">
                    <span></span>
                    <span></span>
                  </button>
                </div>
              </div>
            </div>
            <ul class="navbar-nav">
              <app-menu-links></app-menu-links>
            </ul>
          </div>

          <div :class="maxContent" class="content">
            <div class="container-fluid" id="app-views">
              <button @click="openMenu" class="d-block d-lg-none btn btn-white text-primary mb-3">
                <span class="ni ni-align-left-2"></span> Menu </button>


              <!--------------------------------------------------------------------------------------------------------->
              <!-- Station views -->
              <!--------------------------------------------------------------------------------------------------------->
              <vue-page-transition name="page">
                <router-view></router-view>
              </vue-page-transition>

              <div v-if="currentRoute === 'ManageApp'">
                <div class="text-left">
<!--                  <h1 class="text-muted">{{ app.name }}</h1>-->
                  <p class="text-muted"> Click on the menu items in the left to view this application's information.</p>
                </div>
              </div>

            </div>
          </div>

        </template>
      </card>

    </div>

  </main-layout>
</template>

<script>
import AppMenu from "../Components/AppMenu";
import AppMenuLinks from "../Components/AppMenuLinks";

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
      loading: false,
      maxContent: '',
      show_menu: false,
      showClass: ''
    }
  },

  /**
   * components
   */
  components: {AppMenu, AppMenuLinks},

  /**
   * methods
   */
  methods: {
    /**
     * toggleContent
     */
    toggleContent( ) {
      if (this.maxContent === "max-content") {
        this.maxContent = ""
      } else {
        this.maxContent = "max-content"
      }
    },
    /**
     * closeMenu
     */
    closeMenu() {
      this.showClass = " "

    },

    /**
     * openMenu
     */
    openMenu() {
      this.showClass = " show"
    },

  },

  /**
   * computed
   */
  computed : {
    /**
     * currentRoute
     */
    currentRoute() {
      return this.$route.name
    },
  }
}
</script>

<style scoped>
.max-content {
  width: calc(100% - 6rem) !important;
  margin-left: 6rem !important;
  transition: all 0.4s;
}

.content {
  width: calc(100% - 17rem);
  margin-left: 17rem;
  transition: all 0.4s;
}


@media (max-width: 768px) {
  .content {
    width: 100%;
    margin-left: 0rem !important;
    transition: all 0.4s;
  }
}

#app-views {
  min-height: 70vh;
}
</style>
