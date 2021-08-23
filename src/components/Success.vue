<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 mt-5">
        <h1 class="text-center">Ваша заявка принята!</h1>
        <div style="margin: 0 auto;" class="mt-5 col-5 d-flex justify-content-between">
          <button class="btn custom-button">Квитанция.pdf</button>
          <button class="btn custom-button" @click="onIndex">На главную</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Success",
  methods: {
    onIndex(){
      this.$router.push('/')
      window.location.reload()
    }
  }
}
</script>

<style scoped>

</style>