<template>
  <v-sheet v-if="store.isLogged" border class="ma-2 pa-2" rounded="lg"> 
    <v-row no-gutters>
      <v-col cols="12" sm="6">
        <v-sheet class="text-h6 pa-2">Last 10 transactions</v-sheet>
      </v-col>
    </v-row>
    <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Tx type
        </th>
        <th class="text-left">
          Date
        </th>
        <th class="text-left">
          Data
        </th>
        <th class="text-left">
          State
        </th>
        <th class="text-left">
           
        </th>        
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in store.lastTransactions"
        :key="item.name"
      >
        <td>
          <v-chip
            class="ma-2"
            :color="cosmosConfig[store.setChainSelected].color"
            label
            variant="outlined"
          >{{ item.titleMsg }}
          </v-chip> 
        </td>
        <td>{{ formatDate(item.timestamp) }}</td>
        <td v-if="item.finalData.amount?.data.amount">
          {{ formatNum(item.finalData.amount?.data.amount / 1000000) }}
          <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">
            {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}
          </strong>
        </td>  
        <td v-else></td>      
        <td>
          <v-icon v-if="item.code === 0" color="success" icon="mdi-check-bold"></v-icon>
          <v-icon v-else color="error" icon="mdi-close-thick"></v-icon>
        </td>
        <td>
          <v-chip
            :color="cosmosConfig[store.setChainSelected].color"
            class="ma-2"
            label
            :to="'/transactions/' + cosmosConfig[store.setChainSelected].slot + '/' + item.txhash"
          >
            View detail
          </v-chip>
        </td>        
      </tr>
    </tbody>
  </v-table>


  </v-sheet>
</template>
<script>

import { watch, defineComponent, ref } from "vue";
import { useCosmvueStore } from "../stores/cosmvue";
 
/* const store = useCosmvueStore();
store.lastTransactions = ref([]); */
export default defineComponent({
  name: "WalletLastTransactions",
  components: {},
  data() {
    return {
      store: useCosmvueStore(), 
    };
  },
  computed: {
    chainId() {
      return this.store.setChainSelected;
    }
  },
  mounted() {
    //this.store.lastTransactions = ref([]);
  }, 
  methods: {
  formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleString('en-US', options);
  },
  formatNum(num) {
    return num.toLocaleString('en-US');
  }
}
});

</script>
