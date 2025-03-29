<template> 
  <div class="grid">
    <div>
      <article>
        <header><slot name="title" /></header>
        <button style="width: 100%;"><slot name="title-btn" /></button> 
      </article>  
    </div> 
  </div>
</template>