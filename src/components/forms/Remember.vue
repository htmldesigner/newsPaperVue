<template>
  <div>

    <Toggler
        :value="this.type"
        :default="this.default"
        @input="setType"
        :text="{owner: this.$t('forms.own_text', {value: 'Свой текст'}), order: this.$t('forms.order', {value: 'Заказать'})}"
        :id="'photoId'"
        :name="'articleRadioButton'"
    />

    <div v-if="this.default === 'owner'" class="form-group">
      <label class="custom_label" for="inputFoForm">{{
          $t('forms.title', {value: 'Заголовок'})
        }}</label>
      <input type="text" @input="setTitle" v-model="title" class="form-control custom_input" id="inputFoForm">
    </div>

    <div v-if="this.default === 'order'" class="col-6 pl-0 mb-4">
      <Selector v-if="orderEskealu"
                :selectorOptions="orderEskealu"
                :labelTitle="labelTitle = this.$t('forms.order', {value: 'Цена и размер статьи'})"
                :placeholder="placeholder = this.$t('forms.order', {value: 'Выбирите размер статьи'})"
                @input="setOrderNecrolog"
      />
    </div>

    <div>
      <TextArea
          @input="setContent"
          :contentType="this.contentType"
          :symbolInfo="this.symbolInfo"
          :titleCount="this.title.length"
          :pictureSettings="this.pictureSettings"
      />
    </div>

    <Selector
        v-if="eskealuPhotoSize"
        class="col-8 pl-0"
        :selectorOptions="eskealuPhotoSize"
        :labelTitle="labelTitle = this.$t('forms.accommodation_cost', {value: 'Стоимость размещения'})"
        :placeholder="placeholder = 'Доступные размеры изображений'"
        @input="input"
    />

    <div class="mt-4">
      <input type="file" id="file" ref="file" @change="handleFileUpload"/>
      <button v-if="file" @click="clear">Очистить</button>
    </div>

  </div>
</template>

<script>
import TextArea from "../TextArea";
import Toggler from "../Toggler";
import Selector from "../Selector";

export default {
  name: "Remember",
  components: {Toggler, TextArea, Selector},
  computed: {
    eskealuPhotoSize() {
      return this.$store.getters.getEskealuPhotoSize
    },
    eskealuSettings() {
      return this.$store.getters.getEskealuSettings
    },
    orderEskealu() {
      return this.$store.getters.getOrderEskealu
    },
  },
  data() {
    return {

      photo: {case_1: 'owner', case_2: 'order'},
      type: {case_1: 'owner', case_2: 'order'},
      visit_studio: {case_1: 'visit', case_2: 'studio'},

      default: 'owner',
      defaultPhoto: 'owner',
      contentType: this.$t('forms.text', {value: 'Текст'}),
      symbolInfo: true,
      pictureSettings: null,

      file: null,
      content: '',
      title: '',
      photoType: 'owner',
      photoTypePrice: this.pricePhotoVisit,
      visitORstudio: null, //:default="visitORstudio"
      eskealu_id: null,
      eskealu_image_size_id: null,
      stripsId: null

    }
  },
  methods: {
    clear() {
      this.$refs.file.value = null
      this.$store.state.eskealuImage = null
    },

    input(val) {
      if (val) {
        let id = val
        this.eskealu_image_size_id = id
        this.pictureSettings = this.eskealuPhotoSize.find(el => {
          return el.id === +val
        })
        this.$store.state.eskealuPhotoPrice = this.pictureSettings.price
        this.$store.state.eskealu_image_size_id = parseInt(this.eskealu_image_size_id)
      }
    },

    setContent(value) {
      this.$store.commit('eskealuLength', value)
    },

    setTitle(event) {
      this.$store.commit('eskealuTitleLength', event.target.value)
    },

    setType(checked) {
      this.default = checked
      if (checked === 'order') {
        this.contentType = 'Ваши пожелания'
        this.symbolInfo = false
        this.$store.commit('setTypeEskealu', this.default)
      } else {
        this.contentType = 'Текст статьи'
        this.symbolInfo = true
        this.$store.commit('setSelectedArticlePrice', 0)
        this.$store.commit('setTypeEskealu', this.default)
        this.eskealu_id = null
        this.$store.state.eskealu_id = this.eskealu_id
      }
    },

    setOrderNecrolog(id) {
      let el = this.orderEskealu.find(el => el.id === +id)
      this.eskealu_id = el.id
      this.$store.commit('setSelectedEskealuPrice', el.price)
      this.$store.state.eskealu_id = this.eskealu_id
    },

    handleFileUpload(event) {
      this.file = this.$refs.file.files[0]
      this.$store.state.eskealuImage = this.$refs.file.files[0]
    }
  },
  mounted() {
    this.$store.commit('setTypeEskealu', this.default)
  }
}
</script>

<style scoped>

</style>