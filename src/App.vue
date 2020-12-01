<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods:{
    ...mapActions(['getToken'])
  },
  created(){
    this.getToken();
    console.log('hola mundo');
  }
}
</script>
