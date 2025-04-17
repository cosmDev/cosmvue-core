<template>
  <div> 
  <DoughnutChart 
    :chartData="chartData" 
    :options="chartOptions"
    width="300"
    height="300"
  />
  </div>
</template>

<script>
 
import { useAppStore } from '@/store/app'
import { defineComponent } from 'vue';
import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import cosmosConfig from '../../cosmos.config'

Chart.register(...registerables);

export default defineComponent({
  props: ['balance', 'totalDelegations', 'totalUnbound', 'totalRewards'],
  name: 'HomeChart',
  components: { DoughnutChart },
  data: () => ({
    cosmosConfig: cosmosConfig,
    finalChartColors: '',
    testData: '',
    options: ''
  }),  
  computed: {
    //...mapState([ 'defaultChain']),
    chartData() {
      const store = useAppStore()  
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
            backgroundColor: this.cosmosConfig[store.setChainSelected].colorChart
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
            text: '',
          },
        },
      };
    },      
  },  
  watch: {
    setChainSelected() { 
      const store = useAppStore()
      this.finalChartColors = this.cosmosConfig[store.setChainSelected].colorChart    
    }
  },  
  async mounted () { 
    const store = useAppStore()
    this.finalChartColors = this.cosmosConfig[store.setChainSelected].colorChart    
  },
 
});
</script>
