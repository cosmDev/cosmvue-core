<template>
  <v-sheet
    v-if="store.isLogged"
    border
    min-height="400"
    class="ma-2 pa-2"
    rounded="lg"
  >
    <!-- Title -->

    <v-row no-gutters>
      <v-col cols="12" sm="6">
        <v-sheet class="text-h6 pa-2"> Quick actions </v-sheet>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12" sm="12">
        <v-list lines="one">
          <!-- To claim -->

          <v-list-item
            title="To claim"
            :subtitle="
              store.totalRewards +
              ' ' +
              cosmosConfig[store.setChainSelected].coinLookup.viewDenom
            "
            class="mb-2"
          >
            <template v-slot:prepend>
              <v-avatar>
                <v-icon
                  size="32"
                  :color="cosmosConfig[store.setChainSelected].color"
                  >mdi-download</v-icon
                >
              </v-avatar>
            </template>
            <template v-slot:append>
              <v-btn min-width="100" variant="tonal"> Claim </v-btn>
            </template>
          </v-list-item>

          <v-divider></v-divider>

          <!-- Available -->

          <v-list-item
            title="Available"
            :subtitle="
              store.spendableBalances +
              ' ' +
              cosmosConfig[store.setChainSelected].coinLookup.viewDenom
            "
            class="mb-2"
          >
            <template v-slot:prepend>
              <v-avatar>
                <v-icon
                  size="32"
                  :color="cosmosConfig[store.setChainSelected].color"
                  >mdi-send-circle-outline</v-icon
                >
              </v-avatar>
            </template>
            <template v-slot:append>
              <v-btn min-width="100" variant="tonal"> Send </v-btn>
            </template>
          </v-list-item>

          <v-divider></v-divider>

          <!-- To delegate -->

          <v-list-item
            title="To delegate"
            :subtitle="
              store.spendableBalances +
              ' ' +
              cosmosConfig[store.setChainSelected].coinLookup.viewDenom
            "
            class="mb-2"
          >
            <template v-slot:prepend>
              <v-avatar size="38" :color="grey">
                <v-icon :color="cosmosConfig[store.setChainSelected].color"
                  >mdi-upload</v-icon
                >
              </v-avatar>
            </template>
            <template v-slot:append>
              <v-btn min-width="100" variant="tonal"> Stake </v-btn>
            </template>
          </v-list-item>

          <v-divider></v-divider>

          <!-- Undelegate / Redelegate -->

          <v-list-item
            title="Undelegate / Redelegate"
            :subtitle="
              store.totalDelegations +
              ' ' +
              cosmosConfig[store.setChainSelected].coinLookup.viewDenom
            "
            class="mb-2"
          >
            <template v-slot:prepend>
              <v-avatar size="38">
                <v-icon :color="cosmosConfig[store.setChainSelected].color"
                  >mdi-arrow-u-up-left-bold</v-icon
                >
              </v-avatar>
            </template>
            <template v-slot:append>
              <v-btn min-width="100" variant="tonal"> Redel </v-btn>
            </template>
          </v-list-item>

          <v-divider v-if="store.isValidator"></v-divider>

          <!-- Claim validator rewards -->

          <v-list-item
            v-if="store.isValidator"
            title="Validator rewards"
            :subtitle="
              store.myValidatorReward +
              ' ' +
              cosmosConfig[store.setChainSelected].coinLookup.viewDenom
            "
          >
            <template v-slot:prepend>
              <v-avatar size="32" :color="grey">
                <v-icon>mdi-cash</v-icon>
              </v-avatar>
            </template>
            <template v-slot:append>
              <v-tooltip location="start" text="Soon">
                <template v-slot:activator="{ props }">
                  <v-btn
                    :color="grey"
                    icon="mdi-cash"
                    variant="text"
                    v-bind="props"
                  ></v-btn>
                </template>
              </v-tooltip>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script setup>
import { useCosmvueStore } from "../stores/cosmvue";
import cosmosConfig from "../cosmos.config.js";

const store = useCosmvueStore();
</script>
