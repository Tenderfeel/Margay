<template>
  <section>
    <h1 class="title">
      WTN
      <span class="green">Margay</span>
    </h1>
    <Logo/>
    <p v-if="user" class="message">
      Hello
      <img :src="user.photo" alt="photo">
      <strong>{{ user.name }}</strong>
    </p>
    <p v-if="user && user.is2FactorAuthed">電話番号階認証済み</p>
    <div class="links">
      <NLink
        v-if="user && ! user.is2FactorAuthed"
        to="/auth"
        class="button--green"
      >Phone Number Linking</NLink>
    </div>
    <div class="links">
      <NLink v-if="!user" to="/login" class="button--green">Login</NLink>
      <button v-else class="button--red" @click="logout">Logout</button>
      <NLink to="/about" class="button--grey">About</NLink>
    </div>
    <div class="links" v-if="user">
      <button class="button--danger" @click="reave">Delete Account</button>
    </div>
  </section>
</template>

<script>
import firebase from "@/firebase/";
import { mapState } from "vuex";
import Logo from "@/components/Logo";
export default {
  components: { Logo },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    async logout() {
      await firebase.auth().signOut();
      this.$store.commit("setUser", null);
    },

    reave() {
      const provider = new firebase.auth.TwitterAuthProvider();
      firebase
        .auth()
        .currentUser.reauthenticateWithPopup(provider)
        .then(() => {
          firebase.auth().currentUser.delete();
          this.$store.commit("setUser", null);
        });
    }
  }
};
</script>

<style scoped>
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 400;
  font-size: 100px;
  color: #2E495E;
  letter-spacing: 1px;
  font-size: 3rem;
}
.green {
  color: #00C48D;
}

.message {
  font-weight: 300;
  font-size: 3em;
  color: #2E495E;
  word-spacing: 5px;
  margin: 15px 0;
}

.links + .links {
  padding-top: 15px;
}
</style>
