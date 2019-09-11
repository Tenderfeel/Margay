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
      <p>Firebaseを試すだけのデモアプリです。</p>
      <h2>Firebase Authentication を使ってみての覚書 一覧</h2>
      <ol>
        <li>
          <a href="https://tenderfeel.xsrv.jp/javascript/3606/">[JS] メールアドレス認証</a>
        </li>
        <li>
          <a href="https://tenderfeel.xsrv.jp/javascript/3665/">[Nuxt.js] ServiceWorkerによるセッション管理</a>
        </li>
        <li>
          <a href="https://tenderfeel.xsrv.jp/javascript/3787/">[JS] OAuth認証</a>
        </li>
        <li>
          <a href="https://tenderfeel.xsrv.jp/javascript/3820/">[JS] エラーメッセージの日本語化</a>
        </li>
        <li>
          <a href="https://tenderfeel.xsrv.jp/javascript/4403/">[JS] 電話番号認証</a>
        </li>
      </ol>
      <p>
        <a href="https://twitter.com/Tenderfeel">@Tenderfeel</a>
        <br>
        <a href="https://tenderfeel.xsrv.jp">WebTecNote</a>
      </p>
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
h2 {
  margin-top: 2rem;
  font-size: 1.2rem;
}
.name {
  color: #00C48D;
}
p {
  margin-top: 20px;
}
ol {
  text-align: left;
}
</style>
