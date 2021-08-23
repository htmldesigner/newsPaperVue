<template>
  <div v-if="componentForm">
    <p class="componentLabel">{{ $t('order_type', { value: 'Тип заказа:' })}} {{ componentForm.name }}</p>
    <hr>
    <component :is="componentForm.component"></component>

    <hr>

    <div class="mb-5">
      <h5 class="mb-3">{{ $t('forms.release_dates', { value: 'Даты выхода постов' })}}</h5>
      <div class="form-group row" v-for="(time, index) of times">
        <label :for="`${index}` + '-inputTime'" class="col-4 col-form-label">{{ index + 1 }} - {{ $t('forms.date_placement', {value: 'ая дата размещения'}) }}</label>
        <div class="col-4">
          <input class="form-control" @focusout="sortDate" v-model="times[index]" type="datetime-local" :id="`${index}` + '-inputTime'">
        </div>

        <button type="button" class="btn btn-outline-danger" @click="removeTime(times[index])">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-trash"
               viewBox="0 0 16 16">
            <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
            <path fill-rule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
          </svg>
        </button>
      </div>


      <button type="button" class="btn btn-primary mt-2" @click="addTime()">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus"
             viewBox="0 0 16 16">
          <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
        </svg>

        {{ $t('buttons.add_post_release', {value: 'Добавте даты выхода поста'}) }}
      </button>
    </div>

    <div class="d-flex justify-content-between">
      <button class="btn custom-button" @click="back">{{ $t('buttons.back', {value: 'Назад'}) }}</button>
      <button class="btn custom-button" :disabled="!postTimeArr.length || !postLength.length " @click="next">{{ $t('buttons.next', {value: 'Далее'}) }}</button>
    </div>

  </div>
</template>

<script>
import {mapState} from "vuex";
import SocialPost from "../forms/SocialPost";
import moment from 'moment'

export default {
  name: "SocialContent",
  components: {
    SocialPost
  },
  computed: {
    ...mapState({
      componentForm: state => state.componentForm,
    }),
    postTimeArr() {
      if (this.componentForm.component === 'SocialPost') {
        return this.$store.getters.getPostTime
      }
    },
    postLength(){
      return this.$store.getters.getPostLength
    }
  },
  watch: {
    times() {
      this.dateDiff()

    }
  },
  data() {
    return {
      times: [moment(Date.now()).add(1, 'd').format("YYYY-MM-DDT12:00")]
    }
  },
  methods: {
    next() {
      this.$emit('next', 'SocialCreateOrder')
    },
    back() {
      this.$emit('back', 'SocialContentType')
    },

    dateDiff() {
      const now = moment(Date.now()).format("YYYY-MM-DDT12:mm")
      let prev = null
       this.times.forEach((el, idx) => {
        if (el < now) {
          this.times.splice(idx, 1)
        }
        if (moment(prev).format("YYYY-MM-DD") === moment(el).format("YYYY-MM-DD")) {
          let idx = this.times.indexOf(el)
          if (idx !== -1) {
            this.times.splice(idx, 1)
            console.log(this.times)
          }
        }
        prev = el
      })
      this.$store.commit('setPostTime', this.times)
    },

    sortDate(){
      this.times.sort(function (a, b) {
        var dateA = new Date(a), dateB=new Date(b)
        return dateA - dateB
      })
    },

    addTime() {
      this.dateDiff()
      const lastTime = this.times[this.times.length - 1]
      const nextTime = moment(lastTime).add(1, 'd').format('YYYY-MM-DDT12:00')
      this.times.push(nextTime)
    },

    removeTime(time) {
      this.times = this.times.filter(el => el !== time)
    },

  },
  mounted() {
    this.dateDiff()
  }
}
</script>

<style scoped>

</style>