<template>
  <v-sheet
    border
    v-if="isLogged"
    min-height="400"
    class="ma-2 pa-2"
    rounded="lg"
  > 
    <v-btn height="32" min-width="5" variant="tonal" class="ml-4">
      <v-icon icon="mdi-content-copy" size="16" :color="cosmosConfig[cosmvueStore.setChainSelected].color"></v-icon>
    </v-btn>
    <v-chip class="ma-2" label>
      <b>{{ cosmvueStore.address }}</b>
    </v-chip>

    <v-table>
      <tbody>
        <tr>
          <th scope="row">Available amount</th>
          <td>{{ cosmvueStore.spendableBalances }} 
            <strong :style="'color:' + cosmosConfig[cosmvueStore.setChainSelected].color"> 
                {{ cosmosConfig[cosmvueStore.setChainSelected].coinLookup.viewDenom }}
            </strong>
          </td>
        </tr>
        <tr>
          <th scope="row">Delegated amount</th>
          <td>{{ cosmvueStore.totalDelegations }} 
            <strong :style="'color:' + cosmosConfig[cosmvueStore.setChainSelected].color"> 
                {{ cosmosConfig[cosmvueStore.setChainSelected].coinLookup.viewDenom }}
            </strong>
          </td>
        </tr>
        <tr>
          <th scope="row">Undelegated</th>
          <td>{{ cosmvueStore.totalUnbound }}
            <strong :style="'color:' + cosmosConfig[cosmvueStore.setChainSelected].color"> 
                {{ cosmosConfig[cosmvueStore.setChainSelected].coinLookup.viewDenom }}
            </strong>
          </td>
        </tr>
        <tr>
          <th scope="row">Reward</th>
          <td>{{ cosmvueStore.totalRewards }}
            <strong :style="'color:' + cosmosConfig[cosmvueStore.setChainSelected].color"> 
                {{ cosmosConfig[cosmvueStore.setChainSelected].coinLookup.viewDenom }}
            </strong>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th scope="row">Total</th>
          <td>{{ cosmvueStore.totalTokens }}
            <strong :style="'color:' + cosmosConfig[cosmvueStore.setChainSelected].color"> 
                {{ cosmosConfig[cosmvueStore.setChainSelected].coinLookup.viewDenom }}
            </strong>
          </td>
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
      async (newAddress) => {
        console.log("addressWalletInfo changed to", newAddress);
        cosmvueStore.address = newAddress; // Update the store with the new address
        isLogged.value = !!newAddress; // Update isLogged based on the new value
        finallAddress = newAddress; // Update finallAddress with the new value
        console.log("Updated finallAddress:", finallAddress);

        if (!newAddress) {
          cosmvueStore.isLogged = false;
          cosmvueStore.setLogout();
          console.log("No address found, logging out");
          return;
        }
        await cosmvueStore.keplrConnect();
        await cosmvueStore.initRpc();

        await cosmvueStore.getBankModule();
        await cosmvueStore.getStakingModule();
        await cosmvueStore.getDistribModule();
        await cosmvueStore.getWalletAmount();
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
