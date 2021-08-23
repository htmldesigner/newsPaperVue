<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-9 offset-1">
        <div class="index-container">
          <SwitchLocale />
          <h3 class="text-center"> {{ $t('index_title', { value: 'Где планируете заказать услугу?' }) }}</h3>
          <div class="d-flex flex-column">
            <button
                class="btn custom-button mt-3"
                v-for="link in linkRouter" :key="link.id"
                @click="onEvent(link.route)"
            >
             {{link.name}}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SwitchLocale from "../components/SwitchLocale";
export default {
  name: "Index",
  components: {
    SwitchLocale
  },
  computed: {
    linkRouter(){
      return [
        {id: 1, name: this.$t('service_newspaper'), route: '/newspaper'},
        {id: 2, name: this.$t('service_website'), route: '/webSite'},
        {id: 3, name: this.$t('service_socialNetwork'), route: '/socialNetworks'}
      ]
    }
  },
  data() {
    return {
      // linkRouter: [
      //   {id: 1, name: this.$t('service_newspaper'), route: '/newspaper'},
      //   {id: 2, name: 'Интернет сайт', route: '/webSite'},
      //   {id: 3, name: 'Социальные сети', route: '/socialNetworks'}
      // ]
    }
  },
  methods: {
    onEvent(route){
      this.$router.push(route)
      this.$store.dispatch('clearState')
    }
  }
}
</script>

<style scoped>

</style>