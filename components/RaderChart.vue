<script>
  import { Radar } from 'vue-chartjs'

  export default {
    extends: Radar,
    props: {
      cleanCup: Number,
      sweet: Number,
      acidity: Number,
      mouseFeel: Number,
      flavor: Number,
      afterTaste: Number,
      balance: Number,
      overAll: Number,
    },
    mounted() {
      setTimeout(() => {
        console.log(this.cleanCup)
        console.log(this.sweet)
        console.log(this.acidity)
        console.log(this.mouseFeel)
        console.log(this.flavor)
        console.log(this.afterTaste)
        console.log(this.balance)
        console.log(this.overall)
        const data = {
          labels: ['CleanCup', 'Sweet', 'Acidity', 'MouseFeel', 'Flavor', 'AfterTaste', 'Balance', 'OverAll'],
          datasets: [{
            data: [this.cleanCup, this.sweet, this.acidity, this.mouseFeel, this.flavor, this.afterTaste, this.balance, this.overAll]
          }]
        }
        const options = {
          scale: {
            angleLines: {
              display: false
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 8
            }
          }
        };
  
        this.renderChart(data, options)
      }, 800)
    }
  }
</script>
