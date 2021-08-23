<template>
  <div>

    <div v-if="success">
      <Success/>
    </div>

    <div class="container" v-if="!success">
      <div class="row">
        <div class="col-xl-9 offset-1">
          <div class="index-container">
            <SwitchLocale />
            <div>
              <div class="steps">
                <div class="step">
                  <div class="position active"></div>
                  <p>{{ $t('steps.select_newspaper', { value: 'Выбор газеты' })}}</p>
                </div>
                <div class="step">
                  <div class="position" :class="{ active: isActive.includes('AdvertisementType')}"></div>
                  <p>{{ $t('steps.select_type', { value: 'Тип заказа' })}}</p>
                </div>
                <div class="step">
                  <div class="position" :class="{ active: isActive.includes('Content')}"></div>
                  <p>{{ $t('steps.content', { value: 'Контент' })}}</p>
                </div>
                <div class="step">
                  <div class="position" :class="{ active: isActive.includes('CreateOrder')}"></div>
                  <p>{{ $t('steps.make_request', { value: 'Оформить заявку' })}}</p>
                </div>
                <div class="step">
                  <div class="position" :class="{ active:  isActive.includes('Done')}"></div>
                  <p>{{ $t('steps.pay', { value: 'Оплатить' })}}</p>
                </div>
              </div>
            </div>


              <component
                  :is="currentComponent"
                  @next="componentDetected"
                  @back="goBackFunction"
              ></component>


          </div>
        </div>
        <div class="cart col-xl-2 mt-5">
          <p class="p-0 m-0">{{ $t('order_price', { value: 'Сумма заказа:' })}}</p>
          {{ cartResult.toFixed(1) }} тг.
        </div>
      </div>
    </div>

<!--    <button class="btn custom-button" @click="next">Далее</button>-->
  </div>
</template>

<script>
import Steps from "@/components/Steps";
import NewsPaperSelect from "@/components/steps/NewsPaperSelect";
import AdvertisementType from "@/components/steps/AdvertisementType";
import Content from "@/components/steps/Content";
import CreateOrder from "@/components/steps/CreateOrder";
import Done from "@/components/steps/Done";
import Success from "../components/Success";
import SwitchLocale from "../components/SwitchLocale";


export default {
  name: 'Newspaper',
  components: {Success, Steps, AdvertisementType, NewsPaperSelect, Content, CreateOrder, Done, SwitchLocale},
  computed: {
    cartResult() {
      return this.$store.getters.cartResult || 0
    },
    currentComponent() {
      return this.defaultComponent
    }
  },
  watch: {
    '$route.query': {
      immediate: true,
      handler(newVal) {
        if (parseInt(newVal.success) === 1) {
          // this.$router.push('success')
          this.success = true
        }
      }
    }
  },
  data() {
    return {
      success: false,
      isActive: [],
      // isActive: JSON.parse(localStorage.getItem('Type')) ? JSON.parse(localStorage.getItem('Type')) : [],
      // defaultComponent: JSON.parse(localStorage.getItem('currentComponent')) ? JSON.parse(localStorage.getItem('currentComponent')) : 'NewsPaperSelect'
      defaultComponent: 'NewsPaperSelect'
    }
  },
  methods: {
    componentDetected(val) {
      this.defaultComponent = val
      localStorage.setItem('currentComponent', JSON.stringify(val))

      this.isActive.push(val)
      this.isActive = [...new Set(this.isActive)]

      if (val === 'NewsPaperSelect') {
        this.isActive = []
      }

      // let type = JSON.parse(localStorage.getItem('Type'))
      // type.push(val)
      // type = [...new Set(type)]
      // localStorage.setItem('Type', JSON.stringify(type))
    },
    goBackFunction(val) {
      this.defaultComponent = val
      localStorage.setItem('currentComponent', JSON.stringify(val))

      if (val === 'NewsPaperSelect') {
        this.isActive = []
      }

      let idx = this.isActive.indexOf(val)
      if (idx > -1) {
        this.isActive.splice(idx + 1, 1)
      }

      // let type = JSON.parse(localStorage.getItem('Type'))
      // type.splice(idx+1, 1)
      // localStorage.setItem('Type', JSON.stringify(type))
    }
  },
  mounted() {
    this.$store.dispatch('getNewspaperList')
  }
}
</script>

<style scoped lang="sass">

</style>