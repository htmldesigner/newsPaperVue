<template>
  <div>

    <div class="pl-0 mb-4">
      <Selector v-if="categories"
                class="col-8 pl-0"
                :selectorOptions="categories"
                :labelTitle="labelTitle = this.$t('forms.choose_category', {value: 'Выбирите рубрику'})"
                :placeholder="placeholder ='Рубрики'"
                @input="input"
      />
    </div>


    <TextArea
        @input="setContent"
        :contentType="this.contentType"
        :symbolInfo="this.symbolInfo"
        :titleCount="this.title.length"
        :pictureSettings="this.pictureSettings"
    />


  </div>
</template>

<script>
import TextArea from "../TextArea";
import Selector from "../Selector";

export default {
  name: "Advert",
  components: {
    TextArea, Selector
  },
  computed: {
    categories() {
      return this.$store.getters.getCategories
    }
  },
  data() {
    return {
      contentType: this.$t('forms.ad_text', {value: 'Текст объявления'}) ,
      symbolInfo: true,
      pictureSettings: null,

      content: '',
      title: '',
    }
  }, methods: {
    setContent(val) {
      this.$store.state.advertText = val
    },
    input(id) {
      this.$store.state.advertCategoryId = +id
    }
  }
}
</script>

<style scoped>

</style>