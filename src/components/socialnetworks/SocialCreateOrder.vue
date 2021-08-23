<template>
  <div>
    <p class="componentLabel">Персональные данные</p>
    <hr>

    <ValidationObserver v-slot="{ invalid }">
      <div class="row d-flex flex-column">


        <ValidationProvider rules="required" v-slot="{ errors }">
          <div class="form-group col-md-6 pr-0">
            <label for="FIO">{{ $t('personal.fio', {value: 'ФИО'}) }}</label>
            <input
                v-model="data.user"
                type="text"
                class="form-control"
                id="FIO"
                placeholder="ФИО"
                :class="{'is-invalid': errors[0]}"
            >
            <div v-if="errors[0]" class="invalid-feedback" style="text-align: right;">
              {{ errors[0] }}
            </div>
          </div>
        </ValidationProvider>


        <ValidationProvider rules="email" v-slot="{ errors }">
          <div class="form-group col-md-6 pr-0">
            <label for="Email">Email</label>
            <input
                v-model="data.email"
                type="email"
                class="form-control"
                id="Email"
                placeholder="Email"
                :class="{'is-invalid': errors[0]}"
            >
            <div v-if="errors[0]" class="invalid-feedback" style="text-align: right;">
              {{ errors[0] }}
            </div>
          </div>
        </ValidationProvider>


        <ValidationProvider rules="required|numberOnly|documentIDMax:12" v-slot="{ errors }">
          <div class="form-group col-md-6 pr-0">
            <label for="iin">{{ $t('personal.iin', {value: 'ИИН'}) }}</label>
            <input
                v-model="data.iin"
                type="text"
                class="form-control"
                id="iin"
                placeholder="ИИН"
                :class="{'is-invalid': errors[0]}"
            >
            <div v-if="errors[0]" class="invalid-feedback" style="text-align: right;">
              {{ errors[0] }}
            </div>
          </div>
        </ValidationProvider>

        <ValidationProvider rules="required" v-slot="{ errors }">
          <div class="form-group col-md-6 pr-0">
            <label for="phone">{{ $t('personal.phone', {value: 'Телефон'}) }}</label>
            <masked-input
                v-model="data.phone"
                type="text"
                class="form-control"
                id="phone"
                placeholder="Телефон"
                mask="\+\7 (111) 111 11 11"
                :class="{'is-invalid': errors[0]}"
            />
            <div v-if="errors[0]" class="invalid-feedback" style="text-align: right;">
              {{ errors[0] }}
            </div>
          </div>
        </ValidationProvider>


        <ValidationProvider rules="required|numberOnly" v-slot="{ errors }">
          <div class="form-group mb-5 col-md-6 pr-0 bindButton">
            <label for="code">{{ $t('personal.cod', {value: 'Код подтверждения'}) }}</label>
            <div class="d-flex">
              <input
                  v-model="data.sms_code"
                  type="text"
                  class="form-control"
                  id="code"
                  placeholder="Код SMS"
                  :class="{'is-invalid': errors[0]}"
              >
              <button @click="sendCode" :disabled="!data.phone.length" class="btn custom-button bindInput">{{ $t('personal.send_code', {value: 'Выслать код'}) }}
              </button>


              <div v-if="errors[0]"
                   class="invalid-feedback"
                   style="text-align: right;
                          position: absolute;
                          bottom: -25px;
                          right: 0;"
              >
                {{ errors[0] }}
              </div>
            </div>

          </div>
        </ValidationProvider>


        <div class="d-flex justify-content-between pl-3 pr-3">
          <button class="btn custom-button col-md-6" :disabled="invalid" @click="submit">{{$t('buttons.confirm', {value: 'Подтвердить'})}}</button>
          <button class="btn custom-button" @click="back">{{$t('buttons.back', {value: 'Назад'})}}</button>
        </div>
      </div>
    </ValidationObserver>

  </div>
</template>



<script>
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import MaskedInput from 'vue-masked-input'
export default {
  components: {
    ValidationObserver, ValidationProvider, MaskedInput
  },
  name: "SocialCreateOrder",
  data() {
    return {
      data: {
        user: '',
        email: '',
        iin: '',
        phone: '',
        sms_code: null
      }
    }
  },
  methods: {
    submit() {
      this.$store.dispatch('createOrder', this.data)
          .then(response => {
            if (response.data.message) {
              this.$store.dispatch('getOrderCalc')
              this.$emit('next', 'Done')
            }
          }).catch(error => {
        console.log(error)
      })
    },

    sendCode() {
      this.$store.dispatch('orderSendSms', this.data).then(response => {
        if (response.status){
          alert(this.$t('message.alert', {value: 'Вам было отправленно sms с кодом'}))
        }
      })
    },

    back() {
      this.$emit('back', 'SocialContent')
    }
  }
}
</script>
<style scoped>

</style>