<template>
    <v-sheet v-if="store.isLogged" border class="ma-2 pa-2" rounded="lg"> 
    <div class="wallet-main-transactions">
        <h2>Transactions</h2>
        <ul class="transaction-list">
            <li v-for="item in store.lastTransactions"  :key="item.name" class="transaction-item">
                <div class="transaction-details">
                    <p class="transaction-name">          <v-chip
            class="ma-2"
            :color="cosmosConfig[store.setChainSelected].color"
            label
            variant="outlined"
          >{{ item.titleMsg }}
          </v-chip> </p>
                    <p class="transaction-date">{{ item.timestamp }}</p>
                </div>
<!--                 <div class="transaction-amount" :class="{ 'positive': transaction.amount > 0, 'negative': transaction.amount < 0 }">
                    {{ transaction.amount > 0 ? '+' : '' }}{{ transaction.amount }} {{ transaction.currency }}
                </div> -->
                <td v-if="item.finalData.amount?.data.amount">
          {{ formatNum(item.finalData.amount?.data.amount / 1000000) }}
          <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">
            {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}
          </strong>
        </td>  
            </li>
        </ul>
    </div>
</v-sheet>
</template>

<script>
import { useCosmvueStore } from "../stores/cosmvue";

export default {
    name: "WalletMainTransactions",
    data() {
        return {
            store: useCosmvueStore(), 
            transactions: [
                { id: 1, name: "Payment Received", date: "2023-10-01", amount: 100, currency: "USD" },
                { id: 2, name: "Subscription Fee", date: "2023-10-02", amount: -50, currency: "USD" },
                { id: 3, name: "Refund", date: "2023-10-03", amount: 20, currency: "USD" },
            ],
        };
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
};
</script>

<style scoped>
.wallet-main-transactions {
    padding: 1rem;
}

.transaction-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.transaction-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #ddd;
}

.transaction-details {
    display: flex;
    flex-direction: column;
}

.transaction-name {
    font-weight: bold;
}

.transaction-date {
    font-size: 0.9rem;
    color: #666;
}

.transaction-amount {
    font-weight: bold;
}

.transaction-amount.positive {
    color: green;
}

.transaction-amount.negative {
    color: red;
}
</style>