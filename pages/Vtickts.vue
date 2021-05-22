<template>
    <main>
        <div id="table">
              <b-form-group>
      <b-button @click="reporte = !reporte"  variant="outline-dark" id="Repo"> Reporte Excel</b-button>
      <template v-if="reporte == true"> <br>
        <form @submit.prevent="mandar(fechas)">
        <b-form-input type="date" v-model="fechas.fecha"></b-form-input> <br>
        <b-form-input type="date" v-model="fechas.fecha2"></b-form-input> <br>
        <b-button type="submit" variant="outline-success" >Generar</b-button>
    </form> <br>
    <form action="https://backxpd.herokuapp.com/descarga">
      <b-button type="submit" variant="outline-success" >Descargar</b-button>
    </form>
      </template>
    </b-form-group>
         </div>
<!--v-for="item of items"-->
<div class="col-auto m-1 mh-auto">
         <table id="datos" class="table table-success table-sm">
  <thead class="table-warning" :sticky-header="stickyHeader">
    <tr>
      <th scope="col">Ticket</th>
      <th scope="col">Se comunico</th>
      <th scope="col">No. de telefono</th>
      <th scope="col">RFC</th>
      <th scope="col">Incidencia</th>
      <th scope="col">Detalle</th>
      <th scope="col">Observación</th>
      <th scope="col">DetalleN2</th>
      <th scope="col">ObservaciónN2</th>
      <th scope="col">Fecha</th>
      <th scope="col">Usuario</th>
      <th scope="col">Status Sistemas</th>
       <th scope="col">Status soporte</th>
       <th scope="col">Cargar Imagen</th>
       <th scope="col">Comentario_S</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item of items">
      <th scope="row">{{item.No_Ticket}}</th>
      <td>{{item.Se_Comunicó}}</td>
      <td>{{item.No_Telefono}}</td>
      <td>{{item.RFC}}</td>
      <td>{{item.Incidencia}}</td>
      <td>{{item.detalle}}</td>
      <td>{{item.observacion}}</td>
      <td>{{item.detalleN2}}</td>
      <td>{{item.observacionN2}}</td>
      <td>{{item.fecha}}</td>
      <td>{{item.Usuario}}</td>
      <td>{{item.Status_s}}</td>
      <div v-if="item.Status == 'Cerrado'">  
               <td>{{item.Status}}</td>
      </div>
      <div v-else-if="item.Status == 'En proceso'">  
       <form action='https://backxpd.herokuapp.com/updateS' method="POST">
      <input type="text" name="ids" style="display:none" :value="item._id">
      <b-button variant="outline-danger" type="submit">Cerrar</b-button>
      </form>
      </div>
      <td>
      <div v-if="item.Status_s == ''">
            <form action="https://backxpd.herokuapp.com/uploadimg" method="POST"  enctype="multipart/form-data">
               <b-button variant="outline-info" type="submit">Enviar</b-button>
                  <input type="text" name="ids" style="display:none" :value="item._id">
                  <input type="file" name="image">
                  </form>
      </div>
      <div v-else>
      </div>
       <td>{{item.comentario_S}}</td>
    </tr>
  </tbody>
</table>
</div>
    </main>
</template>
<script>
export default {
  layout: "barra",
  data() {
      return {
        stickyHeader:true,
        reporte:false,
        items: [],
        fechas:{
    fecha:'',
    fecha2:''
    },
        value:'',
        tkt:""
      }
    },computed:{
    counter(){
      return this.$store.getters['getCounter']
    },
      buscar: function () {
            return this.items.filter((item) => {
                return buscarEnObjecto(item, this.serch.toLowerCase());
            });
        }
    },
     mounted() {
    if(localStorage.token)this.$store.commit("saveToken",localStorage.token);
  },
  watch:{
    token(newtoken) {
      localStorage.token = this.token;
    }
    },
  created: function()
  {
    this.tabla();
  },
  async fetch(){

this.items=await fetch('https://backxpd.herokuapp.com/tick',{
        headers:{
          token:this.counter
        }}).then((res) => res.json());
  },
  methods:{
   async tabla(){
      if(this.counter ==  'null'){
        return false
      }
      else{
this.items=await fetch('https://backxpd.herokuapp.com/tick',{
        headers:{
          token:this.counter
        }}).then((res) => res.json());
    }
   }
  },
   async mandar(){
     const res = await fetch('https://backxpd.herokuapp.com/reporte',{
method:'POST',
headers:{
'Content-Type' : 'application/json',
 token:this.counter
},
body: JSON.stringify(this.fechas)
  })
   }
    };
</script>