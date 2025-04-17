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
 
import { useCosmvueStore } from "../../stores/cosmvue";
import { defineComponent } from 'vue';
import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import cosmosConfig from '../../cosmos.config'

Chart.register(...registerables);

export default defineComponent({
  props: ['bondedTokens', 'totalSupply'],
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
      const store = useCosmvueStore()  
      return {
        labels: ["bondedTokens", "Unbonded"],
        datasets: [
          {
            label: "Data",
            data: [
              this.bondedTokens,
              this.totalSupply - this.bondedTokens
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
      const store = useCosmvueStore()
      this.finalChartColors = this.cosmosConfig[store.setChainSelected].colorChart    
    }
  },  
  async mounted () { 
    const store = useCosmvueStore()
    this.finalChartColors = this.cosmosConfig[store.setChainSelected].colorChart    
  },
 
});
</script>
