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
      <label class="custom_label" for="inputFoForm">{{ $t('forms.title', {value: 'Заголовок некролога'}) }}</label>
      <input type="text" @input="setTitle" v-model="title" class="form-control custom_input" id="inputFoForm">
    </div>

    <div v-if="this.default === 'order'" class="col-6 pl-0 mb-4">
      <Selector v-if="orderNecrolog"
                :selectorOptions="orderNecrolog"
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
          v-if="necrologPhotoSize"
          class="col-8 pl-0"
          :selectorOptions="necrologPhotoSize"
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
  name: "Necrology",
  components: {Toggler, TextArea, Selector},
  computed: {
    necrologPhotoSize(){
      return this.$store.getters.getNecrologPhotoSize
    },
    // necrologSettings(){
    //   return this.$store.getters.getNecrologSettings
    // },
    orderNecrolog(){
      return this.$store.getters.getOrderNecrolog
    },
  },
  data(){return{

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
    necrolog_id: null,
    necrolog_image_size_id: null,
    stripsId: null

  }},
  methods: {
    clear() {
      this.$refs.file.value = null
      this.$store.state.necrologImage = null
    },

    input(val) {
      if (val) {
        let id = val
        this.necrolog_image_size_id = id
        this.pictureSettings = this.necrologPhotoSize.find(el => {
          return el.id === +val
        })
        this.$store.state.necrologPhotoPrice = this.pictureSettings.price
        this.$store.state.necrolog_image_size_id = parseInt(this.necrolog_image_size_id)
      }
    },

    setContent(value) {
      this.$store.commit('necrologLength', value)
    },

    setTitle(event) {
      this.$store.commit('necrologTitleLength', event.target.value)
    },

    setType(checked) {
      this.default = checked
      if (checked === 'order') {
        this.contentType = 'Ваши пожелания'
        this.symbolInfo = false
        this.$store.commit('setTypeNecrology', this.default)
      } else {
        this.contentType = 'Текст статьи'
        this.symbolInfo = true
        this.$store.commit('setSelectedArticlePrice', 0)
        this.$store.commit('setTypeNecrology', this.default)
        this.necrolog_id = null
        this.$store.state.necrolog_id = this.necrolog_id
      }
    },

    setOrderNecrolog(id) {
      let el = this.orderNecrolog.find(el => el.id === +id)
      this.necrolog_id = el.id
      this.$store.commit('setSelectedNecrologyPrice', el.price)
      this.$store.state.necrolog_id = this.necrolog_id
    },

    handleFileUpload(event){
      this.file = this.$refs.file.files[0]
      this.$store.state.necrologImage = this.$refs.file.files[0]
    }
  },
  mounted() {
    this.$store.commit('setTypeNecrology', this.default)
  }
}
</script>

<style scoped>

</style>