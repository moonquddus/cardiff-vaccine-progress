<template>
  <section>
    <div class="container">
      <h1 class="title is-1">Cardiff &amp; Vale - Vaccination Progress</h1>
      <VaccineGraph v-bind:chartData="chartData" />
      <h2 class="title is-2">Data</h2>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VaccineGraph from './components/VaccineGraph.vue'
import vaccineData from './data'
import 'bulma/css/bulma.css'

export default defineComponent({
  name: 'App',
  components: {
    VaccineGraph
  },
  data: function() {
    return {
      chartData: vaccineData
    }
  }
})
</script>