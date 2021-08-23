<template>
  <div class="form-group">
    <div class="d-flex justify-content-between">
      <label for="FormControlTextarea" class="custom_label">{{ contentType }}</label>

      <div v-if="symbolInfo" class="symbol-info d-flex flex-wrap">
        <div class="custom_label mr-3">{{ $t('forms.symbol_count', { value: 'Количество символов:' })}} <span class="number_color">{{ symbolCount }}</span></div>
        <div class="custom_label mr-3">{{ $t('forms.limit', { value: 'Лимит:' })}} <span class="number_color">{{ limit }}</span></div>
      </div>

    </div>
    <textarea
        class="form-control contentArea"
        id="FormControlTextarea"
        rows="10"
        @input="$emit('input', $event.target.value)"
        v-model="content"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "TextArea",
  computed: {
    limit(){
      if(this.pictureSettings){
        return this.$store.state.symbol_limit - this.pictureSettings.weight_in_symbol
      }else {
        return this.$store.state.symbol_limit
      }
    },
    symbolCount() {
      if (this.pictureSettings) {
        return this.content.length + this.titleCount
      } else {
        return this.content.length + this.titleCount
      }
    }
  },
  props: {
    titleCount: {
      type: Number,
      default: 0
    },
    contentType: {
      type: String,
      required: true
    },
    symbolInfo: {
      type: Boolean,
      default: false
    },
    pictureSettings: {
      type: Object
    }
  },
  data() {
    return {
      content: ''
    }
  }
}
</script>

<style scoped>

</style>