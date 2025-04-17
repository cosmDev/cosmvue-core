import LoginWallet from "./components/LoginWallet.vue";
import WalletInfo from "./components/WalletInfo.vue";
import ChainInfo from "./components/ChainInfo.vue";
import WalletChart from "./components/WalletChart.vue";
import WalletActions from "./components/WalletActions.vue";
import WalletMainTransactions from "./components/WalletMainTransactions.vue";
import WalletLastTransactions from "./components/WalletLastTransactions.vue";

import WalletDelegations from "./components/WalletDelegations.vue";

import  ChainSelect from "./components/ChainSelect.vue";

import { useCosmvueStore } from "./stores/cosmvue";
import { createPinia } from "pinia";

import cosmosConfig from "./cosmos.config.js";
import { ref, watch } from 'vue'

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

    watch(
       () => cosmvueStore.address,
       async (newAddress) => {
      console.log("Address changedddddddd:", newAddress);
      // Handle the address change here
      // For example, you can fetch the wallet info or update the UI
      console.log("addressWalletInfo changed to", newAddress);
      cosmvueStore.address = newAddress; // Update the store with the new address 
 


      if (!newAddress) {
        cosmvueStore.isLogged = false;
        cosmvueStore.setLogout();
        console.log("No address found, logging out");
        return;
      } 

      // Start update data in store
      cosmvueStore.dataIsLoaded = false;
      await cosmvueStore.keplrConnect();
      await cosmvueStore.initRpc();

      await cosmvueStore.getSdkVersion();

      await cosmvueStore.getBankModule();
      await cosmvueStore.getStakingModule();
      await cosmvueStore.getDistribModule();
      await cosmvueStore.getWalletAmount();
      await cosmvueStore.getTransactions();

      await cosmvueStore.getAllValidators();
      await cosmvueStore.getChainStats(); 
      cosmvueStore.dataIsLoaded = true;
      }
    );

    app.component("login-wallet", LoginWallet);
    app.component("wallet-info", WalletInfo);
    app.component("wallet-chart", WalletChart);
    app.component("wallet-actions", WalletActions);
    app.component("wallet-last-transactions", WalletLastTransactions);
    app.component("chain-info", ChainInfo);
    app.component("all-txs", WalletMainTransactions);
    app.component("all-delegations", WalletDelegations);
    app.component("chain-select", ChainSelect);
  },
};
