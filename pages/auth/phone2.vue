<template>
  <section>
    <h2>Phone Number Login</h2>
    <p class="loading" v-if="isLoading">Loading...</p>

    <p>以下のテスト用番号が利用できます）</p>
    <SampleNumbers/>

    <div id="firebase-ui-container" ref="firebaseui"></div>

    <p class="message">何かエラーが発生したときはアカウント消してください</p>

    <NLink to="/" class="button--grey">Back home</NLink>
  </section>
</template>

<script>
/* global require */
// FirebaseUIで電話番号ログインするやつ
import firebase from "@/firebase/";
import { mapState } from "vuex";
import SampleNumbers from "@/components/SampleNumbers";

export default {
  name: "Auth",

  components: { SampleNumbers },

  validate({ store, redirect }) {
    if (store.state.user && store.state.user.is2FactorAuthed) {
      return redirect("/");
    }
    return true;
  },

  data() {
    return {
      phoneNumber: null,
      ui: null,
      isLoading: true,
      error: null
    };
  },

  computed: {
    ...mapState(["user"])
  },

  async asyncData({ app }) {
    const firebaseui = await require("firebaseui");

    const ui = new firebaseui.auth.AuthUI(firebase.auth());

    return { ui };
  },

  async mounted() {
    this.isLoading = false;

    this.ui.start(this.$refs.firebaseui, {
      signInFlow: "popup",
      callbacks: {
        signInSuccessWithAuthResult: (
          { user, isNewUser, credential },
          redirectUrl
        ) => {
          console.info("Signin success 😸");
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
      signInOptions: [
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          defaultCountry: "JP",
          whitelistedCountries: ["JP", "+81"]
        }
      ],
      tosUrl: "https://xpbrg.sse.codesandbox.io/about",
      privacyPolicyUrl: "https://xpbrg.sse.codesandbox.io/about"
    });
  },

  beforeDestroy() {
    this.ui.delete();
  }
};
</script>

<style>
input {
  line-height: 2;
  font-size: 1.5rem;
  padding: 0.3rem;
  border-radius: 0.3rem;
  box-shadow: none;
  border: solid 1px #ccc;
  display: block;
  margin: 0.5rem auto;
}

.error {
  color: tomato;
  margin-bottom: 1rem;
}

button[type="submit"] {
  margin-top: 1rem;
}

pre {
  background: #2e3131;
  color: #fff;
  padding: 1rem;
  margin: 0 1rem 1rem;
  white-space: pre-line;
  line-height: 2;
}

p {
  margin-top: 1rem;
}

.message {
  font-size: 0.9rem;
  margin: 1rem;
}
</style>
