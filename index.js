import LoginWallet from "./components/LoginWallet.vue";
import WalletInfo from "./components/WalletInfo.vue"; 

export default {
    install: (app, options) => {
      app.component("login-wallet", LoginWallet);
      app.component("wallet-info", WalletInfo);
    }
}