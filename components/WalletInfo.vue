<template>
  <v-sheet v-if="isLogged" class="ma-2 pa-2" rounded>
    <p class="ma-4" style="font-size: 16px">
      <b>{{ cosmvueStore.address }}</b>
    </p>
    <v-table>
      <tbody>
        <tr>
          <th scope="row">Available amount</th>
          <td>0</td>
        </tr>
        <tr>
          <th scope="row">Delegated amount</th>
          <td>0</td>
        </tr>
        <tr>
          <th scope="row">Undelegated</th>
          <td>0</td>
        </tr>
        <tr>
          <th scope="row">Reward</th>
          <td>0</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th scope="row">Total</th>
          <td>0</td>
        </tr>
      </tfoot>
    </v-table>
  </v-sheet>
</template>

<script>
import { watch, defineComponent, ref } from "vue";
import { useCosmvueStore } from "../stores/cosmvue";

export default defineComponent({
  props: {
    addressWalletInfo: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    let finallAddress = props.addressWalletInfo; // Initialize with prop value
    const isLogged = ref(false); // Reactive variable for login statu

    const cosmvueStore = useCosmvueStore();

    // Watch for changes in props.addressWalletInfo
    watch(
      () => cosmvueStore.address,
      (newAddress) => {
        console.log("addressWalletInfo changed to", newAddress);
        cosmvueStore.address = newAddress; // Update the store with the new address
        isLogged.value = !!newAddress; // Update isLogged based on the new value
        finallAddress = newAddress; // Update finallAddress with the new value
        console.log("Updated finallAddress:", finallAddress);
      },
    );

    // Check if the wallet is logged in on mount
    if (props.addressWalletInfo) {
      isLogged.value = true;
    }

    return {
      isLogged,
      cosmvueStore,
      finallAddress,
    };
  },
});
</script>

<style>
.errorSection {
  background-color: rgb(255, 166, 0);
  color: rgb(0, 0, 0);
}
.viewAddress {
  font-size: x-small;
}
</style>
