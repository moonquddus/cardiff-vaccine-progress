<template>
  <section>
    <div class="container">
      <h1 class="title is-1">Cardiff &amp; Vale - Vaccination Progress</h1>
      <VaccineGraph v-bind:chartData="chartData" />
      <VaccineTable v-bind:chartData="chartData" />
    </div>
  </section>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        Made by <a target="_blank" href="https://linktr.ee/moon.quddus">Moon Quddus</a>. The <a target="_blank" href="https://github.com/moonquddus/cardiff-vaccine-progress">source code</a> is licensed
        <a target="_blank" rel="nofollow" href="https://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License (GPL), version 3</a>.
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VaccineGraph from './components/VaccineGraph.vue'
import VaccineTable from './components/VaccineTable.vue'
import vaccineData from './data'
import 'bulma/css/bulma.css'
// import './assets/bulmaswatch.min.css'

export default defineComponent({
  name: 'App',
  components: {
    VaccineGraph,
    VaccineTable
  },
  data: function() {
    return {
      chartData: vaccineData
    }
  }
})
</script>