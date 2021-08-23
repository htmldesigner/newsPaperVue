<template>
  <div>
    <p class="componentLabel">{{ $t('ad_type', {value: 'Тип рекламы'}) }}</p>
    <hr>
    <div class="types">
      <div
          class="typeItem"
          :class="{active: type.id === selectedType}"
          v-for="type in types" :key="type.id"
          @click="selectType(type.id)"
      >
        <p>{{ type.name }}</p>
      </div>
    </div>

    <div class="d-flex justify-content-between">
      <button class="btn custom-button" @click="back">{{ $t('buttons.back', {value: 'Назад'}) }}</button>
      <button class="btn custom-button" :disabled="!selectedType" @click="next">
        {{ $t('buttons.next', {value: 'Далее'}) }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdvertisementType",
  computed: {
    types() {
      return [
        {id: 1, name: this.$t('advt'), component: "Advert"},
        {id: 2, name: this.$t('article'), component: "Article"},
        {id: 3, name: this.$t('banner'), component: "Banner"},
        {id: 4, name: this.$t('necrology'), component: "Necrology"},
        {id: 5, name: this.$t('remember'), component: "Remember"},
      ]
    }

  },
  data: () => {
    return {
      selectedType: null,
    }
  },
  methods: {
    selectType(typeId) {
      this.selectedType = typeId
      let type = this.types.find(el => el.id === typeId)
      this.$store.commit('setAdvertisementType', type.component)
    },
    next() {
      this.$emit('next', 'Content')
      let form = this.types.find(el => {
        return el.id === +this.selectedType
      })
      this.$store.commit('selectComponentForm', form)
      this.$store.dispatch('getReleases')
    },
    back() {
      this.$emit('back', 'NewsPaperSelect')
    }
  }
}
</script>

<style scoped>

</style>