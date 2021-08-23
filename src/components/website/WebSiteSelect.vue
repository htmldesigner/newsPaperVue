<template>
<div>
  <div class="col-6 pl-0 mb-4">
    <Selector v-if="webSiteList"
              :selectorOptions="webSiteList"
              :labelTitle="labelTitle = this.$t('forms.choose_website', {value: 'Выберите сайт'})"
              :placeholder="placeholder = this.$t('forms.website_list', {value: 'Список сайтов'})"
              @input="input"
    />
  </div>

  <div class="d-flex justify-content-between">
    <button class="btn custom-button" @click="$router.push('/')">{{ $t('buttons.back', {value: 'Назад'}) }}</button>
    <button class="btn custom-button" :disabled="!selected" @click="next">{{$t('buttons.next', {value: 'Далее'}) }}</button>
  </div>

</div>
</template>

<script>
import Selector from "../Selector";
export default {
  components: {
    Selector
  },
  computed: {
    webSiteList(){
      return this.$store.getters.getWebSiteList
    }
  },
  name: "WebSiteSelect",
  data() {
    return {
      selected: '',
    }
  },
  methods: {
    input(val) {
      this.selected = val
      this.$store.commit('setWebSiteId', +val)
    },
    next() {
      // localStorage.setItem('Type', JSON.stringify([]))
      this.$emit('next', 'WebSiteContentType')
    }
  }
}
</script>

<style scoped>

</style>