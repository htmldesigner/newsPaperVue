import r from './routes'
import axios from "axios";

export default {
 dataPost(route, data) {
  let headers = {}
  headers['Content-Type'] = 'multipart/form-data';
  return {
   method: 'POST',
   url: r(route),
   data: data,
   headers: headers,
   transformRequest: [(data) => {
    let fData = new FormData();
    for (let key in data) {
     fData.set(key, data[key])
    }
    return fData;
   }],
  };
 },


 dataGet(route) {
  return {
   method: 'get',
   url: r(route),
   headers: {}
  };
 },

 getReleases(payload) {
  return axios(this.dataPost('/get_releases', payload));
 },

 getNewspaperList() {
  return axios(this.dataGet('/get_newspaperlist'));
 },

 createOrder(payload){
  return axios(this.dataPost('/create_order', payload))
 },

 orderSendSms(payload){
  return axios(this.dataPost('/order_send_sms', payload))
 },

 getOrderCalc(payload){
  return axios(this.dataGet('/get_order_calc/' + payload))
 },

 orderPay(payload){
  return axios(this.dataPost('/order_pay', {order_id: payload}))
 },

 getWebSiteList(){
  return axios(this.dataGet('/get_websitelist'));
 },


 getSocialNetworkList(){
  return axios(this.dataGet('/get_socialnetworklist'));
 }

}