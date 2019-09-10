<template>
  <div class="container">
    <Nuxt/>
  </div>
</template>
<script>
export default {
  middleware: "auth"
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  color: #2E495E;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

[class^="button"] {
  display: inline-block;
  border-radius: 4px;
  text-decoration: none;
  display: inline-flex;
  align-self: center;
  font-size: inherit;
  line-height: 1.5;
  padding: 10px 30px;
  background: #fff;
  cursor: pointer;
}

[class^="button"] + [class^="button"] {
  margin-left: 1rem;
}

.button--green {
  border: 1px solid #00C48D;
  color: #00C48D;
}

.button--green:hover {
  color: #fff;
  background-color: #00C48D;
}

.button--grey {
  border: 1px solid #2E495E;
  color: #2E495E;
}

.button--grey:hover {
  color: #fff;
  background-color: #2E495E;
}

.button--red {
  color: #c91010;
  border: 1px solid #c91010;
}

.button--red:hover {
  color: #fff;
  background-color: #c91010;
}

.button--danger {
  color: red;
  border: double 3px red;
}

.button--danger:hover {
  background: red;
  color: #fff;
}

.loading {
  padding: 2rem;
  text-align: center;
  animation: bounce ease 1s;
  animation-iteration-count: infinite;
  transform-origin: 50% 50%;
  animation-fill-mode: forwards; /*when the spec is finished*/
}

@keyframes bounce {
  0% {
    transform: translate(0px, 0px);
  }
  23% {
    transform: translate(0px, 0px);
  }
  50% {
    transform: translate(0px, -0.5rem);
  }
  76% {
    transform: translate(0px, 0.2rem);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
</style>
