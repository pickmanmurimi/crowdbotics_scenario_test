<template>
  <div>
    <h3>Plans</h3>
    <p v-if="activeSubscription === undefined || ! activeSubscription.active">Please select a subscription plan</p>
    <p v-else>Change your applications plan</p>


    <!---------------------------------------------------------------------->
          <!-- Plans-->
          <!---------------------------------------------------------------------->
          <div class="row justify-content-center mt-7 mb-7">

            <div class="col-12 mb-5 col-xl-4" v-for="plan in plans " :key="plan.id">
              <div class="">
                <card header-bg="triangles-bg">

                  <template slot="header">
                    <div class="row justify-content-center">
                      <div class="avatar bg-white rounded-circle">
                        <img src="/img/icons/favicon.png" alt="">
                      </div>
                    </div>
                    <div class="text-center mt-3">
                      <h1 class="mr-4 text-white"> $ {{ plan.price }} </h1>
                      <h1 class="mr-4 text-white"> {{ plan.name }} </h1>
                    </div>

                  </template>

                  <template slot="body">
                    <div class="text-center">
                      <p v-if="checkSubscription(plan)"> Currently active </p>

                      {{ plan.description }}


                      <div class="mt-4">
                        <button v-if="checkSubscription(plan)" class="btn btn-primary" @click="unsubscribe( plan )"> Unsubscribe </button>
                        <button v-else-if="activeSubscription !== undefined "
                                class="btn btn-primary" @click="changeSubscription( plan )"> Subscribe </button>
                        <button v-else class="btn btn-primary" @click="subscribe( plan )"> Subscribe </button>
                      </div>
                    </div>

                  </template>

                </card>
              </div>

            </div>

          </div>

  </div>
</template>

<script>

export default {
  /**
   * name
   */
  name: "Plans",

  /**
   * props
   */
  props: {
    app_id : {
      required: true
    }
  },

  /**
   * data
   */
  data() {
    return {
      plans: [],
      activeSubscription: {},
      subscriptions: []
    }
  },

  /**
   * mounted
   */
  mounted() {
    this.getPlans()
  },

  /**
   * methods
   */
  methods : {
    /**
     * getPlans
     */
    getPlans() {
      this.$loading(true, "Getting Plans")

      this.$axios.get('/api/v1/plans/')
          .then(response => {
            this.$loading(false)
            this.plans = response.data
            this.getSubscriptions()
          })
          .catch(error => {
        this.$loading(false)
        console.log(error)
      })
    },

    /**
     * getSubscriptions
     */
    getSubscriptions() {
      this.$loading(true, "Getting subscriptions")

      this.$axios.get('/api/v1/subscriptions/')
          .then(response => {
            this.$loading(false)
            this.subscriptions = response.data
            this.setActiveSubscription()

          })
          .catch(error => {
            this.$loading(false)
            console.log(error)
          })
    },

    /**
     * setActiveSubscription
     */
    setActiveSubscription() {
      this.activeSubscription = this.subscriptions.find( subscription => {
        return subscription.app ===  Number(this.app_id)
      })

    },

    /**
     * subscribe
     */
    subscribe( plan ) {
      this.$loading(true, "Subscribing")

      const subscription = {
        plan : plan.id,
        app: this.app_id,
        active: true
      }

      this.$axios.post('/api/v1/subscriptions/', subscription)
          .then(response => {
            this.$loading(false)
            swal(`Successfully subscribed to the ${plan.description}`, "", "success").then(() => {
              this.getPlans()
            })
          })
          .catch(error => {
            this.$loading(false)
            console.log(error)
          })
    },

    /**
     * subscribe
     */
    unsubscribe( plan  ) {
      this.$loading(true, "Subscribing")

      const subscription = {
        plan : plan.id,
        app: this.app_id,
        active: false
      }

      this.$axios.put(`/api/v1/subscriptions/${this.activeSubscription.id}`, subscription)
          .then(response => {
            this.$loading(false)
            swal(`Successfully unsubscribed from the ${plan.description}`, "", "success")
            this.getPlans()
          })
          .catch(error => {
            this.$loading(false)
            console.log(error)
          })
    },

    /**
     * changeSubscription
     */
    changeSubscription( plan  ) {
      this.$loading(true, "Subscribing")

      const subscription = {
        plan : plan.id,
        app: this.app_id,
        active: true
      }

      this.$axios.put(`/api/v1/subscriptions/${this.activeSubscription.id}`, subscription)
          .then(response => {
            this.$loading(false)
            swal(`Successfully subscribed to the ${plan.description}`, "", "success")
            this.getPlans()
          })
          .catch(error => {
            this.$loading(false)
            console.log(error)
          })
    },

    /**
     * checkSubscription
     * @param plan
     */
    checkSubscription( plan ) {
      return this.activeSubscription !== undefined &&
          this.activeSubscription.plan === plan.id && this.activeSubscription.active
    }

  }
}
</script>

<style scoped>
.avatar {
  position: absolute;
  top: -25px;
}
</style>
