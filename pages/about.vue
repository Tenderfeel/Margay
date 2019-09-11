<template>
  <div class="container">
    <div>
      <h1>
        What is
        <span class="name">Margay</span>?
      </h1>
      <p>
        <a
          href="https://en.wikipedia.org/wiki/Margay"
          target="_blank"
          rel="nofollow noopener"
        >😼Wikipedia Margay</a>
      </p>
      <p>Firebaseを試すだけのデモアプリなので認証以外は特に何もしません。</p>
      <p>
        <NLink to="/" class="button--grey">Back home</NLink>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  asyncData() {
    return {
      name: process.server ? "server" : "client"
    };
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
h1 {
  font-weight: 400;
}
.name {
  color: #00C48D;
}
p {
  margin-top: 20px;
}
</style>
