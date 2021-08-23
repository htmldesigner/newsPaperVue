<template>
  <div class="form-group">
    <label for="ControlSelect">{{ labelTitle }}</label>
    <select
        class="form-control"
        id="ControlSelect"
        v-model="selected"
        @input="upValue"
    >
      <template v-if="placeholder.length">
        <option value="" disabled selected>{{ placeholder }}</option>
      </template>

      <template v-if="selectorOptions[0] && selectorOptions[0].name">
        <option v-for="option in selectorOptions" :key="option.id" :value="option.id">
          {{ option.name }}
        </option>
      </template>

      <template v-if="selectorOptions[0] && selectorOptions[0].size">
        <option v-for="option in selectorOptions" :key="option.id" :value="option.id">
          {{ option.size }} | Стоимость размещения - {{ option.price }} тг.
        </option>
      </template>

      <template v-if="selectorOptions[0] && selectorOptions[0].symbol_count">
        <option v-for="option in selectorOptions" :key="option.id" :value="option.id">
          {{ option.symbol_count }} Символов - {{ option.price }} тг.
        </option>
      </template>

      <template v-if="selectorOptions[0] && selectorOptions[0].banner_price">
        <option v-for="option in selectorOptions" :key="option.id" :value="option.id">
          {{ option.banner_size ||   option.banner_place}} | Стоимость размещения - {{ option.banner_price }} тг.
        </option>
      </template>

      <template v-if="selectorOptions[0] && selectorOptions[0].title">
        <option v-for="option in selectorOptions" :key="option.id" :value="option.id">
          {{ option.title }}
        </option>
      </template>

      <template v-if="selectorOptions[0] && selectorOptions[0].site">
        <option v-for="option in selectorOptions" :key="option.id" :value="option.id">
          {{ option.site }}
        </option>
      </template>

    </select>
  </div>
</template>

<script>
export default {
  name: "Selector",
  data: () => {
    return {
      selected: ''
    }
  },
  props: {
    selectorOptions: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String
    },
    labelTitle: {
      type: String,
      required: true
    }
  },
  mounted() {
    if (!this.placeholder.length) {
      this.selected = this.selectorOptions[0].value
      this.$emit('input', this.selected)
    }
  },
  methods: {
    upValue($event) {
      if ($event.target.value.length) {
        this.$emit('input', $event.target.value)
      } else {
        this.$emit('getBanners', this.selected)
      }
    }
  }
}
</script>

<style scoped>

</style>