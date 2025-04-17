<template>

    <v-row no-gutters>
      <v-col
        v-for="n in chainsList"
        :key="n.chain_name"
        cols="12"
        sm="4"
      > 
        <v-card
 
        class="ma-2 pa-2" 
        :prepend-avatar="n.assets[0].logo_URIs?.svg || n.assets[0].logo_URIs?.png || ''" 
        rel="noopener"  
        :title="n.chain_name" 
        >
            <template v-slot:append>
            <v-icon color="success" icon="mdi-plus-box" @click="addChain(n.chain_name)"></v-icon>
            </template>
        </v-card> 
      </v-col>
    </v-row>
 
    <v-btn @click="dialog = true">
      Open Dialog
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-account"
          text="Edit Profile"
          variant="tonal"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card
        prepend-icon="mdi-account"
        title="User Profile"
      > 
        <v-card-text>
          <v-row dense>
            <v-col
              cols="12"
              md="12"
              sm="12"
            >
              <v-text-field
                v-model="chainDetails.chain_name"
                variant="outlined"
                label="Chain name" 
                required 
              ></v-text-field>
            </v-col>
  

            <v-col
              cols="12"
              sm="12"
            >
            
            <v-select
                v-model="selectRpc"
                :hint="`${selectRpc.abbr}`"
                :items="itemsRpc"
                :item-props="itemProps"
                :color="statusRpc ? 'success' : 'error'"
                item-title="provider"
                item-value="abbr"
                label="Select RPC endpoint"
                variant="outlined"
                persistent-hint
                return-object 
            ></v-select>
<!--               <v-select
                v-model="selectedRpc"
                :items="chainDetails.apis?.rpc || []"
                :item-title="chainDetails.apis?.rpc[0].name"
                item-value="abbr"
                label="Age*"
                variant="outlined"
                required
              ></v-select> -->
            </v-col> 
            <v-col
              cols="12"
              sm="12"
            >
            <v-select
                v-model="selectLcd"
                :hint="`${selectLcd.abbr}`"
                :items="itemsLcd"
                :item-props="itemProps"
                :color="statusLcd ? 'success' : 'error'"
                item-title="provider"
                item-value="abbr"
                label="Select LCD endpoint"
                variant="outlined"
                class="mt-2"
                persistent-hint
                return-object 
            ></v-select>
            </v-col>
          </v-row>
 
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Close"
            variant="plain"
            @click="dialog = false"
          ></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="addChainLocalStorage(chainDetails)"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import axios from "axios";
import { ref, onMounted, watch } from "vue";
import { useCosmvueStore } from "../stores/cosmvue";
import { assets, chains, ibc } from 'chain-registry/mainnet';


export default {
    name: "ChainSelect",
    data() {
        return {
            dialog: false,
            chainDetails: null,
            selectRpc: { provider: '', abbr: '' },
            selectLcd: { provider: '', abbr: '' },
            itemsRpc: [],
            itemsLcd: [],
            statusLcd: ref(Boolean),
            statusLcdMessage: null,
            statusRpc: ref(Boolean),
            statusRpcMessage: null,
        };
    },
    watch: {
        selectRpc(newValue) {
            console.log("Selected RPC:", newValue);

            fetch(newValue.abbr)
                .then((response) => {
                    if (response.status !== 200) {
                        this.statusRpc  = false;
                        this.statusRpcMessage = error.message;
                        return;
                    }
                    console.log("response.status =", response.status); // response.status = 200
                    this.statusRpc  = response.status;
                    this.statusRpcMessage = response.statusText; 
                }).catch((error) => {
                    console.error("Error fetching the image:", error);
                    this.statusRpc = false;
                    this.statusRpcMessage = error.message;
                });  
        },
        selectLcd(newValue) {
            console.log("Selected LCD:", newValue);

            fetch(newValue.abbr + "/cosmos/base/tendermint/v1beta1/node_info")
                .then((response) => {
                    if (response.status !== 200) {
                        this.statusLcd  = false;
                        this.statusLcdMessage = error.message;
                        return;
                    }
                    console.log("response.status =", response.status); // response.status = 200
                    this.statusLcd  = response.status;
                    this.statusLcdMessage = response.statusText; 
                    return;
                }).catch((error) => {
                    console.error("Error fetching the image:", error);
                    this.statusLcd = false;
                    this.statusLcdMessage = error.message;
                    return;
                });  
        },
    },
    setup() {
        const chainsList = ref([]);



        onMounted(async () => {
            try {
                //const assetList = assets.find(({chain_name})=>chain_name==='osmosis');
                console.log("chains", chains);
                for (const chain of chains) {
                    if (chain.chain_type === "cosmos") {
                        const assetList = assets.find(({chain_name})=>chain_name===chain.chain_name); 
                        if (assetList) {
                            chain.assets = assetList.assets;
                        }
                        chainsList.value.push(chain);
                    } 
                }
 
            } catch (error) {
                console.error("Error fetching chain data:", error);
            }
        });

        return {  chainsList }; 
    },
    methods: {
        async addChainLocalStorage(chain) {
            // TODO useCosmvueStore
            const store = useCosmvueStore();
            console.log("addChainLocalStorage", store.setChainSelected);
           //  console.log("addChainLocalStorage", chain); 
            console.log("selectRpc", this.selectRpc.abbr);
            console.log("selectLcd", this.selectLcd.abbr);
/*             const chainData = {
                chain_name: chain.chain_name,
                rpc_endpoint: this.selectRpc.abbr,
                lcd_endpoint: this.selectLcd.abbr,
            }; */

 
            let clientChains = await JSON.parse(localStorage.getItem(`clientChains`));
            if (!clientChains) {
                clientChains = [];
            }
            //console.log("clientChains", clientChains);
            const existingChain = clientChains.find(item => item.chain_name === chain.chain_name);
            if (existingChain) {
                console.log("Chain already exists in localStorage");
                return;
            }
            clientChains.push({
                chainId: chain.chain_id,
                name: chain.chain_name,
                desc: chain.chain_name,
                slot: chain.chain_name,
                apiURL: this.selectRpc.abbr,
                rpcURL: this.selectLcd.abbr,
                coinLookup: {
                    viewDenom: chain.assets[0].symbol,
                    chainDenom: chain.assets[0].symbol,
                    addressPrefix: chain.address_prefix,
                    exponent: 6,
                    icon: chain.assets[0].logo_URIs?.svg || chain.assets[0].logo_URIs?.png || '',
                    banner: chain.assets[0].logo_URIs?.svg || chain.assets[0].logo_URIs?.png || '',
                },
                feeMultiplier: 1.3,
                gasPrice: 0.025,
                explorerUrl: "https://www.mintscan.io/cosmos/txs/",
                coingeckoId: "cosmos",
                color: "#87bcea",
                colorChart: ["#d0e4f7", "#73b1e7", "#0a77d5", "#87bcea"],
                modules: {
                    feeGrant: true,
                    authz: true,
                    wasm: true,
                    group: false,
                    mint: true,
                },
            });
            localStorage.setItem(`clientChains`, JSON.stringify(clientChains));
            console.log(`Chain data for ${chain.chain_name} saved to localStorage.`);
            this.cosmosConfig.push(JSON.stringify(clientChains))
            // Save chain data to localStorage
            //localStorage.setItem(`clientChains`, JSON.stringify(clientChains));
            //console.log(`Chain data for ${chain.chain_name} saved to localStorage.`);
            // Save chain data to localStorage
            //localStorage.setItem(`clientChains`, JSON.stringify(clientChains));       

            const chainData =   {
                chainId: "cosmoshub-4",
                name: chain.chain_name,
                desc: "Cosmos is an ever-expanding ecosystem of interoperable and sovereign blockchain apps and services, built for a decentralized future.",
                slot: "atom",
                mode: "mainnet",
                apiURL: "https://cosmoshub.lava.build:443",
                rpcURL: "https://rpc-cosmoshub.ecostake.com",
                coinLookup: {
                viewDenom: "ATOM",
                chainDenom: "uatom",
                addressPrefix: "cosmos",
                exponent: 6,
                icon: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.svg",
                banner:
                    "https://pbs.twimg.com/profile_banners/1019126440233615361/1684483223/1500x500",
                },
                feeMultiplier: 1.3,
                gasPrice: 0.025,
                explorerUrl: "https://www.mintscan.io/cosmos/txs/",
                coingeckoId: "cosmos",
                color: "#87bcea",
                colorChart: ["#d0e4f7", "#73b1e7", "#0a77d5", "#87bcea"],
                modules: {
                feeGrant: true,
                authz: true,
                wasm: true,
                group: false,
                mint: true,
                },
            };


            console.log("clientChains", clientChains); 
 
        },
        itemProps (item) {
            return {
            title: item.provider,
            subtitle: item.abbr,
            }
        }, 
        addChain(chain) {
            console.log("addChain", chain); 
            const assetList = chains.find(({chain_name})=>chain_name===chain);

            console.log(assetList);
            this.chainDetails = assetList;
            this.dialog = true;
            this.itemsRpc = assetList.apis.rpc.map((item) => {
                console.log("item", item);
                return {
                    provider: item.provider,
                    abbr: item.address,
                };
            });
            this.itemsLcd = assetList.apis.rest.map((item) => {
                console.log("item rest", item);
                return {
                    provider: item.provider,
                    abbr: item.address,
                };
            });
            console.log("itemsLcd", this.itemsLcd);
            this.selectRpc = this.itemsRpc[0]; // Set default value to the first item
            this.selectLcd = this.itemsLcd[0]; // Set default value to the first item
            console.log("itemsRpc", this.itemsRpc); 
            console.log("selectRpc", this.selectRpc);

            
        },
    },
};
</script>

<style scoped>
.chain-select {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
}

label {
    margin-bottom: 5px;
    font-weight: bold;
}

select {
    padding: 5px;
    font-size: 14px;
}
</style>