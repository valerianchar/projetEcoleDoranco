<template>
    <div id="myapp">
      <div class="bg-black">
        <div class="row">
          <div class="flex items-start font-bold text-white">
            
            <div >
              <router-link class=" me-3" :to="{name: 'create-post'}"  v-if="isLoggedIn">New</router-link>

              <router-link class="me-3" :to="{name: 'home'}"  v-if="isLoggedIn" @click="logMeOut">Logout</router-link>

              <router-link class="me-3" :to="{name: 'register'}" v-if="!isLoggedIn">Sign up</router-link>

              <router-link :to="{name: 'login'}" v-if="!isLoggedIn">Sign In</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-8 mt-4">
        <h1 class="text-4xl font-bold gap-3">Mon Blog</h1>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div v-if="!posts.length">
            ...Aucun post trouvé
        </div>
        <div v-else v-for="post in posts" :key="post._id" class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
          <div class="min-w-0 flex-1">
            <router-link :to="{name: 'single-post', params: {id: post._id}}" class="focus:outline-none">
              <p class="text-2xl font-medium text-gray-900">{{ post.title }}</p>
            </router-link>
            <p class="text-sm text-gray-500">{{ truncateString(post.content, 9) }}</p>
            <p class="text-sm text-gray-500">
              <strong>
                Date de publication : 
              </strong>
              <span>{{ formatDataTime(post.createdAt) }}</span>
            </p>
          </div>
          <div>
            <p v-if="isLoggedIn && isMyPost(post.userId)"
            @click="navigateToUpdate(post._id)" 
            class="cursor-pointer">Update</p>
            <p v-if="isLoggedIn && isMyPost(post.userId)"
            @click="deletePost(post)" 
            class="cursor-pointer">Delete</p>
          </div>
        </div>
      </div>
      </div>
      

    </div>
  </template>
  
  <script>

import jwt_decode from 'jwt-decode'
  
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
      truncateString(str, num) {
        if(str.length <= num){
          return str;
        }
        return str.slice(0, num) + '...'
      },
      formatDataTime(dateTime) {
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }
        return new Date(dateTime).toLocaleDateString('fr-FR', options)
      },
      decodeToken() {
        // if(this.checkLogin()){
        //   const token = JSON.parse(localStorage.getItem('myblogtoken'))
        // }
        const decoded = jwt_decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTAwNWYwYTVmNjk3Nzg3ZmUxMGE5NTUiLCJpYXQiOjE2OTQ3MDAzMjEsImV4cCI6MTY5NDcwMzkyMX0.I0Bhlkxf2sTZvxZDYpKv1AMu3kzB47Itla3ESMRvPlU');
        return decoded;
      },
      isMyPost(PostUserId) {
        const decoded = this.decodeToken();
        console.log(decoded);
        if(decoded){
          if(PostUserId === decoded.sub){
            return true;
          }
          return false;
        }
      },
      navigateToUpdate(postId){
        this.$router.push({
          name:'update-post',
          params: {id: postId}
        })
      },
      deletePost(post){
        fetch(`${this.baseURL}posts/delete/${post._id}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(post)
        })
        .then(response => {
          if(!response){
            throw new Error('erreur réseau');
          } else{
            this.$router.go(0);
          }
        })
        .catch(err => {
          console.error('erreur lors de la suppression des données', err);
        })
        console.log('Deleting post ... ' + post.title);
      }
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