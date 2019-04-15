<template>
  <div>
    <apexchart
      height="470"
      type="line"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
  export default {
    name: 'LineChart',
    data: function() {
      return {
        chartOptions: {
          chart: {
            id: 'vuechart-example'
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
          }
        },
        series: [{
          name: 'series-1',
          data: [30, 40, 35, 50, 49, 60, 70, 91]
        }]
      }
    },
  }
</script>
