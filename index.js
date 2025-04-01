import LoginWallet from "./components/LoginWallet.vue";
import WalletInfo from "./components/WalletInfo.vue";
import ChainInfo from "./components/ChainInfo.vue";
import WalletChart from "./components/WalletChart.vue";
import WalletActions from "./components/WalletActions.vue";

import { useCosmvueStore } from "./stores/cosmvue";
import { createPinia } from "pinia";

import cosmosConfig from "./cosmos.config.js";

export default {
  install: (app) => {
    app.use(createPinia());
    const cosmvueStore = useCosmvueStore();
    cosmvueStore.initRpc();

    // add a global property to the app instance for cosmosConfig
    app.mixin({
      created() {
        if (!this.$parent) {
          app.config.globalProperties.cosmosConfig = cosmosConfig;
          app.config.globalProperties.cosmvueStore = cosmvueStore;
        }
      },
    });

    app.component("login-wallet", LoginWallet);
    app.component("wallet-info", WalletInfo);
    app.component("wallet-chart", WalletChart);
    app.component("wallet-actions", WalletActions);
    app.component("chain-info", ChainInfo);
  },
};
