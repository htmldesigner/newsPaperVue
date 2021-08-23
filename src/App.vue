<template>
  <div id="app">

    <div class="head mt-3">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-md-3">
            <div class="logo">
              <img src="@/assets/logo_1.png" alt="Alt">
            </div>
          </div>
          <div class="col-md-5 d-flex justify-content-between">

            <div class="phone">
              <font-awesome-icon icon="phone" style="margin-right: 12px"/>

              <a tel="+7112515109">+7112 51-51-09</a>
            </div>

            <div class="socials">
              <a class="social-item-vk" href="https://vk.com/zhaikpress">
                <font-awesome-icon :icon="['fab', 'vk']" style="font-size: 28px"/>
              </a>
              <a class="social-item-facebook" href="https://www.facebook.com/zhaikpress">
                <font-awesome-icon :icon="['fab', 'facebook']" style="font-size: 28px"/>
              </a>
              <a class="social-item-telegram" href="https://telegram.org/zhaikpress">
                <font-awesome-icon :icon="['fab', 'telegram']" style="font-size: 28px"/>
              </a>
              <a class="social-item-whatsapp" href="https://api.whatsapp.com/send/?phone=77078084855&text&app_absent=0">
                <font-awesome-icon :icon="['fab', 'whatsapp']" style="font-size: 28px"/>
              </a>
            </div>

          </div>
        </div>
        <hr>
      </div>
    </div>
<router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data(){
    return {
      bodyImg: require('@/assets/3.jpg'),
    }
  },
  mounted() {
    document.querySelector('body').style.backgroundImage = "url('" + this.bodyImg + "')";
  }
}

</script>

<style>

body{

  background-repeat: no-repeat;
  background-position: bottom center;
  background-attachment: fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.phone{
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}
.socials{
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}
.socials a {
  margin: 0 6px;
}
</style>
