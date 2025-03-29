<template> 
  <div class="grid">
    <div>
      <article v-if="isLogged">
        <hgroup>
          <h2>Wallet Info</h2>
          <p class="viewAddress">{{ props.addressWallet }}</p>
        </hgroup>
        <header>
          <p>Wallet Info</p><small>{{ props.addressWallet }}</small></header>        
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
      <article v-else class="errorSection">
        <header class="errorSection">Error</header>   
        <h6>Please connect your wallet</h6>     
      </article> 
    </div> 
  </div>
</template>

<script setup>
  const props = defineProps(['addressWallet'])
  let isLogged = false

  if (props.addressWallet && props.addressWallet.trim() !== '') {
    isLogged = true;
  }

  console.log(props.addressWallet)
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