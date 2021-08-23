<template>
  <div v-if="componentForm">
    <p class="componentLabel">{{ $t('order_type', {value: 'Тип заказа:'}) }} {{ componentForm.name }}</p>
    <hr>
    <component :is="componentForm.component"></component>
    <p>{{$t('select_period',{value: 'Выберите период размещения'})}}</p>
    <hr>

    <div class="form-group row">
      <label for="example-date-input" class="col-2 col-form-label">{{ $t('buttons.start', {value: 'Начать с'})}}</label>
      <div class="col-4">
        <input class="form-control" v-model="dateFrom" type="date" id="example-date-input">
      </div>
    </div>

    <div class="form-group row">
      <label for="example-date-input1" class="col-2 col-form-label">{{ $t('buttons.stop', {value: 'Завершить'})}}</label>
      <div class="col-4">
        <input class="form-control" v-model="dateTo" type="date" id="example-date-input1">
      </div>
    </div>

    <div class="d-flex justify-content-between">
      <button class="btn custom-button" @click="back">{{ $t('buttons.back', {value: 'Назад'}) }}</button>
      <button class="btn custom-button" :disabled="!ifSelectedWebBannerId" @click="next">{{$t('buttons.next', {value: 'Далее'}) }}</button>
    </div>

  </div>
</template>

<script>
import {mapState} from "vuex";
import WebBanner from "../forms/WebBanner";
import moment from 'moment'

export default {
  name: "WebSiteContent",
  components: {
    WebBanner
  },
  watch: {
    dateFrom() {
      this.dateDiff()
    },
    dateTo() {
      this.dateDiff()
    }
  },
  computed: {

    // busyBanner() {
    //   return this.$store.getters.getBusyBanner
    // },
    ...mapState({
      componentForm: state => state.componentForm,
      // releases: state => state.releases,
    }),
    selectedReleases() {
      if (this.componentForm.component === 'WebBanner') {
        return true
      }
    },
    ifSelectedWebBannerId(){
      return this.$store.getters.getSelectedWebBannerId
    }
  },
  //TODO Минимальный перод публикации???
  data() {
    return {
      dateFrom: moment().format("YYYY-MM-DD"),
      dateTo: moment().add(7, 'd').format("YYYY-MM-DD")
    }
  },

  methods: {
    next() {
      this.$emit('next', 'WebSiteCreateOrder')
    },
    back() {
      this.$emit('back', 'WebSiteContentType')
    },
    dateDiff() {
      let a = moment(this.dateTo);
      let b = moment(this.dateFrom);
      const today = moment(Date.now()).format("YYYY-MM-DD")

      if(this.dateFrom < today){
        alert('Не верный формат даты')
        this.dateFrom = moment().format("YYYY-MM-DD")
      }

      if(this.dateFrom >= this.dateTo){
        alert('Не верный формат даты')
        this.dateFrom = moment().format("YYYY-MM-DD")
        this.dateTo = moment().add(7, 'd').format("YYYY-MM-DD")
      }


      if(this.dateTo <= today){
        alert('Не верный формат даты')
        this.dateTo = moment().add(7, 'd').format("YYYY-MM-DD")
      }

      this.$store.state.website.deyDiff = parseInt(a.diff(b, 'days'))

      this.$store.commit('setPeriodWebBannerPublication', {from: this.dateFrom, to: this.dateTo})


    }
  },
  mounted() {
    this.dateDiff()
  }

}
</script>

<style scoped>

</style>