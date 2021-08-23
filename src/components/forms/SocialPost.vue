<template>
  <div>
    <Toggler
        :value="this.type"
        :default="this.default"
        @input="setType"
        :text="{owner: this.$t('forms.own_text', {value: 'Свой текст'}), order: this.$t('forms.order', {value: 'Заказать'})}"
        :id="'photoId'"
        :name="'postRadio'"
    />

    <div v-if="this.default === 'owner'" class="form-group">
      <label class="custom_label" for="inputFoForm">{{ $t('forms.article_title', {value: 'Заголовок статьи'}) }}</label>
      <input type="text" @input="setTitle" v-model="title" class="form-control custom_input" id="inputFoForm">
    </div>

    <div v-if="this.default === 'order'" class="col-6 pl-0 mb-4">
      <Selector
          :selectorOptions="orderPostList"
          :labelTitle="labelTitle = this.$t('forms.prise_and_size_post', {value: 'Цена и размер поста'})"
          :placeholder="placeholder = this.$t('forms.select_post_size', {value: 'Выбирите размер поста'})"
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

    <Toggler
        :value="this.photo"
        :default="this.defaultPhoto"
        @input="setPhoto"
        :text="{owner: this.$t('forms.own_photo', {value: 'Свое фото'}), order: this.$t('forms.order_photo', {value: 'Заказное фото'})}"
        :id="'postToggleId'"
        :name="'postRadioButton'"
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
        <button v-if="file" @click="clear">{{ $t('buttons.clear', {value: 'Очистить'})}}</button>
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
          :labelTitle="labelTitle = 'Стоимость размещения'"
          :placeholder="placeholder = 'Доступные размеры изображений'"
          @input="input"
      />

    </div>

  </div>
</template>

<script>
import Toggler from "../Toggler";
import Selector from "../Selector";
import TextArea from "../TextArea";

export default {
  components: {
    Toggler, Selector, TextArea
  },
  name: "SocialPost",
  computed: {
    pricePhotoInStudio() {
      return this.$store.getters.postPricePhotoInStudio
    },
    pricePhotoVisit() {
      return this.$store.getters.postPricePhotoVisit
    },
    orderPostList() {
      return this.$store.getters.getOrderPost
    },
    articlePhotoSize() {
      return this.$store.getters.getPostPhotoSize
    }
  },
  data() {
    return {
      photo: {case_1: 'owner', case_2: 'order'},
      type: {case_1: 'owner', case_2: 'order'},
      visit_studio: {case_1: 'visit', case_2: 'studio'},

      default: 'owner',
      defaultPhoto: 'owner',
      contentType: this.$t('forms.post_text', {value: 'Текст поста'}),
      symbolInfo: true,
      pictureSettings: null,

      file: null,
      content: '',
      title: '',
      photoType: 'owner',
      photoTypePrice: this.pricePhotoVisit,
      visitORstudio: null, //:default="visitORstudio"
      post_id: null, //ID Заказного поста
      post_image_size_id: null,

    }
  },
  methods: {
    clear() {
      this.$refs.file.value = null
      this.$store.state.article_image = null
    },

    setType(checked) {
      this.default = checked
      if (checked === 'order') {
        this.contentType = 'Ваши пожелания'
        this.symbolInfo = false
        this.$store.commit('setPostType', this.default)
      } else {
        this.contentType = this.$t('forms.post_text', {value: 'Текст поста'})
        this.symbolInfo = true

        this.post_id = null
        this.$store.state.social.post_id = this.post_id

        this.$store.commit('setSelectedPostPrice', 0)
        this.$store.commit('setPostType', this.default)
      }
    },

    setContent(value) {
      this.$store.commit('postLength', value)
    },

    setTitle(event) {
      this.$store.commit('postTitleLength', event.target.value)
    },

    input(val) {
      if (val) {
        let id = val
        this.post_image_size_id = id
        this.pictureSettings = this.articlePhotoSize.find(el => {
          return el.id === +val
        })
        this.$store.commit('setPostPhotoPrice', this.pictureSettings.price)
        this.$store.commit('setPostImageSizeId', parseInt(this.post_image_size_id))
      }
    },

    setPhoto(checked) {
      this.defaultPhoto = checked
      this.$store.state.social.visitPostORstudioPost = null
      if (this.defaultPhoto === 'owner') {
        this.$store.commit('setPostPhotoTypePrice', 0)
      }
    },

    setTypePhoto(type) {
      this.visitORstudio = type

      if (this.visitORstudio === 'visit') {
        this.photoTypePrice = this.pricePhotoVisit
        this.$store.state.social.visitPostORstudioPost = this.visitORstudio
      }
      if (this.visitORstudio === 'studio') {
        this.photoTypePrice = this.pricePhotoInStudio
        this.$store.state.social.visitPostORstudioPost = this.visitORstudio
      }
      this.$store.commit('setPostPhotoTypePrice', this.photoTypePrice)
    },

    setOrderArticle(id) {
      let el = this.orderPostList.find(el => el.id === +id)
      this.post_id = el.id
      this.$store.state.social.post_id = this.post_id
      this.$store.commit('setSelectedPostPrice', el.price)
    },

    handleFileUpload(event) {
      this.file = this.$refs.file.files[0]
      this.$store.state.social.post_image = this.$refs.file.files[0]
    }

  },
  mounted() {
    this.$store.commit('setPostType', this.default)
  }
}
</script>

<style scoped>

</style>