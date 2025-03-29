
import LoginWallet from "./components/LoginWallet.vue";

export default {
    install: (app, options) => {
      app.component("login-wallet", LoginWallet);
    }
}