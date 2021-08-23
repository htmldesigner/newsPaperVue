<template>
<div>
  <div class="steps">
    <div class="step">
      <div class="position active"></div>
      <p>Выбор газеты</p>
    </div>
    <div class="step">
      <div class="position" :class="{ active: this.$route.name === 'AdvertisementType'}"></div>
      <p>Тип рекламы</p>
    </div>
    <div class="step">
      <div class="position" :class="{ active: this.$route.name === 'Content'}"></div>
      <p>Контент</p>
    </div>
    <div class="step">
      <div class="position" :class="{ active: this.$route.name === 'CreateOrder'}"></div>
      <p>Оформить заявку</p>
    </div>
    <div class="step">
      <div class="position" :class="{ active: this.$route.name === 'Done'}"></div>
      <p>Оплата</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Steps"
}
</script>

<style scoped>

</style>