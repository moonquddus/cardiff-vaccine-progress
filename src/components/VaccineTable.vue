<template>
    <h2 class="title is-2">Data</h2>
    <div class="columns is-centered">
      <div class="column is-narrow">
        <div class="table-container">
          <table class="table is-striped is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>Date</th>
                  <th class="has-text-centered">1st doses (new)</th>
                  <th class="has-text-centered">per 100</th>
                  <th class="has-text-centered">2nd doses (new)</th>
                  <th class="has-text-centered">per 100</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(dataPoint, index) in sortedData" :key="index">
                  <td><strong>{{ new Date(dataPoint.label).toLocaleDateString('en-GB', {dateStyle: 'short'}) }}</strong></td>
                  <td class="has-text-centered">{{ dataPoint.value[0] }} <em class="is-size-7"> ({{ getValueDifference(index, 0) }})</em></td>
                  <td class="has-text-centered">{{ calculatePercentage(dataPoint.value[0]) }}</td>
                  <td class="has-text-centered">{{ dataPoint.value[1] }} <em class="is-size-7"> ({{ getValueDifference(index, 1) }})</em></td>
                  <td class="has-text-centered">{{ calculatePercentage(dataPoint.value[1]) }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>Date</th>
                  <th class="has-text-centered">1st doses (new)</th>
                  <th class="has-text-centered">per 100</th>
                  <th class="has-text-centered">2nd doses (new)</th>
                  <th class="has-text-centered">per 100</th>
                </tr>
              </tfoot>
          </table>
        </div>
      </div>
    </div>

</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export interface ChartDataPoint {
  label: string,
  value: Array<string>
}

export default defineComponent({
  name: 'VaccineTable',
  props: {
    chartData: {
      type: Array as PropType<Array<ChartDataPoint>>,
      required: true
    },
  },
  data: function() {
    return {
      population: 133587 + 366903 // cardiff + vale
    }
  },
  computed: {
    sortedData: function(): Array<ChartDataPoint>{
      return [...this.chartData].reverse()
    }
  },
  methods: {
    getNumber: function(input: string): number {
      return ~~input.replace(',','')
    },
    calculatePercentage: function(value: string): number {
      return Math.round((this.getNumber(value) / this.population) * 1000) / 10
    },
    getValueDifference: function(index: number, valueIndex: number): number {
      return this.sortedData[index + 1] ? this.getNumber(this.sortedData[index].value[valueIndex]) - this.getNumber(this.sortedData[index + 1].value[valueIndex]) : this.getNumber(this.sortedData[index].value[valueIndex])
    }
  }
})
</script>

<style scoped>
</style>
