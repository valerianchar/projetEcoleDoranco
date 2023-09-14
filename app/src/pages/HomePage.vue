<template>
    <div id="myapp">
      <div class="container">
        <div class="row">
          <div class="d-flex flex-row justify-content-between align-items-center">
            <h1>Mon Blog</h1>
            <div>
              <router-link class="me-3" :to="{name: 'create-post'}"  v-if="isLoggedIn">New</router-link>

              <router-link class="me-3" :to="{name: 'home'}"  v-if="isLoggedIn" @click="logMeOut">Logout</router-link>

              <router-link class="me-3" :to="{name: 'register'}" v-if="!isLoggedIn">Sign up</router-link>

              <router-link :to="{name: 'login'}" v-if="!isLoggedIn">Sign In</router-link>
            </div>
          </div>
        </div>
      </div>

    </div>
  </template>
  
  <script>

  
  export default {
    name: 'HomePage',
    emits: [
    ],
    components: {
    },
    data(){
      return {
        // isLoggedIn: this.checkLogin(),
        isLoggedIn: true,
        baseURL: 'http://localhost:2001/api/v1/',
        posts: [],
      }
    },
    methods: {
      checkLogin() {
        const token = JSON.parse(localStorage.getItem('myblogtoken'));

        if(!token){
          return false;
        }

        return true;
      },
      logMeOut() {
        // TODO
      },
    },
    mounted() {
      fetch(`${this.baseURL}posts`)
      .then(response => {
        if(!response.ok){
          throw new Error('Erreur réseau')
        }
        return response.json()
      })
      .then(data => {
        this.posts = data;
        console.log(this.posts);
      })
      .catch(err => {
        console.error('Erreur log de la récuperation des donnés : \n' + err);
      })
      
    }
  }
  </script>
  
  <style></style>