<template>
  <h2 class="title is-2">Progress</h2>
  <div id="overall-chart"></div>
  <hr />
  <div class="buttons has-addons">
    <button class="button" v-bind:class="{'is-active': dataType === 'value'}" v-on:click="setDataType('value')">Raw values</button>
    <button class="button" v-bind:class="{'is-active': dataType === 'percentage'}" v-on:click="setDataType('percentage')">% of population</button>
  </div>
  <div id="chart1"></div>
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
      overallChart: {} as ChartAPI,
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
    },
    partialVaccines: function (): Array<number> {
      return this.chartData.map((datapoint: ChartDataPoint) => this.getChartPoint(datapoint.value[0]) - this.getChartPoint(datapoint.value[1]))
    },
    newFirstDoses: function (): Array<number> {
      return this.chartData.map((datapoint: ChartDataPoint, index: number) => this.chartData[index - 1] ? this.getNumber(datapoint.value[0]) - this.getNumber(this.chartData[index - 1].value[0]) : this.getNumber(datapoint.value[0]))
    },
    newSecondDoses: function (): Array<number> {
      return this.chartData.map((datapoint: ChartDataPoint, index: number) => this.chartData[index - 1] ? this.getNumber(datapoint.value[1]) - this.getNumber(this.chartData[index - 1].value[1]) : this.getNumber(datapoint.value[1]))
    }
  },
  methods: {
    getNumber: function(value: string): number {
      return ~~value.replace(',','')
    },
    getChartPoint: function(value: string): number {
      const numberValue = this.getNumber(value)
      if (this.dataType === 'percentage'){
        return this.calculatePercentage(numberValue)
      }
      return numberValue
    },
    calculatePercentage: function(value: number): number {
      return Math.round((value / this.population) * 1000) / 10
    },
    updateChart: function(): void {

      this.chart.load({
        columns: [
          ['x', ...this.dates],
          ['First Vaccine', ...this.firstVaccines],
          ['Second Vaccine', ...this.secondVaccines]
        ]
      })
    },
    setDataType: function(value: string): void {
      this.dataType = value
      this.updateChart()
    }
  },
  mounted: function() {
    this.chart = c3.generate({
      bindto: '#chart1',
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
        },
      }
    })

    this.overallChart = c3.generate({
      bindto: '#overall-chart',
      data: {
        x: 'x',
        columns: [
          ['x', ...this.dates],
          ['Partially vaccinated', ...this.partialVaccines],
          ['Fully vaccinated', ...this.secondVaccines],
          ['New 1st dose', ...this.newFirstDoses],
          ['New 2nd dose', ...this.newSecondDoses]
        ],
        type: 'bar',
        types: {
          'New 1st dose': 'line',
          'New 2nd dose': 'line'
        },
        groups: [
            ['Fully vaccinated', 'Partially vaccinated']
        ],
        order: null,
        axes: {
          'New 1st dose': 'y2',
          'New 2nd dose': 'y2'
        },
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
        },
        y2: {
          show: true,
          padding: {bottom: 0}
        }
      },
      bar: {
          space: -0.3
      },
    })
  }
})
</script>

<style scoped>
</style>
