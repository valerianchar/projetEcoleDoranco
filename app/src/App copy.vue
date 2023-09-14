<template>
  <div id="myapp">
    <h1>Date et heure à laquelle l'utilisateur a clicker : {{ dateClicked }}, {{ hourClicked }}</h1>
    <DateAndTime @buttonClick="setClickedDateAndHours"/>
    <VideoEmbed :titre="titre" :srcVideo="src"/>
  </div>
</template>

<script>
import VideoEmbed from './components/videoEmbed'
import DateAndTime from './components/DateAndTime';

export default {
  name: 'App',
  components: {
    VideoEmbed,
    DateAndTime,
  },
  data(){
    return {
      dateClicked: '--/--',
      hourClicked: '--/--',
      titre: "Freeze corleon - Ancelotti",
      src: 'https://www.youtube.com/embed/a05sE-59zC0?si=Dy6PmGuasS-AtMWH',
    }
  },
  methods: {
    setClickedDateAndHours(today, now) {
      this.dateClicked = today;
      this.hourClicked = now;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>