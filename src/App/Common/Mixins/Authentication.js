import {mapGetters} from "vuex";

let Authentication = {

    /**
     * data
     */
    data() {
        return {
            authentication_loader: false
        }
    },

    /**
     * authentication mixin methods
     */
    methods: {

        /**
         * setUserDetails
         */
        setUserDetails(redirect = true) {
            this.authentication_loader = true
            this.$loading(true,"Getting user details")
            // user/me
            this.$axios.get('/rest-auth/user/')
                .then(response => {
                    let user = response.data;

                    //store user
                    if (user) {
                        this.$store.dispatch('set_user', user);
                        this.authentication_loader = false
                        this.$loading(false);
                        // redirect to home
                        if (redirect)
                            this.$router.push({name: 'Home'});
                    }

                })
                .catch(error => {
                    this.authentication_loader = false
                    this.$loading(false);
                    this.logout()
                    console.log(error)
                })
        },

        /**
         * logout
         */
        logout: function () {
            this.authentication_loader = true;
            this.$axios.post('/rest-auth/logout/').then(() => {
                this.authentication_loader = false;
                this.$store.dispatch('logout').then();
            }).catch(err => {
                this.authentication_loader = false;
                this.$store.dispatch('logout').then();
                console.log(err)
            })
        },
    },

    /**
     * computed
     */
    computed: {
        ...mapGetters([
            'isAuthenticated',
            'user'
        ])
    }
}

export default Authentication;
