<template>
  <v-ons-dialog cancelable
    :visible.sync="dialogVisible"
  >
    <p style="text-align: center">
      <strong>Login</strong>
    </p>
    <p style="padding: 1em" v-show="cordova">
      You need to login with Facebook if you save session to favorites.
      <p style="text-align: center">
        <ons-button @click="authFacebook">
          Connect with Facebook
        </ons-button>
      </p>
    </p>
    <p style="padding: 1em" v-show="!cordova">
      <ons-button @click="login">Login</ons-button>
    </p>
  </v-ons-dialog>
</template>
<script>
export default{
  data() {
    const data = {
      cordova: false,
      userName: 'test',
      password: 'test'
    }
    return data;
  },
  props: ['ncmb', 'dialogVisible'],
  created() {
    this.$ons.ready(() => {
      this.cordova = this.$ons.isWebView();
    });
  },
  methods: {
    authFacebook() {
      const me = this;
      this.facebookAuth()
        .then(res => {
          const auth = res.authResponse;
          const expire_date = new Date(auth.expiresIn * 1000 + (new Date()).getTime()).toJSON();
          const date = {
            __type: "Date",
            iso: expire_date
          };
          const authData = {
            id: auth.userID,
            access_token: auth.accessToken,
            expiration_date: date
          };
          return this.ncmb.login(authData)
        })
        .then((user) => {
          me.$emit('closeDialog');
        })
        .catch(err => {
          alert(JSON.stringify(err));
          console.log(err);
        })
    },
    login() {
      const me = this;
      this.ncmb
        .idAuth(this.userName, this.password)
        .then(res => {
          me.$emit('closeDialog');
        })
    },
    facebookAuth() {
      return new Promise((res, rej) => {
        facebookConnectPlugin.login(
          ['email', 'public_profile'],
          (success) => res(success),
          (error) => rej(error)
        )
      })
    }
  }
}
</script>