<template>
  <div>
    <p class="componentLabel">{{$t('service_type', {value: 'Тип услуги'})}}</p>
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
      <button class="btn custom-button" :disabled="!selectedType" @click="next">{{$t('buttons.next', {value: 'Далее'}) }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "WebSiteContentType",
  computed: {
    types(){
      return [
        {id: 1, name: this.$t('forms.web_banner'), component: "WebBanner"},
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
      this.$emit('next', 'WebSiteContent')
      let form = this.types.find(el => {
        return el.id === +this.selectedType
      })
      this.$store.commit('selectComponentForm', form)
      this.$store.dispatch('getWebSiteReleases')
    },
    back() {
      this.$emit('back', 'WebSiteSelect')
    }
  }
}
</script>

<style scoped>

</style>