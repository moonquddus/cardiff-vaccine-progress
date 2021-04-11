<template>
  <h2 class="title is-2">Progress</h2>
  <div class="buttons has-addons">
    <button class="button" v-on:click="setDataType('value')">Raw values</button>
    <button class="button" v-on:click="setDataType('percentage')">% of population</button>
  </div>
  <div id="chart"></div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType } from 'vue'
import c3, { ChartAPI } from 'c3'
import 'c3/c3.min.css'

export interface ChartDataPoint {
  label: string,
  value: Array<string>
}

export default defineComponent({
  name: 'VaccineGraph',
  props: {
    chartData: {
      type: Array as PropType<Array<ChartDataPoint>>,
      required: true
    },
  },
  data: function() {
    return {
      chart: {} as ChartAPI,
      dataType: 'value',
      population: 133587 + 366903 // cardiff + vale
    }
  },
  computed: {
    dates: function (): Array<string> {
      return this.chartData.map((datapoint: ChartDataPoint) => datapoint.label)
    },
    firstVaccines: function (): Array<number> {
      return this.chartData.map((datapoint: ChartDataPoint) => this.getChartPoint(datapoint.value[0]))
    },
    secondVaccines: function (): Array<number> {
      return this.chartData.map((datapoint: ChartDataPoint) => this.getChartPoint(datapoint.value[1]))
    }
  },
  methods: {
    getChartPoint: function(value: string): number {
      const numberValue = ~~value.replace(',','')
      if (this.dataType === 'percentage'){
        return this.calculatePercentage(numberValue)
      }
      return numberValue
    },
    calculatePercentage: function(value: number): number {
      return Math.round((value / this.population) * 1000) / 10
    },
    updateChart: function(): void {
      this.chart.unload({
        ids: ['x', 'First Vaccine', 'Second Vaccine']
      })
      this.chart.load({
        columns: [
          ['x', ...this.dates],
          ['First Vaccine', ...this.firstVaccines],
          ['Second Vaccine', ...this.secondVaccines]
        ]
      })
      this.chart.resize()
    },
    setDataType: function(value: string): void {
      this.dataType = value
      this.updateChart()
    }
  },
  mounted: function() {
    this.chart = c3.generate({
      data: {
        x: 'x',
        columns: [
          ['x', ...this.dates],
          ['First Vaccine', ...this.firstVaccines],
          ['Second Vaccine', ...this.secondVaccines]
        ]
      },
      axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%e %b %y'
            }
        },
        y: {
          padding: {bottom: 0}
        }
      }
    })
  }
})
</script>

<style scoped>
</style>
