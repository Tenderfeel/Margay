<template>
  <div class="secret">
    <h1>Super secret page</h1>
    <p>Fucntions</p>
    <div class="links">
      <button class="button--green" type="button" @click.prevent="onHelloWorld">HelloWorld</button>
    </div>
    <NLink to="/" class="button--grey">Back home</NLink>
  </div>
</template>
<script>
import firebase from "@/firebase/";

export default {
  name: 'SecretIndex',

  methods: {
    onHelloWorld() {
      firebase.functions().httpsCallable('helloWorld')
      .then((result) => {
        console.log(result)
      })
    }
  }
};
</script>
<style scoped>
h1 {
  margin-bottom: 2rem;
}
p {
  margin: 1rem;
}
.button--grey {
  margin-top: 2rem;
}
</style>

