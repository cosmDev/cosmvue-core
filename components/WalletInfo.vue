<template> 
  <div class="grid">
    <div>
      <article v-if="isLogged">
        <header>Wallet Info</header>
        <h6>{{ props.addressWallet }}</h6>
        <table> 
          <tbody>
            <tr>
              <th scope="row">Available amount</th>
              <td>4,880</td> 
            </tr>
            <tr>
              <th scope="row">Delegated amount</th>
              <td>12,104</td>
            </tr>
            <tr>
              <th scope="row">Undelegated</th>
              <td>12,742</td>
            </tr>
            <tr>
              <th scope="row">Reward</th>
              <td>6,779</td> 
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">Average</th>
              <td>9,126</td> 
            </tr>
          </tfoot>
        </table>
      </article>  
      <article v-else class="errorSection">
        <header>Please connect your wallet</header>        
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
    background-color: rgb(255, 0, 0);
    color: rgb(255, 254, 254);
  }
</style>