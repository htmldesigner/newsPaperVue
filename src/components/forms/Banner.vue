<template>
  <div class="mb-5">
    <Selector v-if="getBanners"
              :selectorOptions="getBanners"
              :labelTitle="labelTitle = this.$t('forms.select_web_banner', {value: 'Выберите баннер'})"
              :placeholder="placeholder = 'Выбирите размер баннера'"
              @input="setBanner"
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
      <p><strong>{{$t('design_banner_price', {value: 'Стоимость дизайна банера'})}} {{ bannerOrderPrice }} тг.</strong></p>


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
      <button v-if="bannerImage" @click="clear">Очистить</button>
    </div>


  </div>
</template>

<script>
import Selector from "../Selector";
import Toggler from "../Toggler";
import TextArea from "../TextArea";

export default {
  name: "Banner",
  components: {Selector, Toggler, TextArea},
  computed: {
    getBanners() {
      return this.$store.getters.getBanners
    },
    bannerOrderPrice() {
      return this.$store.getters.getBannerOrderPrice
    }
  },
  data() {
    return {
      banner_preview: null,
      photo: {case_1: 'owner', case_2: 'order'},
      defaultPhoto: 'owner',
      visit_studio: {case_1: 'visit', case_2: 'studio'},
      bannerImage: null
    }
  },
  methods: {
    clear() {
      this.$refs.file.value = null
      this.bannerImage = null
      this.$store.state.bannerImage = null
    },
    setBanner(id) {
      this.$store.state.busyBanner = +id

      const bannerId = id
      const banner = this.getBanners.find(el => {
        return el.id === +bannerId
      })
      this.banner_preview = banner.banner_preview
      this.$store.state.selectedBannerSizePrice = banner.banner_price
      this.$store.commit('setSelectedBannerId', +bannerId)
    },

    setBannerComment(value) {
      this.$store.commit('setBannerComment', value)
    },

    setImage(checked) {
      this.defaultPhoto = checked
      this.$store.state.visitORstudio = null
      if (this.defaultPhoto === 'owner') {
        this.$store.state.bannerType = 'owner'
        this.$store.state.bannerTypePrice = 0
      }
      if (this.defaultPhoto === 'order') {
        this.$store.state.bannerType = 'order'
        this.$store.state.bannerTypePrice = this.bannerOrderPrice
      }
    },


    setTypeImage(type) {
      console.log(type)
      // this.visitORstudio = type
      //
      // if (this.visitORstudio === 'visit') {
      //   this.photoTypePrice = this.pricePhotoVisit
      //   this.$store.state.visitORstudio = this.visitORstudio
      // }
      // if (this.visitORstudio === 'studio') {
      //   this.photoTypePrice = this.pricePhotoInStudio
      //   this.$store.state.visitORstudio = this.visitORstudio
      // }
      // this.$store.commit('setPhotoTypePrice', this.photoTypePrice)
    },


    handleFileUpload(event) {
      this.$store.state.bannerImage = this.$refs.file.files[0]
      this.bannerImage = this.$refs.file.files[0]
    }

  }
}
</script>

<style scoped>

</style>