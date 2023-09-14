<template>
    <div id="myapp">
        <small>Single Works</small>
        <div class="container">
        <div class="row">
          <div class="d-flex flex-row justify-content-between align-items-center">
            <router-link class="me-3" :to="{name: 'home'}">new</router-link>
            <router-link class="me-3" :to="{name: 'create-post'}">New</router-link>
            <router-link class="me-3" :to="{name: 'register'}">Sign up</router-link>
            <router-link :to="{name: 'login'}">Sign In</router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>

  
  export default {
    name: 'SinglePage',
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