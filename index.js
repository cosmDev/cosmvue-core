import LoginWallet from "./components/LoginWallet.vue";
import WalletInfo from "./components/WalletInfo.vue"; 

export default {
    install: (app, options) => {
      app.component("login-wallet", LoginWallet);
      app.component("wallet-info", WalletInfo);
      app.use(piniaCosmVue);
      app.config.globalProperties.$cosmVue = {
        address: null,
        balance: null,
        chainId: null,
        wallet: null,
        isLogged: false,
        setAddress(address) {
          this.address = address;
          this.isLogged = true;
        },
      };
      app.config.globalProperties.$cosmVue.isLogged = function() {
        this.isLogged = isLogged;
      }; 
    }

    
}