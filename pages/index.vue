<template>
<main> 
 <b-alert
      :show="dismissCountDown"
      dismissible
      :variant=mensaje.color
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged">
     {{mensaje.texto }}
    </b-alert>
  <div id="principal">
  <form @submit.prevent="guardar()">
  <label for="">¿Quién Se Comunica?</label>
          <br/>
          <b-form-input type="text" name="qs" v-model="datos.nombre" id="dd" required/>
          <br/>
          <label for="">Número Teléfonico</label>
          <br/>
          <b-form-input type="text" name="tf" id="dd" v-model="datos.numero" required/>
          <br/>
  <template v-if="$fetchState.pending">Cargando...</template>
  <template v-else-if="$fetchState.error">An error occurred :(</template> 
  <template v-else>
   <label>RFC</label> <br>
<b-form-input list="my-list-id" name="rfce" v-model='datos.rfc' @keyup.enter="$fetch" type="text"  required></b-form-input><b-button  @click="$fetch" id="dd" variant="outline-info">Buscar</b-button>
    <datalist id="my-list-id">
      <option v-for="size in sizes">{{ size.rfc }}</option>
    </datalist>
          <b-form-datalist id="input-list"></b-form-datalist>
     <b-table hover :mountains="mountains"></b-table>
      <div v-for="mountain of mountains" :key="mountain.id">
          <label for="">Nombre Del Cliente</label>
          <b-form-input type="text" id="dd" :value=mountain.razonSocial />
           <label for="">Email</label>
            <b-form-input type="email" id="dd" name="Corre" v-model=datos.correo /> <br>
              <b-form-input type="text" id="dd" name="Corre" :value=mountain.email disabled />
           <label for="">Distribuidor</label>
          <b-form-input type="text" id="dd" :value=mountain.usuario />
           <label for="">Ultima Compra</label>
          <b-form-input type="text" id="dd" :value=mountain.fechaDeVenta />  
           <label for="">Total</label>
          <b-form-input type="text" id="dd" :value=mountain.total />
      </div>
  </template>
  </form>
    </div>
  <div id="btn">
        <b-button-group vertical>
          <form @submit.prevent="soporte1(datos)">
          <b-button id="dd" variant="outline-warning" @click="soporte = !soporte">Soporte</b-button
          ><br />
          <template id="incidencia" v-if="soporte == true">
            <label for="">Incidencia</label> <br />
            <b-form-select name="incidencia" v-model="datos.incidencia">
              <option value=""></option>
              <option value="ASESORÍA PORTAL">ASESORÍA PORTAL</option>
              <option value="CONFIGURACIÓN">CONFIGURACION</option>
              <option value="SERVICIO GRATUITO">SERVICIO GRATUITO</option>
              <option value="ACTIVACIONES">ACTIVACIONES</option>
              <option value="ASESORIA NÓMINA">ASESORIA NÓMINA </option>
              <option value="CSD">CSD</option>
              <option value="SOPORTE ADENDAS Y PERSONALIZACIÓN">SOPORTE ADENDAS Y PERSONALIZACIÓN</option>
              <option value="SOPORTE ASPEL">SOPORTE ASPEL</option>
              <option value="Soporte CIO">Soporte CIO</option>
              <option value="SOPORTE EDOS">SOPORTE EDOS</option>
              <option value="XML">XML</option>
              <option value="CANCELAR">CANCELAR</option>
              <option value="INFORMACIÓN">INFORMACIÓN</option>
              <option value="ZOPIM">ZOPIM</option>
              <option value="INCIDENCIAS PAE">INCIDENCIAS PAE</option>
              <option value="TIMBRADORES">TIMBRADORES</option>
            </b-form-select> <br>
            <template v-if="datos.incidencia === 'ASESORÍA PORTAL'">
              <b-form-select v-model="datos.detalle">
              <option value="Creación de cualquier tipo de cfdi">Creación de cualquier tipo de cfdi.</option>
              <option value="Apoyo en claves de conceptos o datos para el llenado">Apoyo en claves de conceptos o datos para el llenado</option>
              <option value="Asesoría con la aplicación de descuentos">Asesoría con la aplicación de descuentos</option>
              <option value="Asesoría con montos totales, subtotal, IVA, retenciones">Asesoría con montos totales, subtotal, IVA, retenciones</option>
              <option value="Proporcionar información para venta al publico en general">Proporcionar información para venta al publico en general</option>
              <option value=">Validación de navegador (Chrome, cookies, temporales o cambio de URL)">Validación de navegador (Chrome, cookies, temporales o cambio de URL)</option>
              <option value="Apoyo para el llenado de complementos">Apoyo para el llenado de complementos</option>
              <option value="Apoyo para generar cfdi con retenciones">Apoyo para generar cfdi con retenciones</option>
            </b-form-select> 
            </template>
            <template v-else-if="datos.incidencia === 'ZOPIM'">
              <b-form-select v-model="datos.detalle">
              <option value="Reseteo de Contraseña">Reseteo de Contraseña</option>
              <option value="Apoyo para cualquier CFDI">Apoyo para cualquier CFDI</option>
              <option value="Nómina">Nómina</option>
              <option value="Información">Información</option>
              <option value="Información Recompras">Información Recompras</option>
            </b-form-select> 
            </template>
             <template v-else-if="datos.incidencia === 'INCIDENCIAS PAE'">
              <b-form-select v-model="datos.detalle">
              <option value="Cancelaciones">Cancelaciones</option>
              <option value="Alta de plantillas">Alta de plantillas</option>
              <option value="Errores en pdf">Errores en pdf</option>
              <option value="Errores en timbrado">Errores en timbrado</option>
              <option value="Reenvío de correos">Reenvío de correos</option>
            </b-form-select> 
            </template>
                         <template v-else-if="datos.incidencia === 'TIMBRADORES'">
              <b-form-select v-model="datos.detalle">
              <option value="Reseteos de contraseña">Reseteos de contraseña</option>
              <option value="Envío de documentación">Envío de documentación</option>
              <option value="Subir certificados al portal de timbrado">Subir certificados al portal de timbrado</option>
              <option value="Incidencias en el portal de timbrado">Incidencias en el portal de timbrado</option>
              <option value="Errores de timbrado">Errores de timbrado</option>
              <option value="Validación de XML/TXT para el timbrado en pruebas o producción">Validación de XML/TXT para el timbrado en pruebas o producción</option>
              <option value="Dudas sobre la estructura del CFDI">Dudas sobre la estructura del CFDI</option>
              <option value="CFDIs que no existen en el sat">CFDIs que no existen en el sat</option>
              <option value="Dudas del proceso de cancelación y uso de los web services">Dudas del proceso de cancelación y uso de los web services</option>
              <option value="Incidencias en el servicio de timbrado/cancelación">Incidencias en el servicio de timbrado/cancelación</option>
              <option value="Plantillas personalizadas para el timbrado">Plantillas personalizadas para el timbrado</option>
              <option value="Recuperación de XML/PDF">Recuperación de XML/PDF</option>
              <option value="Reportes de uso de timbres">Reportes de uso de timbres</option>
            </b-form-select> 
            </template>
            <template v-else-if="datos.incidencia === 'CONFIGURACIÓN'">
              <b-form-select v-model="datos.detalle">
              <option value="Error de duplicidad de folios">Error de duplicidad de folios</option>
              <option value="Error en generación de PDF">Error en generación de PDF</option>
              <option value="Apoyo con la configuración inicial">Apoyo con la configuración inicial</option>
              <option value="Agregar lugar de Expedición">Agregar lugar de Expedición</option>
              <option value="Importar Catalogo">Importar Catalogo</option>
              <option value="Exportar catalogo">Exportar catalogo</option>
              <option value="Apoyo con la Firma de manifiesto">Apoyo con la Firma de manifiesto</option>
              <option value="Activar complementos">Activar complementos</option>
            </b-form-select> 
            </template>
            <template v-else-if="datos.incidencia === 'SERVICIO GRATUITO'">
              <b-form-select v-model="datos.detalle">
                <option value="Ayuda con el registro ">Ayuda con el registro </option>
                <option value="Cambio de datos">Cambio de datos</option>
                <option value="Configuración">Configuración</option>
              </b-form-select>
            </template>
            <template v-else-if="datos.incidencia === 'ACTIVACIONES'">
              <b-form-select v-model="datos.detalle">
                <option value="Errores de datos de activación">Errores de datos de activación</option>
                <option value="Cambiar fechas de vigencia">Cambiar fechas de vigencia</option>
                <option value="Cambio de RFC">Cambio de RFC</option>
                 <option value="Activacion de Retenciones">Activacion de Retenciones</option>
              </b-form-select>
            </template>
            <template v-else-if="datos.incidencia === 'ASESORIA NÓMINA'">
              <b-form-select v-model="datos.detalle">
              <option value="Apoyo en verificar la plantilla">Apoyo en verificar la plantilla</option>
              <option value="Verificar plantilla y ayudar al cliente a subirla">Verificar plantilla y ayudar a l cliente a subirla</option>
              <option value="Como descargar el formato Excel">Como descargar el formato Excel</option>
              <option value="Brindar asesoría en el llenado de la plantilla">Brindar asesoría en el llenado de la plantilla</option>
              <option value="Apoyo a cargar la plantilla">Apoyo a cargar la plantilla</option>
              <option value="Se le brindo al cliente la asesoría para el manejo de nómina en línea">Se le brindo al cliente la asesoría para el manejo de nómina en línea</option>
              <option value="Se le brindo al cliente asesoría sobre cómo generar nómina Excel llenado manual">Se le brindo al cliente asesoría sobre cómo generar nómina Excel llenado manual</option>
              <option value="Proporciona nómina por correo electrónico">Proporciona nómina por correo electrónico</option>
            </b-form-select>
            </template>
            <template v-else-if="datos.incidencia === 'CSD' ">
              <b-form-select v-model="datos.detalle">
              <option value="Agregar CSD">Agregar CSD</option>
              <option value="Contraseña CSD">Contraseña CSD</option>
              <option value="Apoyo con los pasos del tramite">Apoyo con los pasos del tramite</option>
              <option value="CSD caduco">CSD caduco</option>
              <option value="No aparece en la lista de LCO">No aparece en la lista de LCO</option>
              </b-form-select>
            </template>
           <template v-else-if="datos.incidencia ==='SOPORTE ADENDAS Y PERSONALIZACIÓN'">
              <b-form-select v-model="datos.detalle">
              <option value="Información del llenado">Información del llenado</option>
              <option value="Activación">Activación</option>
              <option value="Solicitud">Solicitud</option>
              </b-form-select>
            </template>
            <template v-else-if="datos.incidencia ==='SOPORTE ASPEL'">
              <b-form-select v-model="datos.detalle">
              <option value="Apoyo en configuración de timbres">Apoyo en configuración de timbres</option>
              <option value="Soporte previamente pagado">Soporte previamente pagado</option>
              </b-form-select>
            </template>
            <template v-else-if="datos.incidencia ==='Soporte CIO'">
              <b-form-select v-model="datos.detalle">
              <option value="Error polizas">Error polizas</option>
              <option value="Reseteo contraseña">Reseteo contraseña</option>
              <option value="Apoyo de configuración">Apoyo de configuración</option>
              <option value="Otros">Otros</option>
              </b-form-select>
            </template>
            <template v-else-if="datos.incidencia ==='SOPORTE EDOS'">
              <b-form-select v-model="datos.detalle">
              <option value="Información">Información</option>
              <option value="Manejo del sistema">Manejo del sistema</option>
              <option value="Otros">Otros</option>
              </b-form-select>
            </template>
            <template v-else-if="datos.incidencia ==='CANCELAR'">
              <b-form-select v-model="datos.detalle">
              <option value="Cancelación en proceso">Cancelación en proceso</option>
              <option value="Portal no Cancela">Portal no Cancela</option>
              <option value="Solicitud cancelada por el recepto">Solicitud cancelada por el recepto</option>
              <option value="UUID relacionado">UUID relacionado</option>
              </b-form-select>
            </template>
            <template v-else-if="datos.incidencia ==='XML'">
              <b-form-select v-model="datos.detalle">
              <option value="Revisión de XML">Revisión de XML</option>
              <option value="Reporta caracteres escapados">Reporta caracteres escapados</option>
              <option value="Error en la estructura">Error en la estructura</option>
              <option value="Cambio de RMF no aplicada">Cambio de RMF no aplicada</option>
              </b-form-select>
            </template>
            <template v-else-if="datos.incidencia ==='INFORMACIÓN'">
              <b-form-select v-model="datos.detalle">
              <option value="Llamada perdida (no contesta, numero equivocado, se corta sin dar soporte)">Llamada perdida (no contesta, numero equivocado, se corta sin dar soporte)</option>
              <option value="Información sobre productos">Información sobre productos</option>
              <option value="Información del proceso de recompras">Información del proceso de recompras</option>
              <option value="Datos de distribuidor">Datos de distribuidor</option>
              <option value="Seguimiento de Tickts">Seguimiento de Tickts</option>
              </b-form-select>
            </template>
            <br />
            <label for="">Descripción</label> <br>
            <textarea v-model="datos.observacion" id="" cols="50" rows="5" required> </textarea>
            <br />
            <label for="">¿Concluido?</label> <br />
              <b-button id="dd" variant="outline-success" type="submit" name="id" value="2" >Si</b-button>
            <b-button id="No" variant="outline-danger" @click="R = !R">No</b-button> <br>
            <template v-if="R == true">
                <br />
                <b-form-select v-model="datos.incidencian2" id="">
                  <option value="Solicitud de cotización de personalización">
                    Solicitud de cotización de personalización
                  </option>
                  <option value="Error 500">Error 500</option>
                  <option value="Error Servicio Gratuito">Error Servicio Gratuito</option>
                  <option value="PDF Dañado con Personalización">PDF Dañado con Personalización</option>
                  <option value="Errores de Activacion">Errores de Activacion</option>
                  <option value="Error de la estructura de la adenda">Error de la estructura de la adenda</option>
                  <option value="Reseteo contraseña de Timbrado">Reseteo contraseña de Timbrado</option>
                  <option value="Xml no se localiza en el SAT">Xml no se localiza en el SAT</option>
                  <option value="Activacion de Retenciones">Activacion de Retenciones</option>
                  <option value="Error desconocido">Error desconocido</option>
                  <option value="Cambio de vigencia">Cambio de vigencia</option>
                  <option value="Estructura del XML invalida N2">Estructura del XML invalida N2</option>
                  </b-form-select><br />
                <label>Detalle</label><br />
                <textarea v-model="datos.detallen2" id="" cols="50" rows="5"></textarea> <br/>
                <br />
                  <b-button id="dd" variant="success" name="id"  type="submit" value="5" >Enviar</b-button> <br>
            </template>
          </template> <br>
          </form>
          <form  @submit.prevent="transferencia(datos)">
          <b-button id="dd" class="Repo" variant="outline-dark"  @click="trans = !trans">Transferencia</b-button> <br>
          <template id="transferencia" v-if="trans == true"> 
            <label for="">Transferencia a </label> <br />
            <b-form-input name="tras" list="my-list-ide" v-model="datos.incidencia"></b-form-input>
                <datalist id="my-list-ide">
              <option value="Transferencia a ventas">Transferencia a ventas</option>
              <option value="Transferencia a mesa de distribuidores">Transferencia a mesa de distribuidores</option>
              <option value="Transferencia a otro asesor de soporte">Transferencia a otro asesor de soporte</option>
                </datalist>
            <br />
            <b-button id="dd" variant="outline-success" name="id"  type="submit" value="3">Enviar</b-button>
          </template>
          </form>
          <br />
            <form  @submit.prevent="reseteo(datos)">
            <b-button id="dd" variant="outline-success" name="id" type="submit" value="4">Reseteo de Contraseña</b-button>
          </form>
          <br />
          <form  @submit.prevent="falla()">
          <b-button id="dd" variant="outline-danger" type="submit" name="id" v-model="fama.id" >Falla Masiva</b-button>
          </form>
        </b-button-group>
      </div>
</main>
</template>

<script>
  export default {
    layout: "barra",
    data() {
      return {
        mensaje:{color:'', texto :''},
        dismissSecs:5,
        dismissCountDown:0,
        incidencia:'',
        data:'',
         datos:{
          nombre:'',
          numero:'',
          correo:'',
          rfc:'',
          incidencia:'',
          detalle:'',
          observacion:'',
          incidencian2:'',
          detallen2:'',
        },
        sizes: [],
        mountains: [],
        Repo: false,
      trans: false,
      R: false,

      soporte: false,
      fama:{
          id:'6'
      },
      }
    }, methods :{
      countDownChanged(dismissCountDown){
        this.dismissCountDown = dismissCountDown
      },
      showAlert(){
        this.dismissCountDown = this.dismissSecs
      },
      async falla(){
        const res = await fetch(' https://backxpd.herokuapp.com/falla',{
method:'POST',
headers:{
'Content-Type' : 'application/json',
 token:this.counter
},
body: JSON.stringify(this.fama)
  })
  const datos = await res.json()
   if(res.status == 404){
     this.showAlert();
        this.mensaje.texto = datos.mensaje
        this.mensaje.color = 'danger';
  }else{
      this.showAlert();
        this.mensaje.texto = datos.mensaje
        this.mensaje.color = 'success';
  }
      },
       async reseteo(){
        const res = await fetch(' https://backxpd.herokuapp.com/reseteo',{
method:'POST',
headers:{
'Content-Type' : 'application/json',
token:this.counter
},
body: JSON.stringify(this.datos)
  })
  const datos = await res.json()
  if(res.status == 404){
     this.showAlert();
        this.mensaje.texto = datos.mensaje
        this.mensaje.color = 'danger';
  }else{
 this.showAlert();
        this.mensaje.texto = datos.mensaje
        this.mensaje.color = 'success';
        this.datos.nombre = '';
        this.datos.numero = '';
        this.datos.correo = '';
        this.datos.rfc = '';
        this.mountains = [];
  }
      },
      async transferencia(){
        const res = await fetch('https://backxpd.herokuapp.com/transferencia',{
method:'POST',
headers:{
'Content-Type' : 'application/json',
token:this.counter
},
body: JSON.stringify(this.datos)
  })
  const datos = await res.json()
  if(res.status == 404){
     this.showAlert();
        this.mensaje.texto = datos.mensaje
        this.mensaje.color = 'danger';
  }else{
      this.showAlert();
        this.mensaje.texto = datos.mensaje
        this.mensaje.color = 'success';
         this.datos.nombre = '';
        this.datos.numero = '';
        this.datos.correo = '';
        this.datos.rfc = '';
        this.datos.incidencia = '';
        this.trans = false;
        this.mountains = [];
  }
      },
       async soporte1(){
        const res = await fetch('https://backxpd.herokuapp.com/soporte',{
method:'POST',
headers:{
'Content-Type' : 'application/json',
token:this.counter
},
body: JSON.stringify(this.datos)
  })
  const datos = await res.json()
  if(res.status == 404){
     this.showAlert();
        this.mensaje.texto = datos.mensaje
        this.mensaje.color = 'danger';
  }else{
      this.showAlert();
        this.mensaje.texto = datos.mensaje
        this.mensaje.color = 'success';
         this.datos.nombre = '';
        this.datos.numero = '';
        this.datos.correo = '';
        this.datos.rfc = '';
        this.datos.incidencia = '';
        this.soporte = false;
        this.mountains = [];
  }
      }
    },
    mounted() {
    if(localStorage.token) 
    this.$store.commit("saveToken",localStorage.token)
  },computed:{
    counter(){
      return this.$store.getters['getCounter']
    }

  },
  watch:{
    token(newtoken) {
      localStorage.token = newtoken;
    }
    },
    async fetch() {
      if(this.counter == null){
        return false
      }else{
         this.sizes= await fetch("http://localhost:3001/consulta",{
          headers:{
          token:this.counter
          }
        })
    .then((res) =>
      res.json() 
    );}
    const a =this.datos.rfc 
      if(a ==''){
        return false
      }else{
      this.mountains = await fetch(
        'http://localhost:3001/respuesta/'+a ,{
          headers:{
          token:this.counter
        }
        }
      ).then(res =>
      res.json())}
      
    }
 
  }
</script>