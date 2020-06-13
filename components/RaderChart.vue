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
      setTimeout(() => { // TODO 非同期処理をきちんと書いて実装できないかな。。
        const data = {
          labels: ['CleanCup', 'Sweet', 'Acidity', 'MouseFeel', 'Flavor', 'AfterTaste', 'Balance', 'OverAll'],
          datasets: [{
            data: [this.cleanCup, this.sweet, this.acidity, this.mouseFeel, this.flavor, this.afterTaste, this.balance, this.overAll],
            label: "score",
            backgroundColor: "#FFFFF0",
            borderColor: "#F6E05E",
          }],
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
          },
        };
  
        this.renderChart(data, options)
      }, 800)
    }
  }
</script>
