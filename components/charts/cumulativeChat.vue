<template>
 
  <BarChart 
    :chartData="chartData" 
    :options="chartOptions"  
    :height="600"
    :width="400"
  />
 
</template>

<script>
 
import { useCosmvueStore } from "../../stores/cosmvue";
import { defineComponent } from 'vue';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import cosmosConfig from '../../cosmos.config'

Chart.register(...registerables);

export default defineComponent({
  props: ['bondedTokens', 'totalSupply'],
  name: 'HomeChart',
  components: { BarChart },
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

      let valName = []
      let valData = [] 
      store.allValidators.forEach( async function(item, index){
        valName.push(item.description.moniker)
        valData.push({name: item.description.moniker, value: item.tokens / 1000000})
        /* item.votingPowerPc = (((item.tokens / 1000000) * 100) / totalTokenBondedPc).toFixed(2)
        cumulativeShare += (item.tokens / 1000000)
        item.votingPowerCumulative = ((cumulativeShare + item.tokens) * 100 / totalTokenBondedPc).toFixed(2)
        seriesCumulative.push([ ' [' + (index + 1) + '] ' +item.description.moniker, Number(item.votingPowerCumulative) ])
        finalIdeal += totalVal
        seriesCumulativeIdeal.push([ ' [' + (index + 1) + '] ' +item.description.moniker, Number(finalIdeal) ]) */
      });

      valData.sort((x,y) => {return x.value - y.value})
      return {
        labels: valData.map(item => item.name),
        datasets: [
          {
            label: "Data",
            data: valData.map(item => item.value), 
            backgroundColor: this.cosmosConfig[store.setChainSelected].colorChart
          },
        ],
      };
    },   
    chartOptions() { 
      return {
        indexAxis: 'y', 
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
