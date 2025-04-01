import { defineStore } from "pinia";
import axios from "axios";
import {
  createProtobufRpcClient,
  QueryClient,
  StargateClient,
} from "@cosmjs/stargate";
import { Tendermint37Client } from "@cosmjs/tendermint-rpc";
import Long from "long";
//import bech32 from "bech32";

import cosmosConfig from "../cosmos.config.js";

import * as bank from "cosmjs-types/cosmos/bank/v1beta1/query";
import * as staking from "cosmjs-types/cosmos/staking/v1beta1/query";
import * as distrib from "cosmjs-types/cosmos/distribution/v1beta1/query";
import * as gov from "cosmjs-types/cosmos/gov/v1beta1/query";
import * as authz from "cosmjs-types/cosmos/authz/v1beta1/query";
import * as feegrant from "cosmjs-types/cosmos/feegrant/v1beta1/query";
import {
  GenericAuthorization,
  GrantAuthorization,
} from "cosmjs-types/cosmos/authz/v1beta1/authz";
import * as group from "cosmjs-types/cosmos/group/v1/query";

export const useCosmvueStore = defineStore("cosmvue", {
  state: () => {
    return {
      rpcClient: null,
      rpcBase: null,
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
        returnValue = found?.amount / 1000000;
      } else {
        returnValue = 0;
      }

      let totalSupply = await queryBank.SupplyOf({
        denom: cosmosConfig[this.setChainSelected].coinLookup.chainDenom,
      });
      this.spendableBalances = returnValue;
      this.totalSupply = totalSupply.amount.amount;
      // this.totalSupplyPrice = ((totalSupply.amount.amount / 1000000) * this.chainSelectedPrice)
    },
    async getStakingModule() {
      const queryStaking = new staking.QueryClientImpl(this.rpcClient);
      let getPoolStaking = await queryStaking.Pool({});
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

      this.totalDelegations = (total / 1000000).toFixed(2);
      this.totalUnbound = (totalUnbound / 1000000).toFixed(2);
      this.poolStaking = getPoolStaking.pool;
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
    },
    setAddress(address) {
      this.address = address;
      this.isLogged = true;
    },
    setLogout() {
      this.address = "";
      this.isLogged = false;
    },
  },
});
