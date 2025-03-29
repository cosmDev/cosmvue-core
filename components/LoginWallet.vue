<template> 
    <div class="flex two">
 
    <article class="card">
    <header>
        <h3><slot name="title" /></h3>
    </header>
    <footer>
        <button><slot name="title-btn" /></button>
    </footer>
    </article>
    </div>

    <div class="flex demo">
  <div><span>1</span></div>
  <div><span>2</span></div>
  <div><span>3</span></div>
  <div><span>4</span></div>
  <div><span>5</span></div>
  <div><span>6</span></div>
</div>
  </template>