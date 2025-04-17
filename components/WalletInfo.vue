<template>
  <v-sheet
    border
    v-if="cosmvueStore.isLogged"
    min-height="400"
    class="ma-2 pa-2"
    rounded="lg"
  > 
    <v-btn height="32" min-width="5" variant="tonal" class="ml-4" @click="copyAddress">
      <v-icon icon="mdi-content-copy" size="16" :color="cosmosConfig[cosmvueStore.setChainSelected].color"></v-icon>
    </v-btn>
    <v-chip class="ma-2" label>
      <b>{{ cosmvueStore.address }}</b>
    </v-chip>

    <v-table>
      <tbody>
        <tr>
          <th scope="row">Available amount</th>
         
          <td>
            <v-skeleton-loader :loading="!cosmvueStore.dataIsLoaded" type="list-item">
              {{ cosmvueStore.spendableBalances }} 
              <strong class="ml-1" :style="'color:' + cosmosConfig[cosmvueStore.setChainSelected].color"> 
                  {{ cosmosConfig[cosmvueStore.setChainSelected].coinLookup.viewDenom }}
              </strong>
            </v-skeleton-loader>
          </td>
          
        </tr>
        <tr>
          <th scope="row">Delegated amount</th>
          <td>
            <v-skeleton-loader :loading="!cosmvueStore.dataIsLoaded" type="list-item">
              {{ cosmvueStore.totalDelegations }} 
              <strong class="ml-1" :style="'color:' + cosmosConfig[cosmvueStore.setChainSelected].color"> 
                  {{ cosmosConfig[cosmvueStore.setChainSelected].coinLookup.viewDenom }}
              </strong>
            </v-skeleton-loader>
          </td>
        </tr>
        <tr>
          <th scope="row">Undelegated</th>
          <td>
            <v-skeleton-loader :loading="!cosmvueStore.dataIsLoaded" type="list-item">
              {{ cosmvueStore.totalUnbound }}
              <strong class="ml-1" :style="'color:' + cosmosConfig[cosmvueStore.setChainSelected].color"> 
                  {{ cosmosConfig[cosmvueStore.setChainSelected].coinLookup.viewDenom }}
              </strong>
            </v-skeleton-loader>
          </td>
        </tr>
        <tr>
          <th scope="row">Reward</th>
          <td>
            <v-skeleton-loader :loading="!cosmvueStore.dataIsLoaded" type="list-item">
              {{ cosmvueStore.totalRewards }}
              <strong class="ml-1" :style="'color:' + cosmosConfig[cosmvueStore.setChainSelected].color"> 
                  {{ cosmosConfig[cosmvueStore.setChainSelected].coinLookup.viewDenom }}
              </strong>
            </v-skeleton-loader>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th scope="row">Total</th>
          <td>
            <v-skeleton-loader :loading="!cosmvueStore.dataIsLoaded" type="list-item">
              {{ cosmvueStore.totalTokens }}
              <strong class="ml-1" :style="'color:' + cosmosConfig[cosmvueStore.setChainSelected].color"> 
                  {{ cosmosConfig[cosmvueStore.setChainSelected].coinLookup.viewDenom }}
              </strong>
          </v-skeleton-loader>
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
 
    
    const cosmvueStore = useCosmvueStore();
 

    return { 
      cosmvueStore, 
    };
  },
  methods: {
    async copyAddress() {
      const mime = 'text/plain'
      const source = ref([
        new ClipboardItem({
          [mime]: new Blob(['plain text'], { type: mime }),
        })
      ])
      const clipboardItem = new ClipboardItem({
        [mime]: new Blob([this.cosmvueStore.address], { type: mime }),
      });
      try {
        await navigator.clipboard.write([clipboardItem]);
        console.log("Address copied to clipboard");
      } catch (err) {
        console.error("Failed to copy address: ", err);
      }
    },
  }, 
});
</script>