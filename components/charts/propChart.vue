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
  props: ['propData', 'tally'],
  name: 'HomeChart',
  components: { DoughnutChart },
  data: () => ({
    cosmosConfig: cosmosConfig,
    finalChartColors: '',
    testData: '',
    options: ''
  }),  
  computed: { 
    chartData() {
      const store = useAppStore()  
      console.log('propData', this.propData)
      console.log('tally', this.tally)

      return {
        labels: ["Yes", "No", "No with veto", "Abstain"],
        datasets: [
          {
            label: "Data",
            data: [
              this.tally?.yes,
              this.tally?.no,
              this.tally?.no_with_veto,
              this.tally?.abstain,
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
            text: 'Total votes',
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
