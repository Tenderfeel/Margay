import firebase from "@/firebase/";

export const state = () => ({
  user: null
});

export const getters = {};

export const actions = {
  async nuxtServerInit({ commit }, { app }) {
    let user = await app.$_firebase.auth().currentUser;

    commit("setUser", user);
  }
};

export const mutations = {
  setUser(state, user) {
    if (user) {
      state.user = {
        name: user.displayName,
        photo: user.photoURL,
        is2FactorAuthed:
          user.providerData.filter(p =>
            [
              firebase.auth.TwitterAuthProvider.PROVIDER_ID,
              firebase.auth.PhoneAuthProvider.PROVIDER_ID
            ].includes(p.providerId)
          ).length === 2
      };
    } else {
      state.user = null;
    }
  }
};
