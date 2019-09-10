<template>
  <section>
    <h2>Phone Number Linking</h2>
    <p class="loading" v-if="isLoading">Loading...</p>

    <!-- 電話番号入力＆vericationIdなしで表示-->
    <form v-if="isShowPhoneNumberInput" @submit.prevent="handlePhoneNumberSubmit">
      <p>確認コードを送信する電話番号を入力してください
        <br>（以下のテスト用番号も利用できます）
      </p>
      <pre>電話番号（確認コード）
        +1 650-555-3434（123456）
        +81 90-1234-5678（123456）
        +84 841 755 601（825467）
        +81 90-3214-9875（986143）
      </pre>
      <div>
        <input type="phone" v-model="phoneNumber" @input="error = null">
        <p v-if="error && error.type === 'phone'" class="error">{{ error.message }}</p>
      </div>
      <button type="submit" class="button--green">Submit</button>
    </form>
    <!-- reCAPTCHA -->
    <div id="recaptcha-container" ref="recaptcha" v-show="isShowRecaptcha"></div>

    <!-- 電話番号入力済み＆vericationId取得済み＆verificationCodeなしで表示 -->
    <form v-if="isShowVerificationCodeInput" @submit.prevent="handleVerificationCodeSubmit">
      <p>携帯端末に送信された確認コードを入力してください</p>
      <pre>電話番号（確認コード）
        +1 650-555-3434（123456）
        +31 85 730 0812（971520）
        +55 21 75214-6325（716561）
        +81 90-1234-5678（123456）
        +84 841 755 601（825467）
        +221 263878910（582412）
      </pre>
      <input type="number" v-model="verificationCode" maxlength="6" minlength="6">
      <button type="submit" class="button--green">Submit</button>
    </form>

    <p class="message">なにかエラーが発生したときはアカウント消すこと</p>

    <NLink to="/" class="button--grey">Back home</NLink>
  </section>
</template>

<script>
/* global require */
//https://firebase.google.com/docs/auth/web/phone-auth
import firebase from "@/firebase/";
import { mapState } from "vuex";
export default {
  name: "Auth",

  validate({ store, redirect }) {
    if (store.state.user && store.state.user.is2FactorAuthed) {
      return redirect("/");
    }
    return true;
  },

  data() {
    return {
      phoneNumber: null,
      isVaridPhone: false,
      verificationCode: null,
      verificationId: null,
      AWPhoneNum: null,
      isShowRecaptcha: true,
      isLoading: true,
      error: null
    };
  },

  computed: {
    ...mapState(["user"]),
    isShowPhoneNumberInput() {
      return !this.isVaridPhone && !this.verificationId;
    },
    isShowVerificationCodeInput() {
      return this.isVaridPhone && this.verificationId && !this.phoneCredential;
    }
  },

  async asyncData({ app }) {
    // https://github.com/grantila/awesome-phonenumber
    const AWPhoneNum = await require("awesome-phonenumber");

    return { AWPhoneNum };
  },

  async mounted() {
    // reCAPTCHA ベリファイア オブジェクトを作成
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        // ユーザーが正常な応答を送信したときに実行される
        callback: responseToken => {
          console.log("reCAPTCHA successful");
          try {
            this.isShowRecaptcha = false;
          } catch (e) {}
        },

        //reCAPTCHA応答が期限切れになり、ユーザーが再検証する必要があるときに実行される
        "expired-callback": function() {
          console.log("reCAPTCHA Response expired");
        },

        // reCAPTCHAでエラー（通常はネットワーク接続）が発生し、接続が復元されるまで続行できない場合に実行される
        "error-callback": function() {
          console.log("reCAPTCHA error");
        }
      }
    );

    //this.recaptchaWidgetId = await this.recaptchaVerifier.render();
    this.isLoading = false;
  },

  beforeDestroy() {
    this.PhoneNumber = null;
    try {
      this.recaptchaVerifier.clear();
    } catch (e) {}
  },

  methods: {
    /**
     * @props {{type: string, message: string}} error
     */
    setError(error) {
      this.error = error;
    },

    async handlePhoneNumberSubmit() {
      console.log("🐱 handlePhoneNumber");

      const provider = new firebase.auth.PhoneAuthProvider();
      const pn = new this.AWPhoneNum(this.phoneNumber, "JP");

      if (!pn.isValid()) {
        return this.setError({
          type: "phone",
          message: "無効な電話番号です"
        });
      }

      if (!pn.isMobile()) {
        return this.setError({
          type: "phone",
          message: "携帯端末の番号ではありません"
        });
      }

      this.isVaridPhone = true;

      try {
        // 指定された電話番号に確認コードを送信する
        // firebase.auth.PhoneAuthProvider.credentialに渡すIDが返される
        this.verificationId = await provider.verifyPhoneNumber(
          pn.getNumber(),
          this.recaptchaVerifier
        );
      } catch (e) {
        this.isVaridPhone = false;
        this.verificationId = null;
        console.error("😹 verifyPhoneNumber", e);
      }
    },

    // 確認コードが入力された
    async handleVerificationCodeSubmit() {
      console.log("🐱 handleVerificationCodeSubmit");

      this.isLoading = true;

      try {
        //電話認証資格情報を作成
        this.phoneCredential = await firebase.auth.PhoneAuthProvider.credential(
          this.verificationId,
          this.verificationCode
        );

        // 認証情報をリンク
        const { user } = await firebase
          .auth()
          .currentUser.linkWithCredential(this.phoneCredential);

        this.isLoading = false;
        console.log("😸 Account linking success");
        this.$store.commit("setUser", user);
        this.$router.push("/");
      } catch (e) {
        this.phoneCredential = null;
        console.error("😹 handleVerificationCodeSubmit", e);
      }
    }
  }
};
</script>

<style>
form {
  margin: 2rem;
}
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

#recaptcha-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem auto;
}

button[type="submit"] {
  margin-top: 1rem;
}

pre {
  background: #2e3131;
  color: #fff;
  padding: 1rem;
  margin: 1rem;
  white-space: pre-line;
  line-height: 2;
}

.message {
  font-size: 0.9rem;
  margin: 1rem;
}
</style>
