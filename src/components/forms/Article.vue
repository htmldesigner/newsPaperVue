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
      <label class="custom_label" for="inputFoForm">{{ $t('forms.article_title', {value: 'Заголовок статьи'}) }}</label>
      <input type="text" @input="setTitle" v-model="title" class="form-control custom_input" id="inputFoForm">
    </div>

    <div v-if="this.default === 'order'" class="col-6 pl-0 mb-4">
      <Selector v-if="orderArticle"
                :selectorOptions="orderArticle"
                :labelTitle="labelTitle = this.$t('forms.order', {value: 'Цена и размер статьи'})"
                :placeholder="placeholder = this.$t('forms.order', {value: 'Выбирите размер статьи'})"
                @input="setOrderArticle"
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


    <div class="form-group">
      <label for="exampleFormControlSelect1">{{this.$t('paper_line', {value: 'Полоса'})}}</label>
      <select class="form-control" id="exampleFormControlSelect1" @change="setStripsId($event)">
        <option disabled selected value="">Выберите один из вариантов</option>
        <option v-for="item in newspaperStrips" :value="item.id" >{{item.title}}</option>
      </select>
    </div>


    <Toggler
        :value="this.photo"
        :default="this.defaultPhoto"
        @input="setPhoto"
        :text="{owner: this.$t('forms.own_photo', {value: 'Свое фото'}), order: this.$t('forms.order_photo', {value: 'Заказное фото'})}"
        :id="'articleId'"
        :name="'photoRadioButton'"
    />

    <div v-if="this.defaultPhoto === 'owner'" class="pl-0 mb-4">
      <Selector
          v-if="articlePhotoSize"
          class="col-8 pl-0"
          :selectorOptions="articlePhotoSize"
          :labelTitle="labelTitle = this.$t('forms.select_size', {value: 'Выбирите размер'})"
          :placeholder="placeholder = this.$t('forms.image_sizes', {value: 'Доступные размеры изображений'})"
          @input="input"
      />
      <div class="mt-4">
        <input type="file" id="file" ref="file" @change="handleFileUpload"/>
        <button v-if="file" @click="clear">Очистить</button>
      </div>
    </div>

    <div v-else class="pl-0 mb-4">

      <Toggler
          :value="this.visit_studio"
          @input="setTypePhoto"
          :text="{visit: `Выездная фотосессия - ${pricePhotoVisit} тг`, studio: `Фото в нашей студии - ${pricePhotoInStudio} тг`}"
          :id="'selectTypePhoto'"
          :name="'selectTypePhoto'"
      />

      <Selector
          v-if="articlePhotoSize"
          class="col-8 pl-0"
          :selectorOptions="articlePhotoSize"
          :labelTitle="labelTitle = this.$t('forms.accommodation_cost', {value: 'Стоимость размещения'})"
          :placeholder="placeholder = 'Доступные размеры изображений'"
          @input="input"
      />

    </div>

  </div>
</template>

<script>
import TextArea from "../TextArea";
import Toggler from "../Toggler";
import Selector from "../Selector";

export default {
  name: "Article",
  components: {Toggler, TextArea, Selector},
  computed: {

    newspaperStrips(){
      return this.$store.getters.newspaperStrips
    },

    pricePhotoInStudio() {
      return this.$store.getters.pricePhotoInStudio
    },
    pricePhotoVisit() {
      return this.$store.getters.pricePhotoVisit
    },
    orderArticle() {
      return this.$store.getters.orderArticle
    },
    articlePhotoSize() {
      return this.$store.getters.articlePhotoSize
    }
  },
  data() {
    return {
      photo: {case_1: 'owner', case_2: 'order'},
      type: {case_1: 'owner', case_2: 'order'},
      visit_studio: {case_1: 'visit', case_2: 'studio'},

      default: 'owner',
      defaultPhoto: 'owner',
      contentType: this.$t('forms.article_text', {value: 'Текст статьи'}),
      symbolInfo: true,
      pictureSettings: null,

      file: null,
      content: '',
      title: '',
      photoType: 'owner',
      photoTypePrice: this.pricePhotoVisit,
      visitORstudio: null, //:default="visitORstudio"
      article_id: null,
      article_image_size_id: null,
      stripsId: null

    }
  },
  methods: {
    setStripsId(event){
      this.stripsId = parseInt(event.target.value)
      this.$store.commit('setStripsId', this.stripsId)
    },
    clear() {
      this.$refs.file.value = null
      this.$store.state.article_image = null
    },

    input(val) {
      if (val) {
        let id = val
        this.article_image_size_id = id
        this.pictureSettings = this.articlePhotoSize.find(el => {
          return el.id === +val
        })
        this.$store.state.articlePhotoPrice = this.pictureSettings.price
        this.$store.state.article_image_size_id = parseInt(this.article_image_size_id)
      }
    },

    setContent(value) {
      this.$store.commit('articleLength', value)
    },

    setTitle(event) {
      this.$store.commit('articleTitleLength', event.target.value)
    },

    setPhoto(checked) {
      this.defaultPhoto = checked
      this.$store.state.visitORstudio = null
      if (this.defaultPhoto === 'owner') {
        this.$store.commit('setPhotoTypePrice', 0)
      }
    },

    setType(checked) {
      this.default = checked
      if (checked === 'order') {
        this.contentType = 'Ваши пожелания'
        this.symbolInfo = false
        this.$store.commit('setTypeArticle', this.default)
      } else {
        this.contentType = 'Текст статьи'
        this.symbolInfo = true
        this.$store.commit('setSelectedArticlePrice', 0)
        this.$store.commit('setTypeArticle', this.default)
        this.article_id = null
        this.$store.state.article_id = this.article_id
      }
    },

    setTypePhoto(type) {
      this.visitORstudio = type

      if (this.visitORstudio === 'visit') {
        this.photoTypePrice = this.pricePhotoVisit
        this.$store.state.visitORstudio = this.visitORstudio
      }
      if (this.visitORstudio === 'studio') {
        this.photoTypePrice = this.pricePhotoInStudio
        this.$store.state.visitORstudio = this.visitORstudio
      }
      this.$store.commit('setPhotoTypePrice', this.photoTypePrice)
    },

    setOrderArticle(id) {
      let el = this.orderArticle.find(el => el.id === +id)
      this.article_id = el.id
      this.$store.commit('setSelectedArticlePrice', el.price)
      this.$store.state.article_id = this.article_id
    },

    handleFileUpload(event){
      this.file = this.$refs.file.files[0]
      this.$store.state.article_image = this.$refs.file.files[0]
    }

  },
  mounted() {
    this.$store.commit('setTypeArticle', this.default)
  }
}
</script>

<style scoped>

</style>