import { defineStore } from 'pinia'

export const useCosmvueStore = defineStore('cosmvue', {
  state: () => {
    return { 
        count: 0,
        address: null,
        balance: null,
        chainId: null,
        wallet: null,
        isLogged: false,   
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    setAddress(address) {
      this.address = address 
      this.isLogged = true
    },
  },
})