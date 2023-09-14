<template>
    <div>
        <div class="centered">
            <h1>{{ titre }}</h1>
            <iframe width="560" height="315" 
            :src="srcVideo"
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen></iframe>
        </div>
        <h2 class="text-3xl">
            Mes meilleurs Cliens
        </h2>
        <div v-for="client in Clients" :key="client">
            {{ client }}
        </div>


        <h2 class="text-3xl">Liaison de données bidirectionnelle intra composant</h2>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                v-model="inputVal"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
           
          </form>
          <small>Vous avez tapé: </small>
          <span>{{ inputVal }}</span>

          <h2>Bouton compteur de clicks</h2>
          <div>
              <button
                type="submit"
                @click="gereLeClick"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Compteur
              </button>
              <div>
                    Nombre de click : {{ compteur }}
              </div>
            </div>

            <h2>Affichage conditionnel</h2>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Prénom:</label>

                <input type="text" class="form-control" id="exampleInputEmail1" v-model="prenom" aria-describedby="emailHelp">
            </div>
            <div class="row text-center mb-1">
                <div v-if="prenom === 'toto'">{{ prenom }} est un prénom splendide!</div>
                <div v-else-if="prenom !==''">{{ prenom }} est un prénom banal</div>
                <div v-else>Veuillez entrer un prénom</div>
            </div>

        </div>
    </div>
</template>

<script>

export default {
    name: "videoEmbed",

    components: {

    },
    data() {

        return {
            Clients: [
                "Freddy Krueger",
                "Mike Myers",
                "jason ToutCourt"
            ],
            inputVal: '',
            compteur: 0,
            prenom: '',
        }
    },
    props: {
        titre: String,
        srcVideo: String
    },
    methods: {
        gereLeClick() {
            this.compteur++;
        }
    }
}
</script>


<style scoped>

</style>