<template>
  <v-sheet border v-if="store.isLogged" class="ma-2 pa-2" min-height="400" rounded="lg">
    <v-row no-gutters>
      <v-col cols="12" sm="6">
        <v-sheet class="text-h6 pa-2"> Wallet chart </v-sheet>
      </v-col>
    </v-row>
    <DoughnutChart
      :chartData="chartData"
      :options="chartOptions"
      width="300"
      height="300"
      spacing="2" 
    />
  </v-sheet>
</template>

<script>
import { useCosmvueStore } from "../stores/cosmvue.js";
import { defineComponent } from "vue";
import { DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import cosmosConfig from "../cosmos.config.js";

Chart.register(...registerables);

export default defineComponent({
  name: "HomeChart",
  components: { DoughnutChart },
  data: () => ({
    cosmosConfig: cosmosConfig,
    finalChartColors: "",
    options: "",
    store: useCosmvueStore()
  }),
  computed: {
 
    chartData() {
      const store = useCosmvueStore();
      return {
        labels: ["Available", "Delegated", "Undelegated", "Reward"],
        datasets: [
          { 
            label: "Data",
            data: [
              store.spendableBalances,
              store.totalDelegations,
              store.totalUnbound,
              store.totalRewards,
            ],
            backgroundColor:
              this.cosmosConfig[store.setChainSelected].colorChart,
          },
        ],
      };
    },
    chartOptions() {
      return {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
 
          },
          title: {
            display: false 
          },
        },
      };
    },
  },
  watch: {
    setChainSelected() { 
      this.finalChartColors =
        this.cosmosConfig[this.store.setChainSelected].colorChart;
    },
  },
  async mounted() {
 
    this.finalChartColors =
      this.cosmosConfig[this.store.setChainSelected].colorChart;
  },
});
</script>
