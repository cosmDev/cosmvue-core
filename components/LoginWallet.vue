<template>
  <v-btn
    v-if="!cosmvueStore.isLogged"
    class="me-6"
    height="40"
    variant="tonal"
    width="120"
    @click="onClickLogin()"
    :disabled="!chainId"
  >
    <slot name="title-btn" />
  </v-btn>
  <v-btn
    v-else
    class="me-6"
    height="40"
    variant="tonal"
    width="120"
    @click="onClickLogout()"
  >
    Logout
  </v-btn>
</template>

<script setup>
import { useCosmvueStore } from "../stores/cosmvue";
const cosmvueStore = useCosmvueStore();
const { chainId } = defineProps(["chainId"]);

async function onClickLogin() {
  if (!window.getOfflineSigner || !window.keplr) {
    alert("Please install keplr extension");
  }
  await window.keplr.enable(chainId);
  const offlineSigner = window.getOfflineSigner(chainId);
  const accounts = await offlineSigner.getAccounts();
  cosmvueStore.setAddress(accounts[0].address);
  console.log("cosmvueStore", cosmvueStore.address);
}
async function onClickLogout() {
  cosmvueStore.setLogout();
}
</script>
