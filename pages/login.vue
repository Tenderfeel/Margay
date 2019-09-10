<template>
  <section>
    <h2>Login</h2>
    <p class="loading" v-if="isLoading">Loading...</p>
    <div id="firebase-ui-container" ref="firebaseui"></div>
    <NLink to="/" class="button--grey">Back home</NLink>
  </section>
</template>

<script>
/* global require */
import firebase from "@/firebase/";

export default {
  name: "Login",

  validate({ store, redirect }) {
    if (store.state.user) {
      return redirect("/");
    }
    return true;
  },

  data() {
    return {
      isLoading: true
    };
  },

  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.firebase.com/libs/firebaseui/4.2.0/firebaseui.css"
        }
      ]
    };
  },

  async asyncData({ app }) {
    const firebaseui = await require("firebaseui");

    const ui = new firebaseui.auth.AuthUI(firebase.auth());

    return { ui };
  },

  mounted() {
    this.ui.start(this.$refs.firebaseui, {
      signInFlow: "popup",
      callbacks: {
        signInSuccessWithAuthResult: (
          { user, isNewUser, credential },
          redirectUrl
        ) => {
          console.info("signIn success😸");
          this.$store.commit("setUser", user);
          return this.$router.push("/");
        },
        signInFailure: error => {
          console.error(error);
          this.$store.commit("setUser", null);
        },
        uiShown: () => {
          this.isLoading = false;
        }
      },
      signInOptions: [firebase.auth.TwitterAuthProvider.PROVIDER_ID],
      tosUrl: "https://xpbrg.sse.codesandbox.io/about",
      privacyPolicyUrl: "https://xpbrg.sse.codesandbox.io/about"
    });
  },

  beforeDestroy() {
    this.ui.delete();
  }
};
</script>
