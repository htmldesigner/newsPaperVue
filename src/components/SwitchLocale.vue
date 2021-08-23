<template>
  <div class="lang-selector">
    <select class="form-control custom-select" v-model="$i18n.locale" @change="setLang">
      <option
          v-for="(lang, i) in langs"
          :key="`lang-${i}`"
          :value="lang">
        {{ lang }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SwitchLocale',
  data() {
    return {
      langs: ['kz', 'ru']
    }
  },
  methods: {
    setLang(val){
      localStorage.setItem('selectedLang', val.target.value)
    }
  },
  mounted() {
    let lang = localStorage.getItem('selectedLang')
    if (lang){
      this.$i18n.locale = lang.toString()
    }

  }
}
</script>

<style>
.lang-selector{
  text-align: end;
}
.custom-select {
  max-width: 65px;
  margin-bottom: 30px;
}
</style>