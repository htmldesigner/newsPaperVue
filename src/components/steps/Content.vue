<template>
  <div v-if="componentForm">
    <p class="componentLabel">{{ $t('order_type', { value: 'Тип заказа:' })}} {{ componentForm.name }}</p>

    <hr>

    <component :is="componentForm.component"></component>

    <p class="mt-5">{{ $t('forms.select_newspaper_number', { value: 'Выберите номер газеты' })}}</p>

    <hr>
    <div class="releases d-flex justify-content-around">
      <div class="release"

           v-for="release in releases" :key="release.id"
           :class="{
             active: $store.state.selectedReleases.includes(release.id),
             blocked: release.busy_banners && release.busy_banners.includes(busyBanner)}"
           @click="selectRelease(release.id)"
      >
        <p>{{ release.name }}</p>
        <p style="font-size: 12px">{{release.release_date}}</p>
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <button class="btn custom-button" @click="back">{{ $t('buttons.back', {value: 'Назад'}) }}</button>
      <button class="btn custom-button" :disabled="!selectedReleases" @click="next">{{ $t('buttons.next', {value: 'Далее'}) }}</button>
    </div>
  </div>
</template>

<script>
import Banner from "../forms/Banner";
import Article from "../forms/Article";
import Advert from "../forms/Advert";
import Necrology from "../forms/Necrology";
import Remember from "../forms/Remember";
import {mapState} from 'vuex';

export default {
  name: "Content",
  components: {
    Banner, Article, Advert, Necrology, Remember
  },
  computed: {
    busyBanner(){
      return this.$store.getters.getBusyBanner
    },
    ...mapState({
      componentForm: state => state.componentForm,
      releases: state => state.releases,
    }),
    selectedReleases() {
      if (this.componentForm.component === 'Article') {
        if (this.$store.getters.getSelectedReleases.length && this.$store.state.article.length)
          return true
      }

      if (this.componentForm.component === 'Necrology') {
        if (this.$store.getters.getSelectedReleases.length && this.$store.state.necrolog.length)
          return true
      }


      if (this.componentForm.component === 'Remember') {
        if (this.$store.getters.getSelectedReleases.length && this.$store.state.eskealu.length)
          return true
      }


      if (this.componentForm.component === 'Banner') {
        if (
            this.$store.getters.getSelectedReleases.length
            && this.$store.state.selectedBannerId
            // && this.$store.state.bannerImage
        )
          return true
      }

      if (this.componentForm.component === 'Advert') {
        if (
            this.$store.getters.getSelectedReleases.length
            && this.$store.state.advertCategoryId
            && this.$store.state.advertText
        )
          return true
      }
    }
  },
  data() {
    return {
      selectedRelease: [],
    }
  },
  methods: {
    selectRelease(release) {
      if (this.$store.state.selectedReleases.includes(release)) {
        let idx = this.$store.state.selectedReleases.indexOf(release)
        // this.$store.state.selectedReleases.splice(idx, 1)
        this.$store.commit('deleteRelease', idx)
      } else {
        // this.$store.state.selectedReleases.push(release)
        this.$store.commit('addRelease', release)
      }
    },
    next() {
      this.$emit('next', 'CreateOrder')
    },
    back() {
      this.$emit('back', 'AdvertisementType')
      this.$store.dispatch('clearState')
    }
  }
}
</script>

<style scoped>

</style>