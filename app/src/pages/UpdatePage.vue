<template>
    <div id="myapp">
        <small>Update Works</small>
        <div class="container">
        <div class="row">
          <div class="d-flex flex-row justify-content-between align-items-center">
            <router-link class="me-3" :to="{name: 'home'}">new</router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>

  
  export default {
    name: 'UpdatePage',
    emits: [
    ],
    components: {
    },
    data(){
      return {
      }
    },
    methods: {
    }
  }
  </script>
  
  <style></style>