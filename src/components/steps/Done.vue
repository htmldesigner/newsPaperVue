<template>
  <div>
    <h1 class="text-center mb-5">{{$t('your_query', {value: 'Ваша заявка'})}}</h1>

    <div class="table-responsive" v-if="calculation">
      <table class="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">{{$t('query_type', {value: 'Тип заявки'})}}</th>
          <th scope="col">{{$t('price', {value: 'Цена'})}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in calculation" :key="index">
          <td>{{index + 1}}</td>
          <td>{{item.title}}</td>
          <td>{{item.price}} тг.</td>
        </tr>
        </tbody>
      </table>

    </div>

    <div class="mb-5">
      <button @click="orderPay" class="mt-3 btn custom-button" style="display: block; margin: 0 auto">{{$t('buttons.pay', {value: 'Оплатить'})}}</button>
<!--      <button @click="newOrder" class="mt-3 btn custom-button" style="display: block; margin: 0 auto">Новая заявка</button>-->
    </div>

  </div>
</template>

<script>
export default {
  name: "Done",
  computed: {
    calculation(){
      return this.$store.getters.getCalculation
    }
  },
  methods: {
    orderPay(){
      this.$store.dispatch('orderPay').then(response => {
        location.assign(response.url)
      })
    },
    newOrder() {
      this.$emit('next', 'NewsPaperSelect')
      let type = JSON.parse(localStorage.getItem('Type'))
      type = []
      localStorage.setItem('Type', JSON.stringify(type))
      this.$store.dispatch('clearState')
      window.location.reload()
    }
  }
}
</script>

<style scoped>

</style>