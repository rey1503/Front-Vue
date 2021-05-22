<template>
    <main>
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #A27A2C">
    <div class="collapse navbar-collapse" id="navbarColor01">
    <nuxt-link class="navbar-brand" to="/">Ticket</nuxt-link>
     <nuxt-link class="navbar-brand" to="/Vtickts">Ver Tickets</nuxt-link>
     </div>
    <template  v-if="accesoo == 'si'">
  <b-form inline @submit.prevent="login(usuario)">
    <b-form-input
      id="inline-form-input-name"
      class="mb-2 mr-sm-2 mb-sm-0"
      placeholder="Usuario"
      type="text"
      v-model="usuario.Usuario"
    ></b-form-input>

    <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
      <b-form-input type="password" id="inline-form-input-username" v-model="usuario.pass" placeholder="Contraseña"></b-form-input>
    </b-input-group>
    <b-button variant="primary" type="submit" class="mb-2 mr-sm-2 mb-sm-0">Entrar</b-button>
  </b-form>
</template>
<template v-else-if="accesoo == 'no'">
  <form  @submit.prevent="salir()">
<b-button variant="primary" type="submit" class="mb-2 mr-sm-2 mb-sm-0" >Salir</b-button>
</form>
</template>
  <b-nav right>
    <template v-if="noche=='blanco'">
  <b-button variant="outline-light" @click="noche = 'negro'" v-model="noche"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" d="M12 17.5a5.5 5.5 0 100-11 5.5 5.5 0 000 11zm0 1.5a7 7 0 100-14 7 7 0 000 14zm12-7a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h2.5A.75.75 0 0124 12zM4 12a.75.75 0 01-.75.75H.75a.75.75 0 010-1.5h2.5A.75.75 0 014 12zm16.485-8.485a.75.75 0 010 1.06l-1.768 1.768a.75.75 0 01-1.06-1.06l1.767-1.768a.75.75 0 011.061 0zM6.343 17.657a.75.75 0 010 1.06l-1.768 1.768a.75.75 0 11-1.06-1.06l1.767-1.768a.75.75 0 011.061 0zM12 0a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0V.75A.75.75 0 0112 0zm0 20a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5A.75.75 0 0112 20zM3.515 3.515a.75.75 0 011.06 0l1.768 1.768a.75.75 0 11-1.06 1.06L3.515 4.575a.75.75 0 010-1.06zm14.142 14.142a.75.75 0 011.06 0l1.768 1.768a.75.75 0 01-1.06 1.06l-1.768-1.767a.75.75 0 010-1.061z"></path></svg></b-button>
  <style type="text/css">
    body{ background: #10102B;}
    label{color: white;}
    #Repo{
 color: rgb(255, 254, 254); 
 background:  rgba(255, 255, 255, 0); 
 border-color:  rgb(255, 254, 254);
}  
.Repo{
    color: rgb(255, 254, 254); 
    background:  rgba(255, 255, 255, 0); 
    border-color:  rgb(255, 254, 254);
   }
  </style>  
    </template>
    <template v-else>
<b-button variant="outline-light" @click="noche = 'blanco'" v-model="noche"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" d="M16.5 6c0 5.799-4.701 10.5-10.5 10.5-.426 0-.847-.026-1.26-.075A8.5 8.5 0 1016.425 4.74c.05.413.075.833.075 1.259zm-1.732-2.04A9.08 9.08 0 0114.999 6a9 9 0 01-11.04 8.768l-.004-.002a9.367 9.367 0 01-.78-.218c-.393-.13-.8.21-.67.602a9.938 9.938 0 00.329.855l.004.01A10.002 10.002 0 0012 22a10.002 10.002 0 004.015-19.16l-.01-.005a9.745 9.745 0 00-.855-.328c-.392-.13-.732.276-.602.67a8.934 8.934 0 01.218.779l.002.005z"></path></svg></b-button>
    </template>
    </b-nav>
    </nav>
<Nuxt/>
    </main>
</template>

<script>
export default {
  data(){
    return {
    noche:'blanco',
    accesoo: 'si',
    usuario:{
    Usuario:'',
    pass:''
    }
    
    }
  }, methods:{
  async login(){
  const res = await fetch('https://backxpd.herokuapp.com/consulta',{
method:'POST',
headers:{
'Content-Type' : 'application/json',
},
body: JSON.stringify(this.usuario)
  })
  const datos = await res.json()
  //console.log(datos.token)
  this.$store.commit("saveToken",datos.token)
   localStorage.token = datos.token;
   this.usuario.Usuario = '';
   this.usuario.pass = '';
   localStorage.accesoo  = 'no';
  },
  salir(){
this.$store.commit("saveToken",null)
   localStorage.token = null;
     localStorage.accesoo  = 'si';
  }
  },
  
    mounted() {
    if(localStorage.noche) this.noche = localStorage.noche;
     if(localStorage.token)this.$store.commit("saveToken",localStorage.token);
     if(localStorage.accesoo) this.accesoo = localStorage.accesoo;
     },
  watch:{
    noche(newnoche) {
      localStorage.noche = this.noche;
    },
     token(newtoken) {
      localStorage.token = this.token;
    },
     accesoo(newtoken) {
      localStorage.accesoo = this.accesoo;
    }
},
}
</script>

