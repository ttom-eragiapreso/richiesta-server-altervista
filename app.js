const {createApp} = Vue;

createApp({

  data(){
    return{
      // Mi prendo gli url per la chiamata e il path per poi mettere i files.
      apiUrl: 'http://alicecaronna1.altervista.org/alice-caronna-php/index.php',
      mediaUrl: 'http://alicecaronna1.altervista.org/alice-caronna-php/',
      // Creo degli array vuoti che andrò a popolare con i rispettivi contenuti che mi arrivano dalla chiamata
      allMVimg: [],
      allMVvideos: [],
      allWAimg: [],
      allWAvideos: [],
    }
  },
  
  methods: {

    getMedia(){
      // Chiamo il DB
      axios.get(this.apiUrl)
      .then(r => {
        // Itero tra gli oggetti, in questo caso la rappresentazione in JSON della struttura delle cartelle 
        for(let key in r.data){
          // In ogni cartella poi itero tra tutti gli elementi e li pusho nelle rispettive cartelle vedendo a quale appartengono.
          for(let obj of r.data[key]){
            if(obj.url.includes("MV-img")) this.allMVimg.push(obj)
            if(obj.url.includes("MV-videos")) this.allMVvideos.push(obj)
            if(obj.url.includes("WA-img")) this.allWAimg.push(obj)
            if(obj.url.includes("WA-videos")) this.allWAvideos.push(obj)
          }

        }

      })
      .catch(error => console.log(error))
    },
    
  },
  mounted(){
    this.getMedia()
  }
}).mount("#app")

