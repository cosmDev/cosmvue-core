<template>
  <v-sheet v-if="store.isLogged" class="ma-2 pa-2" height="350" rounded>
    <DoughnutChart
      :chartData="chartData"
      :options="chartOptions"
      width="300"
      height="300"
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
  props: ["balance", "totalDelegations", "totalUnbound", "totalRewards"],
  name: "HomeChart",
  components: { DoughnutChart },
  data: () => ({
    cosmosConfig: cosmosConfig,
    finalChartColors: "",
    testData: "",
    options: "",
    store: useCosmvueStore(),
  }),
  computed: {
    //...mapState([ 'defaultChain']),
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
            display: false,
          },
          title: {
            display: true,
            text: "",
          },
        },
      };
    },
  },
  watch: {
    setChainSelected() {
      const store = useCosmvueStore();
      this.finalChartColors =
        this.cosmosConfig[store.setChainSelected].colorChart;
    },
  },
  async mounted() {
    const store = useCosmvueStore();
    this.finalChartColors =
      this.cosmosConfig[store.setChainSelected].colorChart;
  },
});
</script>
