<template> 
  <div class="grid">
    <div>
      <article v-if="isLogged">
        <header> 
        <hgroup>
           Wallet Info
          <p style="font-size: 16px;"><i>{{ cosmvueStore.address }}</i></p>
        </hgroup>
        
        </header> 

        <table> 
          <tbody>
            <tr>
              <th scope="row">Available amount</th>
              <td>0</td> 
            </tr>
            <tr>
              <th scope="row">Delegated amount</th>
              <td>0</td>
            </tr>
            <tr>
              <th scope="row">Undelegated</th>
              <td>0</td>
            </tr>
            <tr>
              <th scope="row">Reward</th>
              <td>0</td> 
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">Total</th>
              <td>0</td> 
            </tr>
          </tfoot>
        </table>
      </article>  
<!--       <article v-else class="errorSection">
        <header class="errorSection">Error</header>   
        <h6>Please connect your wallet</h6>     
      </article>  -->
    </div> 
  </div>
</template>

<script>
import { watch, defineComponent, ref } from 'vue';
import { useCosmvueStore } from '../stores/cosmvue'

export default defineComponent({
  props: {
    addressWalletInfo: {
      type: String,
      required: true,
    },
  },
setup(props) {
  
  let finallAddress = props.addressWalletInfo; // Initialize with prop value
  const isLogged = ref(false); // Reactive variable for login statu 

  const cosmvueStore = useCosmvueStore()

  // Watch for changes in props.addressWalletInfo
  watch(
    () => cosmvueStore.address,
    (newAddress) => {
      console.log('addressWalletInfo changed to', newAddress);
      cosmvueStore.address = newAddress; // Update the store with the new address
      isLogged.value = !!newAddress; // Update isLogged based on the new value
      finallAddress = newAddress; // Update finallAddress with the new value
      console.log('Updated finallAddress:', finallAddress);
    }
  );

  // Check if the wallet is logged in on mount
  if (props.addressWalletInfo) {
    isLogged.value = true;
  }

  return {
    isLogged,
    cosmvueStore,
    finallAddress
  };
},

});
</script>

<style>
  .errorSection {
    background-color: rgb(255, 166, 0);
    color: rgb(0, 0, 0);
  }
  .viewAddress {
    font-size: x-small; 
  }
</style>