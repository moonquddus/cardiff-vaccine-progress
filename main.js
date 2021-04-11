import c3 from 'c3'
import data from '/src/data.js'

import 'bulma/css/bulma.css'
import 'c3/c3.min.css'

const dates = data.map(datapoint => datapoint.label)
const firstVaccines = data.map(datapoint => datapoint.value[0].replace(',',''))
const secondVaccines = data.map(datapoint => datapoint.value[1].replace(',',''))
const population = 133587 + 366903 // cardiff + vale

data.forEach(dataPoint => {
  const row = document.querySelector('#app table.table tbody').insertRow()
  row.insertCell().append(dataPoint.label)
  row.insertCell().append(dataPoint.value[0])
  row.insertCell().append(dataPoint.value[1])
});

c3.generate({
  data: {
    x: 'x',
    columns: [
      ['x', ...dates],
      ['First Vaccine', ...firstVaccines],
      ['Second vaccine', ...secondVaccines]
    ]
  },
  axis: {
    x: {
        type: 'timeseries',
        tick: {
            format: '%d-%m-%Y'
        }
    }
}
});