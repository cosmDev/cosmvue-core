import { defineStore } from "pinia";
import axios from "axios";
import { useStorage } from '@vueuse/core'
import {
  createProtobufRpcClient,
  QueryClient,
  StargateClient,
} from "@cosmjs/stargate";
import { Tendermint37Client } from "@cosmjs/tendermint-rpc";
import Long from "long";
//import bech32 from "bech32";

import cosmosConfig from "../cosmos.config.js";
import { setMsg } from "../libs/msgType";

import * as bank from "cosmjs-types/cosmos/bank/v1beta1/query";
import * as staking from "cosmjs-types/cosmos/staking/v1beta1/query";
import * as distrib from "cosmjs-types/cosmos/distribution/v1beta1/query";
 

export const useCosmvueStore = defineStore("cosmvue", {
  state: () => {
    return {
      dataIsLoaded: Boolean(false),
      rpcClient: null,
      rpcBase: null,
      sdkVersion: "",
      ibcVersion: "",
      setChainSelected: Number(0),
      address: String,
      nameWallet: String,
      chainId: String,
      wallet: String,
      isLogged: Boolean(false),
      spendableBalances: Number(0),
      totalDelegations: Number(0),
      totalUnbound: Number(0),
      totalRewards: Number(0),
      poolStaking: Object,
      totalTokens: Number(0),
      lastTransactions: Array,
      finalStats: Object,
      allValidators: [],
      countAllValidators: Number(0),
      totalSupply: Number(0),
      communityPool: Number(0),
      stakingParams: Object,
      mintParams: Object,
    };
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async initRpc() {
      if (this.rpcClient) {
        this.rpcBase.disconnect();
      }
      const client = await Tendermint37Client.connect(
        cosmosConfig[this.setChainSelected].rpcURL,
      );
      const queryClient = new QueryClient(client);
      const rpcClient = createProtobufRpcClient(queryClient);
      
      this.rpcClient = rpcClient;
      this.rpcBase = client;
    },
    async getSdkVersion() {
      const getSdk = await axios(
        cosmosConfig[this.setChainSelected].apiURL +
          "/cosmos/base/tendermint/v1beta1/node_info"
      );
      for (let i of getSdk.data.application_version.build_deps) {
        let position = i.path.search("ibc-go");
        if (position !== -1) {
          this.ibcVersion = i.version
        }

      }
      this.sdkVersion = getSdk.data.application_version.cosmos_sdk_version
    },
    async getWalletAmount() {
      let totalToken =
        Number(this.spendableBalances) +
        Number(this.totalDelegations) +
        Number(this.totalUnbound) +
        Number(this.totalRewards);

      this.totalTokens = totalToken.toFixed(6);
      // this.fiatWalletValue = totalToken * this.chainSelectedPrice
    },
    async getBankModule() {
      const queryBank = new bank.QueryClientImpl(this.rpcClient);
      let spendableBalances = await queryBank.SpendableBalances({
        address: this.address,
      });
      let allBalances = await queryBank.AllBalances({ address: this.address });

      const found = spendableBalances.balances.find(
        (element) =>
          element.denom ===
          cosmosConfig[this.setChainSelected].coinLookup.chainDenom,
      );
      // TODO: fix this
      let returnValue = "";
      if (found?.amount > 0) {
        returnValue = found?.amount / Number("1e" + cosmosConfig[this.setChainSelected].coinLookup.exponent);
      } else {
        returnValue = 0;
      }

      let totalSupply = await queryBank.SupplyOf({ denom: cosmosConfig[this.setChainSelected].coinLookup.chainDenom })
      this.spendableBalances = returnValue;
      this.totalSupply = totalSupply.amount.amount;
      // this.totalSupplyPrice = ((totalSupply.amount.amount / 1000000) * this.chainSelectedPrice)
    },
    async getStakingModule() {
      const queryStaking = new staking.QueryClientImpl(this.rpcClient);
      //let getPoolStaking = await queryStaking.Pool({});
      console.log(queryStaking );
      let delegatorValidators = await queryStaking.DelegatorDelegations({
        delegatorAddr: this.address,
        pagination: {
          countTotal: false,
          key: "",
          offset: Long.fromNumber(0, true),
          limit: Long.fromNumber(200, true),
          reverse: false,
        },
      });

      let total = 0;
      let allUnbound = await queryStaking.DelegatorUnbondingDelegations({
        delegatorAddr: this.address,
      });
      let totalUnbound = 0;

      for (let i of delegatorValidators.delegationResponses) {
        total += Number(i.balance.amount);
      }
      if (allUnbound.unbondingResponses.length > 0) {
        for (let i of allUnbound.unbondingResponses) {
          for (let j of i.entries) {
            totalUnbound += Number(j.balance);
          }
        }
      } else {
        totalUnbound = 0.0;
      }

      this.totalDelegations = (total / Number("1e" + cosmosConfig[this.setChainSelected].coinLookup.exponent)).toFixed(6);
      this.totalUnbound = (totalUnbound / Number("1e" + cosmosConfig[this.setChainSelected].coinLookup.exponent)).toFixed(6);
      //this.poolStaking = getPoolStaking.pool;
    },
    async getDistribModule() {
      const queryDistrib = new distrib.QueryClientImpl(this.rpcClient);
      const queryDistribResult = await queryDistrib.DelegationTotalRewards({
        delegatorAddress: this.address,
      });
      const found = queryDistribResult.total.find(
        (element) =>
          element.denom ===
          cosmosConfig[this.setChainSelected].coinLookup.chainDenom,
      );
      let returnValue = "";
      if (queryDistribResult.total.length > 0) {
        returnValue = Number(found.amount / 1000000000000000000000000).toFixed(
          6,
        );
      } else {
        returnValue = 0;
      }

      let oldValue = this.totalRewards;
      this.totalMyValidators = queryDistribResult.rewards.length;
      this.totalDelegationsRewards = queryDistribResult.rewards;
      this.totalRewards = returnValue;

      const queryWithdrawAddressResult =
        await queryDistrib.DelegatorWithdrawAddress({
          delegatorAddress: this.address,
        });
      // console.log('DelegatorWithdrawAddress', queryWithdrawAddressResult)
      this.myDelegatorWithdrawAddress =
        queryWithdrawAddressResult.withdrawAddress;
    },
    async getChainStats() {

      let fixUrl = "";
      if( this.sdkVersion.substring(0,5) === 'v0.46' || this.sdkVersion.substring(0,5) === 'v0.45') {
        fixUrl = "/cosmos/bank/v1beta1/supply/";
      } else {
        fixUrl = "/cosmos/bank/v1beta1/supply/by_denom?denom=";
      }      

      //const inflation = await axios(cosmosConfig[this.setChainSelected].apiURL + '/cosmos/mint/v1beta1/inflation')
      const totalSupply = await axios(cosmosConfig[this.setChainSelected].apiURL + fixUrl + cosmosConfig[this.setChainSelected].coinLookup.chainDenom)
      const communityPool = await axios(cosmosConfig[this.setChainSelected].apiURL + '/cosmos/distribution/v1beta1/community_pool')
      const stakingPool = await axios(cosmosConfig[this.setChainSelected].apiURL + '/cosmos/staking/v1beta1/pool')
      const stakingParams = await axios(cosmosConfig[this.setChainSelected].apiURL + '/cosmos/staking/v1beta1/params')
      
      if (cosmosConfig[this.setChainSelected].modules.mint) {
        const mintParamsData = await axios(cosmosConfig[this.setChainSelected].apiURL + '/cosmos/mint/v1beta1/params')
        this.mintParams = mintParamsData.data.params
      } else {
        this.mintParams = null
      }
      //console.log(inflation.data)
 
      

      const querystaking = new staking.QueryClientImpl(this.rpcClient);
      let allValidators = await querystaking.Validators({ status: 'BOND_STATUS_BONDED' });
      let tokenBounded = 0
      for (let i = 0; i < allValidators.validators.length; i++) {
        const tokenByVal = allValidators.validators[i].tokens
        tokenBounded += Number(tokenByVal)
      }

     // let finalInflation = inflation.data.inflation * 100
      let finalTotalSupply = totalSupply.data.amount.amount / 1000000
      let finalCommunityPool = communityPool.data.pool[0].amount / 1000000
      let finalBondedTokens = tokenBounded / 1000000

      let finalStats = {
        //inflation: finalInflation,
        totalSupply: finalTotalSupply,
        bondedTokens: finalBondedTokens,
        notBondedTokens: finalTotalSupply - finalBondedTokens,
        communityPool: finalCommunityPool
      }
      this.finalStats = finalStats
      this.totalSupply =  totalSupply.data.amount.amount 
      this.poolStaking = stakingPool.data.pool
      this.communityPool = finalCommunityPool
      this.stakingParams = stakingParams.data.params
      //this.mintParams = mintParams.data.params
    },
    async getAllValidators() {
      let test = await fetch(cosmosConfig[this.setChainSelected].apiURL +'/cosmos/staking/v1beta1/validators?pagination.limit=500&status=BOND_STATUS_BONDED')

      let getValidators = await test.json()
      this.allValidators = getValidators.validators
      this.countAllValidators = getValidators.validators.length
    },
    async getTransactions() {
/*       const queryTx = new tx.ServiceClientImpl(this.rpcClient);
      console.log(queryTx); 
      const request = GetTxsEventRequest.fromPartial({
        events: [
          `message.sender='${this.address}'`,
          `transfer.recipient='${this.address}'`,
        ],
        orderBy: OrderBy.ORDER_BY_ASC,
        page: 1,
        limit: 10, 
      });
      console.log(request)
      const queryTxResult = await queryTx.GetTxsEvent(request);
      console.dir(queryTxResult); */
 
/*       const queryTxResult = await queryTx.GetTxsEvent({
        events: [
          `message.sender='${this.address}'`,
          `transfer.recipient='${this.address}'`,
        ],
        orderBy: 2,
        page: 1,
        limit: 10,
      });
      console.log(queryTxResult) */
      console.log(this.sdkVersion.substring(0,5))
      let fixEvent = "";
      if(this.sdkVersion.substring(0,5) === 'v0.47' || this.sdkVersion.substring(0,5) === 'v0.46' || this.sdkVersion.substring(0,5) === 'v0.45') {
        fixEvent = "events";
      } else {
        fixEvent = "query";
      }
      const resultSender = await axios(
        cosmosConfig[this.setChainSelected].apiURL +
          "/cosmos/tx/v1beta1/txs?"+fixEvent+"=message.sender=%27" +
          this.address +
          "%27&limit=10&order_by=2"
      );
      const resultRecipient = await axios(
        cosmosConfig[this.setChainSelected].apiURL +
          "/cosmos/tx/v1beta1/txs?"+fixEvent+"=transfer.recipient=%27" +
          this.address +
          "%27&limit=10&order_by=2"
      );
      const finalTxs = await resultSender.data.tx_responses.concat(
        resultRecipient.data.tx_responses
      );
      let push_array = [];
      for (let i of finalTxs) {
        let finalsTxs = setMsg(i.tx.body.messages[0], this.address, i.timestamp, i.txhash, { code: i.code, log: i.raw_log} );
        push_array.push(finalsTxs);

      }

      this.lastTransactions = push_array  

      // console.log(finalSyntax)
      //this.lastTransactions = finalTxs
    },

    
    async keplrConnect() {
      await window.keplr.experimentalSuggestChain({
        chainId: cosmosConfig[this.setChainSelected].chainId,
        chainName: cosmosConfig[this.setChainSelected].name,
        rpc: cosmosConfig[this.setChainSelected].rpcURL,
        rest: cosmosConfig[this.setChainSelected].apiURL,
        bip44: {
          coinType: 118,
        },
        bech32Config: {
          bech32PrefixAccAddr:
            cosmosConfig[this.setChainSelected].coinLookup.addressPrefix,
          bech32PrefixAccPub:
            cosmosConfig[this.setChainSelected].coinLookup.addressPrefix +
            "pub",
          bech32PrefixValAddr:
            cosmosConfig[this.setChainSelected].coinLookup.addressPrefix +
            "valoper",
          bech32PrefixValPub:
            cosmosConfig[this.setChainSelected].coinLookup.addressPrefix +
            "valoperpub",
          bech32PrefixConsAddr:
            cosmosConfig[this.setChainSelected].coinLookup.addressPrefix +
            "valcons",
          bech32PrefixConsPub:
            cosmosConfig[this.setChainSelected].coinLookup.addressPrefix +
            "valconspub",
        },
        currencies: [
          {
            coinDenom: cosmosConfig[this.setChainSelected].coinLookup.viewDenom,
            coinMinimalDenom:
              cosmosConfig[this.setChainSelected].coinLookup.chainDenom,
            coinDecimals: 6,
            coinGeckoId: cosmosConfig[this.setChainSelected].coingeckoId,
          },
        ],
        feeCurrencies: [
          {
            coinDenom: cosmosConfig[this.setChainSelected].coinLookup.viewDenom,
            coinMinimalDenom:
              cosmosConfig[this.setChainSelected].coinLookup.chainDenom,
            coinDecimals: 6,
            coinGeckoId: cosmosConfig[this.setChainSelected].coingeckoId,
            gasPriceStep: {
              low: 0,
              average: 0,
              high: 0,
            },
          },
        ],
        stakeCurrency: {
          coinDenom: cosmosConfig[this.setChainSelected].coinLookup.viewDenom,
          coinMinimalDenom:
            cosmosConfig[this.setChainSelected].coinLookup.chainDenom,
          coinDecimals: 6,
          coinGeckoId: cosmosConfig[this.setChainSelected].coingeckoId,
        },
      });
      let chainId = cosmosConfig[this.setChainSelected].chainId;

      await window.keplr.enable(chainId);
      const offlineSigner = await window.getOfflineSignerAuto(chainId);
      const accounts = await offlineSigner.getAccounts();
      const getKey = await window.keplr.getKey(chainId);
      this.setAddress(accounts[0].address);
      this.nameWallet = getKey; 

      
      let clientChains = await JSON.parse(localStorage.getItem(`clientChains`));
      console.log("clientChains", clientChains);


    },
    setAddress(address) {
      this.address = address;
      const id = useStorage('my-address', this.address) // returns Ref<string>

      this.isLogged = true;
    },
    setLogout() {
      this.address = "";
      this.isLogged = false;
    },
  },
});
