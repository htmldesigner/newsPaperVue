<template>
  <div>
    <div class="col-6 pl-0 mb-4">
      <Selector v-if="socialNetworksList"
                :selectorOptions="socialNetworksList"
                :labelTitle="labelTitle = this.$t('forms.select_social_network', {value: 'Выберите соц. сеть'})"
                :placeholder="placeholder = 'Список соц. сетей'"
                @input="input"
      />
    </div>

    <div class="d-flex justify-content-between">
      <button class="btn custom-button" @click="$router.push('/')">{{ $t('buttons.back', {value: 'Назад'}) }}</button>
      <button class="btn custom-button" :disabled="!selected" @click="next">{{ $t('buttons.next', {value: 'Далее'}) }}</button>
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
    socialNetworksList(){
      return this.$store.getters.getSocialNetworksList
    }
  },
  name: "SocialSelect",
  data() {
    return {
      selected: '',
    }
  },
  methods: {
    input(val) {
      this.selected = val
      this.$store.commit('setSocialNetworkId', +val)
    },
    next() {
      // localStorage.setItem('Type', JSON.stringify([]))
      this.$emit('next', 'SocialContentType')
    }
  }
}
</script>

<style scoped>

</style>