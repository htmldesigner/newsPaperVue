<template>
  <div class="mb-5">

    <Selector v-if="webBanners"
              :selectorOptions="webBanners"
              :labelTitle="labelTitle = $t('forms.select_web_banner', {value: 'Выберите баннер'})"
              :placeholder="placeholder = 'Выбирите размер баннера'"
              @input="setWebBanner"
    />

    <div v-if="banner_preview">
      <img style="width: 100%" :src="banner_preview" alt="Alt">
    </div>

    <Toggler
        :value="this.photo"
        :default="this.defaultPhoto"
        @input="setImage"
        :text="{owner: this.$t('forms.own_banner', {value: 'Свой банер'}), order: this.$t('forms.order_banner', {value: 'Заказать дизайн банера'})}"
        :id="'bannerId'"
        :name="'bannerRadioButton'"
    />

    <div v-if="defaultPhoto === 'order'">
      <p><strong> {{$t('design_banner_price', {value: 'Стоимость дизайна банера'})}} {{ bannerOrderPrice }} тг.</strong></p>

      <TextArea
          @input="setBannerComment"
          :contentType="this.$t('forms.comment', {value: 'Коментарий к заказу'})"
          :symbolInfo="false"
          :titleCount="null"
          :pictureSettings="null"
      />
    </div>

    <div class="mt-4">
      <input type="file" id="file" ref="file" @change="handleFileUpload"/>
      <button v-if="bannerImage">Очистить</button>
    </div>

  </div>
</template>

<script>
import Selector from "../Selector";
import Toggler from "../Toggler";
import TextArea from "../TextArea";

export default {
  components: {
    Selector, Toggler, TextArea
  },
  name: "WebBanner",
  computed: {
    webBanners(){
      return this.$store.getters.getWebBanners
    },
    bannerOrderPrice() {
      return this.$store.getters.getWebBannerOrderPrice
    }
  },
  data() {
    return {
      banner_preview: null,
      photo: {case_1: 'owner', case_2: 'order'},
      defaultPhoto: 'owner',
      bannerImage: null,
    }
  },
  methods: {
    setWebBanner(id) {
      const bannerId = id
      const banner = this.webBanners.find(el => {
        return el.id === +bannerId
      })
      this.banner_preview = banner.banner_preview
      this.$store.state.website.selectedWebBannerSizePrice = parseInt(banner.banner_price)
      this.$store.state.website.selectedWebBannerId = +bannerId
    },
    setImage(checked) {
      this.defaultPhoto = checked
      this.$store.state.visitORstudio = null
      if (this.defaultPhoto === 'owner') {
        this.$store.state.bannerType = 'owner'
        this.$store.state.website.webBannerOrderPrice = 0
      }
      if (this.defaultPhoto === 'order') {
        this.$store.state.bannerType = 'order'
        this.$store.state.website.webBannerOrderPrice = this.bannerOrderPrice
      }
    },

    setBannerComment(value) {
      this.$store.state.website.webBannerComment = value
    },

    handleFileUpload(event) {
      this.$store.state.website.webBannerImage = this.$refs.file.files[0]
      this.bannerImage = this.$refs.file.files[0]
    }
  }
}
</script>

<style scoped>

</style>