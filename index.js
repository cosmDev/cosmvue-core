import LoginWallet from "./components/LoginWallet.vue";
import WalletInfo from "./components/WalletInfo.vue";
import ChainInfo from "./components/ChainInfo.vue";

import { createPinia } from "pinia";
const piniaCosmVue = createPinia();

export default {
  install: (app) => {
    app.use(piniaCosmVue);    
    app.component("login-wallet", LoginWallet);
    app.component("wallet-info", WalletInfo);
    app.component("wallet-chart", null);
    app.component("chain-info", ChainInfo);
  }
};
