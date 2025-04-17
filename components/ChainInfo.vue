<template> 
  
  <v-row  no-gutters>
    <v-col>
      <v-sheet border class="ma-2 pa-2" rounded="lg">
        <h3 class="ma-2 pa-2">
            <v-icon
              :color="cosmosConfig[store.setChainSelected].color"
              icon="mdi-information-outline"
              class="mr-2"
            ></v-icon>           
            Chain info
        </h3>
        <v-divider />        
        <v-table>
          <tbody>
            <tr>
              <td>Total Supply</td> 
              <td>
                {{ millify((store.totalSupply / Number("1e" + cosmosConfig[store.setChainSelected].coinLookup.exponent))) }} 
                <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">
                  {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}
                </strong>                
              </td>
            </tr>  
            <tr>
              <td>Bonded Tokens</td>
              <td>
                {{ millify(store.poolStaking.bonded_tokens / Number("1e" + cosmosConfig[store.setChainSelected].coinLookup.exponent)) }} 
                <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">
                  {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}
                </strong>                 
              </td>
            </tr>   
            <tr>
              <td>Community Pool</td>
              <td>
                {{ millify(store.communityPool) }} 
                <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">
                  {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}
                </strong>                 
              </td>
            </tr>
  
   
            
          </tbody>
        </v-table>
      </v-sheet>
      <v-sheet border class="ma-2 pa-2" rounded="lg" min-height="400">
        <h3 class="ma-2 pa-2">
            <v-icon
              :color="cosmosConfig[store.setChainSelected].color"
              icon="mdi-information-outline"
              class="mr-2"
            ></v-icon>           
            Chain distribution
        </h3>
        <v-divider /> 
        <statsChart 
          :bondedTokens="(store.poolStaking.bonded_tokens / Number('1e' + cosmosConfig[store.setChainSelected].coinLookup.exponent))" 
          :totalSupply="store.totalSupply /  Number('1e' + cosmosConfig[store.setChainSelected].coinLookup.exponent)" 
        />
      </v-sheet>      
    </v-col>
    <v-col>
      <v-sheet border class="ma-2 pa-2" rounded="lg">
        <h3 class="ma-2 pa-2">
            <v-icon
              :color="cosmosConfig[store.setChainSelected].color"
              icon="mdi-information-outline"
              class="mr-2"
            ></v-icon>           
            Staking Params
        </h3>
        <v-divider />
        <v-table>
          <tbody> 
            <tr>
              <td>Unbonding time</td>
              <td>   {{ store.stakingParams.unbonding_time }}            
              </td>
            </tr>  
            <tr>
              <td>Max validators</td>
              <td>
                {{ store.stakingParams.max_validators }}                       
              </td>
            </tr>
            <tr>
              <td>Max entries</td>
              <td>
                {{ store.stakingParams.max_entries }}          
              </td>
            </tr>          
          </tbody>
        </v-table>
      </v-sheet>
      <v-sheet border class="ma-2 pa-2" rounded="lg" min-height="400">
        <h3 class="ma-2 pa-2">
            <v-icon
              :color="cosmosConfig[store.setChainSelected].color"
              icon="mdi-information-outline"
              class="mr-2"
            ></v-icon>           
            Minting Parameters
        </h3>
        <v-divider /> 
        <v-table v-if="cosmosConfig[store.setChainSelected].modules.mint" >
          <tbody> 
            <tr>
              <td>Blocks per year</td>
              <td>   {{ store.mintParams?.blocks_per_year }}            
              </td>
            </tr>  
            <tr>
              <td>Inflation rate change</td>
              <td>
                {{ Number(store.mintParams?.inflation_rate_change).toFixed(2) }} %                  
              </td>
            </tr>
            <tr>
              <td>Goal bonded</td>
              <td>
                {{  Number(store.mintParams?.goal_bonded).toFixed(2) }} %      
              </td>
            </tr>   
            <tr>
              <td>Inflation max</td>
              <td>
                {{  Number(store.mintParams?.inflation_max).toFixed(2) }} %      
              </td>
            </tr>  
            <tr>
              <td>Inflation min</td>
              <td>
                {{  Number(store.mintParams?.inflation_min).toFixed(2) }} %      
              </td>
            </tr>     
            <tr>
              <td>Mint denom</td>
              <td>
                {{  store.mintParams?.mint_denom }} 
              </td>
            </tr>   
                            
          </tbody>
        </v-table>
      </v-sheet>
    </v-col>    
    <v-col>
      <v-sheet border height="600" class="ma-2 pa-2" rounded="lg" min-height="643">
        <h3 class="ma-2 pa-2">
            <v-icon
              :color="cosmosConfig[store.setChainSelected].color"
              icon="mdi-information-outline"
              class="mr-2"
            ></v-icon>           
            Asset info
        </h3>
        <v-divider />     
      </v-sheet>
    </v-col>
  </v-row>
  <v-row  no-gutters>
    <v-col>
      <v-sheet border class="ma-2 pa-2" rounded="lg">
        <h3 class="ma-2 pa-2">
            <v-icon
              :color="cosmosConfig[store.setChainSelected].color"
              icon="mdi-information-outline"
              class="mr-2"
            ></v-icon>           
            Cumulative delegations
        </h3>
        <v-divider />     
        <cumulativeChat 
          :bondedTokens="store.poolStaking.bondedTokens /  Number('1e' + cosmosConfig[store.setChainSelected].coinLookup.exponent)" 
          :totalSupply="store.totalSupply /  Number('1e' + cosmosConfig[store.setChainSelected].coinLookup.exponent)"  
        />
      </v-sheet>
    </v-col>
  </v-row>  
</template> 
<script>
import millify from "millify";
import { useCosmvueStore } from "../stores/cosmvue";
import cosmosConfig from '../cosmos.config' 
import statsChart from '../components/charts/statsChart.vue'
import cumulativeChat from '../components/charts/cumulativeChat.vue'

export default {
  components: { statsChart, cumulativeChat },
  data: () => ({
    cosmosConfig: cosmosConfig,
    millify: millify
  }),
  setup() {
    const store = useCosmvueStore()
    console.log(store.spendableBalances) 

    store.getChainStats();

    return {
      store
    }
  },
  methods: {
    formatNum(nombre){
      return new Intl.NumberFormat().format(nombre)
    }
  },
}
</script>