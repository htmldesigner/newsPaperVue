<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-9 offset-1">
        <div class="index-container">
          <SwitchLocale />
          <div>
            <div class="steps">
              <div class="step">
                <div class="position active"></div>
                <p>{{ $t('steps.select_social_network', { value: 'Выбор соц. сети' })}}</p>
              </div>
              <div class="step">
                <div class="position" :class="{ active: isActive.includes('SocialContentType')}"></div>
                <p>{{ $t('steps.select_type', { value: 'Тип заказа' })}}</p>
              </div>
              <div class="step">
                <div class="position" :class="{ active: isActive.includes('SocialContent')}"></div>
                <p>{{ $t('steps.content', { value: 'Контент' })}}</p>
              </div>
              <div class="step">
                <div class="position" :class="{ active: isActive.includes('SocialCreateOrder')}"></div>
                <p>{{ $t('steps.make_request', { value: 'Оформить заявку' })}}</p>
              </div>
              <div class="step">
                <div class="position" :class="{ active:  isActive.includes('Done')}"></div>
                <p>{{ $t('steps.pay', { value: 'Оплатить' })}}</p>
              </div>
            </div>
          </div>

          <keep-alive>
            <component
                :is="currentComponent"
                @next="componentDetected"
                @back="goBackFunction"
            ></component>
          </keep-alive>
        </div>
      </div>


      <div class="cart col-xl-2 mt-5">
        <p class="p-0 m-0">{{ $t('order_price', { value: 'Сумма заказа:' })}}</p>
        {{ cartResult.toFixed(1) }} тг.
      </div>


    </div>
  </div>
</template>

<script>
import SocialSelect from "../components/socialnetworks/SocialSelect";
import SocialContentType from "../components/socialnetworks/SocialContentType";
import SocialContent from "../components/socialnetworks/SocialContent";
import SocialCreateOrder from "../components/socialnetworks/SocialCreateOrder";
import Done from "../components/steps/Done";
import SwitchLocale from "../components/SwitchLocale";

export default {
  name: "SocialNetworks",
  components: {
    SocialSelect, SocialContentType, SocialContent, SocialCreateOrder, Done, SwitchLocale
  },
  computed: {
    currentComponent() {
      return this.defaultComponent
    },
    cartResult() {
      return this.$store.getters.cartResult || 0
    },
  },
  data() {
    return {
      isActive: [],
      defaultComponent: 'SocialSelect'
    }
  },
  methods: {
    componentDetected(val) {
      this.defaultComponent = val
      // localStorage.setItem('currentComponent', JSON.stringify(val))

      this.isActive.push(val)
      this.isActive = [...new Set(this.isActive)]

      if (val === 'SocialSelect') {
        this.isActive = []
      }
    },

    goBackFunction(val) {
      this.defaultComponent = val
      // localStorage.setItem('currentComponent', JSON.stringify(val))

      if (val === 'NewsPaperSelect') {
        this.isActive = []
      }

      let idx = this.isActive.indexOf(val)
      if (idx > -1) {
        this.isActive.splice(idx + 1, 1)
      }

    },

  },
  mounted() {
    this.$store.dispatch('getSocialNetworkList')
  }
}
</script>

<style scoped>

</style>