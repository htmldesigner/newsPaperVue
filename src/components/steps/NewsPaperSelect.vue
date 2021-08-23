<template>
  <div>

    <div class="col-6 pl-0 mb-4">
      <Selector v-if="newsPapersList"
                :selectorOptions="newsPapersList"
                :labelTitle="labelTitle =  this.$t('forms.select_newspapers', {value: 'Выберите газету'})"
                :placeholder="placeholder = this.$t('forms.newspapers_list', {value: 'Список газет'}) "
                @input="input"
      />
    </div>
    <div class="d-flex justify-content-between">
      <button class="btn custom-button" @click="back()">{{ $t('buttons.back', {value: 'Назад'}) }}</button>
      <button class="btn custom-button" :disabled="!selected" @click="next">{{ $t('buttons.next', {value: 'Далее'}) }}</button>
    </div>
  </div>
</template>

<script>
import Selector from "@/components/Selector";
import Steps from "@/components/Steps";

export default {
  name: "NewsPaperSelect",
  components: {
    Selector, Steps
  },
  computed: {
    newsPapersList() {
      return this.$store.getters.newspaperList
    }
  },
  data() {
    return {
      selected: '',
    }
  },
  methods: {
    input(val) {
      this.selected = val
      this.$store.commit('setNewsPaperId', +val)
    },
    next() {
      localStorage.setItem('Type', JSON.stringify([]))
      this.$emit('next', 'AdvertisementType')
    },
    back(){
      this.$router.push('/')
      this.$store.dispatch('clearState')
    }
  }
}
</script>

<style scoped lang="sass">

</style>