<template > 
 
  <div class="grid" >
   
    <div  >
      <article>
        <header><slot name="title" /></header>
        <button @click="onClickLogin()" style="width: 100%;"><slot name="title-btn" /></button> 
      </article>  
    </div>  
  </div>
</template>

<script setup>

import { useCosmvueStore } from '../stores/cosmvue'
const cosmvueStore = useCosmvueStore()

const { chainId } = defineProps(['chainId'])

async function onClickLogin() { 
    if (!window.getOfflineSigner || !window.keplr) {
        alert("Please install keplr extension");
    } 
    console.log(chainId);
    //const chainId = "osmosis-1";
    await window.keplr.enable(chainId);
    const offlineSigner = window.getOfflineSigner(chainId);
    const accounts = await offlineSigner.getAccounts(); 
    cosmvueStore.setAddress(accounts[0].address);
    console.log("cosmvueStore", cosmvueStore.address); 
 
}
</script>