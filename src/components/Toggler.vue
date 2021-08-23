<template>
  <div class="form_toggle mb-4 mt-4">
    <div class="form_toggle-item item-1">
      <input
          class="form-check-input d-none"
          type="radio"
          :name="name"
          :id="id"
          :value="value.case_1"
          v-model="checked"
          checked
          @change="$emit('input', value.case_1)"
      >
      <label class="form-check-label" :for="id">{{text.owner || text.visit}}</label>
    </div>
    <div class="form_toggle-item item-2">
      <input
          class="form-check-input d-none"
          type="radio"
          :name="name"
          :id="`${id + '2'}`"
          :value="value.case_2"
          v-model="checked"
          @change="$emit('input', value.case_2)"
      >
      <label class="form-check-label" :for="`${id + '2'}`">{{text.order || text.studio}}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "Toggler",
  props: {
    value: {
      type: Object,
      required: true
    },
    default: {
      type: String
    },
    text: {
      type: Object,
    },
    id: {
      default: 'radioButton'
    },
    name: {
      default: 'inlineRadioOptions'
    }

  },
  data() {
    return {
      checked: this.default
    }
  }
}
</script>

<style scoped>
.form_toggle-item {
  display: inline-block;
}

.form_toggle-item input[type=radio] {
  display: none;
}

.form_toggle-item label {
  display: inline-block;
  padding: 8px 20px;
  line-height: 34px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-right: none;
  cursor: pointer;
  user-select: none;
}

.form_toggle .item-1 label {
  font-weight: 700;
  border-radius: 12px 0 0 12px;
  min-width: 130px;
  text-align: center;
}

.form_toggle .item-2 label {
  font-weight: 700;
  min-width: 130px;
  text-align: center;
  border-radius: 0 12px 12px 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

/* Checked */
.form_toggle .item-1 input[type=radio]:checked + label {
  background: #50C5D7;
  color: #fff;
}

.form_toggle .item-2 input[type=radio]:checked + label {
  background: #50C5D7;
  color: #fff;
}
</style>