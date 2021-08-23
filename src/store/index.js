import Vue from 'vue'
import Vuex from 'vuex'
import api from "../api/api";
import website from "./website";
import social from './social'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newspaperId: null, // ID газеты
    advertisementType: null, // Тип рекламы
    newspaperList: null, // Список газет
    articlePhotoSize: null, // Список размеров изображений
    calculation: null,

    categories: null, // Категории для объявлений (получаемый список с бека)
    releases: [], // Релизы список

    banners: null,
    bannerOrderPrice: 0,
    selectedBannerSizePrice: 0,
    bannerType: 'owner', // Заказной или свой
    bannerTypePrice: 0,
    selectedBannerId: null,
    bannerComment: '',
    bannerImage: null,
    busyBanner: null,

    componentForm: null,
    articlePhotoPrice: 0,
    order_id: null,


    newspaper_strips: null, //Полосы

    selectedReleases: [],
    article_id: null, //ID Заказной статьи
    typeArticle: '', // Заказная или нет статья
    article: '', // Тело статьи
    article_image: null, // Собственное изображение статии
    articleTitle: '', // Заголовок статьи
    photoTypePrice: 0, // Цена в зависимости от типа фотосессии
    visitORstudio: null, // визит в студию или выездная фотоссесия
    selectedArticlePrice: 0, // Цена заказный статья
    article_image_size_id: null, // ID размера фотографии
    orderArticle: null,
    symbol_limit: 0,
    symbol_price: 0,
    price_photo_in_studio: 0,
    price_photo_visit: 0,

    result: 0,

    //Advert prepare data
    advertCategoryId: null,
    advertText: null,
    advertSettings: null,


// Necrology
    necrologTitle: '',
    necrolog: '',
    necrolog_id: null, //ID Заказной некролога
    typeNecrology: '', // Заказнай некролога или нет

    necrologPhotoSize: null,
    necrologSettings: null,
    orderNecrolog: null,

    necrologPhotoPrice: 0,
    necrolog_image_size_id: null, // ID размера фотографии
    selectedNecrologyPrice: 0, // Цена заказного некролога
    necrologImage: null, // Собственное изображение статии


    // Remember ~  Eskealu
    eskealuTitle: '',
    eskealu: '',
    eskealu_id: null, //ID Заказной некролога
    typeEskealu: '', // Заказнай некролога или нет

    eskealuPhotoSize: null,
    orderEskealu: null,
    eskealuSettings: null,

    eskealuPhotoPrice: 0,
    eskealu_image_size_id: null, // ID размера фотографии
    selectedEskealuPrice: 0, // Цена заказного некролога
    eskealuImage: null, // Собственное изображение статии


  },
  mutations: {
    setCalculation(state, payload) {
      state.calculation = payload
    },

    clearState(state) {
      state.bannerOrderPrice = 0
      state.selectedBannerSizePrice = 0
      state.selectedReleases = []
      // state.newspaperId = null // ID газеты
      state.article_id = null //ID Заказной статьи
      state.typeArticle = '' // Заказная или нет статья
      state.article = '' // Тело статьи
      state.article_image = null // Собственное изображение статии
      state.articleTitle = '' // Заголовок статьи
      state.photoTypePrice = 0 // Цена в зависимости от типа фотосессии
      state.visitORstudio = null // визит в студию или выездная фотоссесия
      state.selectedArticlePrice = 0 // Цена заказный статья
      state.article_image_size_id = null// ID размера фотографии
      state.orderArticle = null
      state.symbol_limit = 0
      state.symbol_price = 0
      state.price_photo_in_studio = 0
      state.price_photo_visit = 0
      state.result = 0
      state.website.selectedWebBannerSizePrice = 0


      state.necrologTitle = ''
      state.necrolog = ''
      state.necrolog_id = null //ID Заказной некролога
      state.typeNekrology = '' // Заказнай некролога или нет
      state.nekrologPhotoSize = null
      state.nekrologSettings = null
      state.orderNekrolog = null
      state.necrologPhotoPrice = 0
      state.necrolog_image_size_id = null // ID размера фотографии
      state.selectedNecrologyPrice = 0 // Цена заказного некролога
      state.necrologImage = null // Собственное изображение статии


      state.newspaper_strips = null

    },

    setOrderId(state, payload) {
      state.order_id = payload
    },

    addRelease(state, payload) {
      state.selectedReleases.push(payload)
    },

    deleteRelease(state, payload) {
      state.selectedReleases.splice(payload, 1)
    },

    setNewspaperList(state, payload) {
      state.newspaperList = payload
    },

    selectComponentForm(state, payload) {
      state.componentForm = payload
    },

    articleLength(state, payload) {
      state.article = payload
    },

    articleTitleLength(state, payload) {
      state.articleTitle = payload
    },

    setNewsPaperId(store, payload) {
      store.newspaperId = +payload
    },

    setAdvertisementType(store, payload) {
      store.advertisementType = payload.toLowerCase()
    },

    //Article

    setTypeArticle(store, payload) {
      store.typeArticle = payload
    },

    setReleases(store, payload) {
      store.releases = payload
    },

    setArticlePhotoSize(store, payload) {
      store.articlePhotoSize = payload
    },

    setArticleSettings(store, payload) {
      // store.symbol_price = payload.price
      // store.symbol_limit = payload.limit
      store.price_photo_in_studio = payload.price_photo_in_studio
      store.price_photo_visit = payload.price_photo_visit
      if (payload?.pages.length) {
        store.newspaper_strips = payload.pages
      } else {
        console.log('empty')
      }
    },

    setOrderArticle(store, payload) {
      store.orderArticle = payload
    },

    setSelectedArticlePrice(store, payload) {
      store.selectedArticlePrice = payload
    },

    setPhotoTypePrice(store, payload) {
      store.photoTypePrice = payload
    },

    setStripsId(store, payload) {
      let current = store.newspaper_strips.filter(el => {
        return el.id === payload
      })
      store.symbol_limit = current[0].max_symbols_count
      store.symbol_price = current[0].symbol_price
    },

    // Banners

    setBanners(store, payload) {
      store.banners = payload
    },
    setBannerOrderPrice(store, payload) {
      store.bannerOrderPrice = +payload
    },

    setSelectedBannerId(store, payload) {
      store.selectedBannerId = payload
    },
    setBannerComment(store, payload) {
      store.bannerComment = payload
    },

    //Advert
    setCategory(store, payload) {
      store.categories = payload
    },
    setAdvertSettings(store, payload) {
      store.symbol_limit = payload.size
      store.symbol_price = payload.price
      store.advertSettings = payload
    },

    //Necrology
    setNecrologySettings(store, payload) {
      payload.forEach(el => {
        if (el.necrolog_photo_size) {
          store.necrologPhotoSize = el.necrolog_photo_size
        }
        if (el.order_necrolog) {
          store.orderNecrolog = el.order_necrolog
        }
        if (el.necrolog_settings) {
          store.symbol_price = el.necrolog_settings.price
          store.symbol_limit = el.necrolog_settings.limit
          store.nekrologSettings = el.necrolog_settings
        }
      })
    },

    setTypeNecrology(store, payload) {
      store.typeNecrology = payload
    },

    setSelectedNecrologyPrice(store, payload) {
      store.selectedNecrologyPrice = payload
    },

    necrologLength(state, payload) {
      state.necrolog = payload
    },

    necrologTitleLength(state, payload) {
      state.necrologTitle = payload
    },


    //Eskealu

    setEskealuSettings(store, payload) {
      payload.forEach(el => {
        if (el.eskealu_photo_size) {
          store.eskealuPhotoSize = el.eskealu_photo_size
        }
        if (el.order_eskealu) {
          store.orderEskealu = el.order_eskealu
        }
        if (el.eskealu_settings) {
          store.symbol_price = el.eskealu_settings.price
          store.symbol_limit = el.eskealu_settings.limit
          store.eskealuSettings = el.eskealu_settings
        }
      })
    },

    setTypeEskealu(store, payload) {
      store.typeEskealu = payload
    },

    setSelectedEskealuPrice(store, payload) {
      store.selectedEskealuPrice = payload
    },

    eskealuLength(state, payload) {
      state.eskealu = payload
    },

    eskealuTitleLength(state, payload) {
      state.eskealuTitle = payload
    },


  },
  actions: {
    async clearState({commit}) {
      commit('clearState')
    },
    async getNewspaperList({commit}) {
      let response = await api.getNewspaperList()
      commit('setNewspaperList', response.data)
    },
    async getOrderCalc({state, commit}) {
      try {
        const response = await api.getOrderCalc(state.order_id)
        commit('setCalculation', response.data)
      } catch (e) {
        console.log(e)
      }
    },
    async orderPay({state}) {
      try {
        const response = await api.orderPay(state.order_id)
        return response.data
      } catch (e) {
        console.log(e)
      }
    },
    createOrder({commit, state}, payload) {
      let data = payload

      if (state.advertisementType === 'article') {
        data.type = state.advertisementType
        data.newspaper_id = state.newspaperId || null
        data.article_id = state.article_id || null
        data.article_title = state.articleTitle || null
        data.article = state.article || null
        data.article_image = state.article_image || null
        data.article_image_size_id = state.article_image_size_id || null
        data.visit_studio = state.visitORstudio || null
        data.selected_releases = state.selectedReleases
        data.order_id = state.order_id

        return api.createOrder(data)
      }



      if (state.advertisementType === 'necrology') {
        data.type = state.advertisementType
        data.newspaper_id = state.newspaperId || null
        data.necrolog_id = state.necrolog_id || null
        data.necrolog_title = state.necrologTitle || null
        data.necrolog = state.necrolog || null
        data.necrolog_image = state.necrologImage || null
        data.necrolog_image_size_id = state.necrolog_image_size_id || null
        data.selected_releases = state.selectedReleases
        data.order_id = state.order_id

        return api.createOrder(data)
      }


      if (state.advertisementType === 'remember') {
        data.type = state.advertisementType
        data.newspaper_id = state.newspaperId || null
        data.eskealu_id = state.eskealu_id || null
        data.eskealu_title = state.eskealuTitle || null
        data.eskealu = state.eskealu || null
        data.eskealu_image = state.eskealuImage || null
        data.eskealu_image_size_id = state.eskealu_image_size_id || null
        data.selected_releases = state.selectedReleases
        data.order_id = state.order_id

        return api.createOrder(data)
      }



      if (state.advertisementType === 'banner') {
        data.type = state.advertisementType
        data.newspaper_id = state.newspaperId || null
        data.banner_id = state.selectedBannerId
        data.bannerComment = state.bannerComment
        data.banner_image = state.bannerImage
        data.selected_releases = state.selectedReleases
        data.banner_type = state.bannerType
        data.order_id = state.order_id

        return api.createOrder(data)
      }

      if (state.advertisementType === 'advert') {
        data.newspaper_id = state.newspaperId || null
        data.type = state.advertisementType
        data.category_id = state.advertCategoryId
        data.advert_text = state.advertText
        data.selected_releases = state.selectedReleases
        data.order_id = state.order_id

        return api.createOrder(data)
      }

      if (state.advertisementType === 'webbanner') {
        data.website_id = state.website.selectedWebSiteId || null
        data.type = state.advertisementType
        data.webbanner_id = state.website.selectedWebBannerId
        data.webbannerComment = state.website.webBannerComment
        data.webbanner_image = state.website.webBannerImage
        data.period_from = state.website.periodFrom,
          data.period_to = state.website.periodTo,
          data.banner_type = state.bannerType
        data.order_id = state.order_id

        return api.createOrder(data)
      }

      if (state.advertisementType === 'socialpost') {
        data.type = state.advertisementType
        data.post_id = state.social.setSocialNetworkId || null
        data.post = state.social.post
        data.postTitle = state.social.postTitle
        data.post_image = state.social.post_image
        data.typePost = state.social.typePost
        data.post_image_size_id = state.social.post_image_size_id
        data.postTime = state.social.postTime
        data.order_id = state.order_id

        return api.createOrder(data)
      }

    },
    async orderSendSms({commit, state}, payload) {
      let data = payload

      if (state.advertisementType === 'article') {
        data.type = state.advertisementType
        data.newspaper_id = state.newspaperId || null
        data.article_id = state.article_id || null
        data.article_title = state.articleTitle || null
        data.article = state.article || null
        data.article_image = state.article_image || null
        data.article_image_size_id = state.article_image_size_id || null
        data.visit_studio = state.visitORstudio || null
        data.selected_releases = state.selectedReleases

        const response = await api.orderSendSms(data)
        if (response.data) {
          commit('setOrderId', response.data.order_id)
          return response
        }
      }


      if (state.advertisementType === 'necrology') {
        data.type = state.advertisementType
        data.newspaper_id = state.newspaperId || null
        data.necrolog_id = state.necrolog_id || null
        data.necrolog_title = state.necrologTitle || null
        data.necrolog = state.necrolog || null
        data.necrolog_image = state.necrologImage || null
        data.necrolog_image_size_id = state.necrolog_image_size_id || null
        data.selected_releases = state.selectedReleases

        const response = await api.orderSendSms(data)
        if (response.data) {
          commit('setOrderId', response.data.order_id)
          return response
        }
      }


      if (state.advertisementType === 'remember') {
        data.type = state.advertisementType
        data.newspaper_id = state.newspaperId || null
        data.eskealu_id = state.eskealu_id || null
        data.eskealu_title = state.eskealuTitle || null
        data.eskealu = state.eskealu || null
        data.eskealu_image = state.eskealuImage || null
        data.eskealu_image_size_id = state.eskealu_image_size_id || null
        data.selected_releases = state.selectedReleases

        const response = await api.orderSendSms(data)
        if (response.data) {
          commit('setOrderId', response.data.order_id)
          return response
        }
      }



      if (state.advertisementType === 'banner') {
        data.newspaper_id = state.newspaperId || null
        data.type = state.advertisementType
        data.banner_id = state.selectedBannerId
        data.bannerComment = state.bannerComment
        data.banner_image = state.bannerImage
        data.selected_releases = state.selectedReleases
        data.banner_type = state.bannerType

        const response = await api.orderSendSms(data)

        if (response.data) {
          commit('setOrderId', response.data.order_id)
          return response
        }
      }

      if (state.advertisementType === 'advert') {
        data.newspaper_id = state.newspaperId || null
        data.type = state.advertisementType
        data.category_id = state.advertCategoryId
        data.advert_text = state.advertText
        data.selected_releases = state.selectedReleases
        const response = await api.orderSendSms(data)

        if (response.data) {
          commit('setOrderId', response.data.order_id)
          return response
        }
      }

      if (state.advertisementType === 'webbanner') {
        data.website_id = state.website.selectedWebSiteId || null
        data.type = state.advertisementType
        data.webbanner_id = state.website.selectedWebBannerId
        data.webbannerComment = state.website.webBannerComment
        data.webbanner_image = state.website.webBannerImage
        data.period_from = state.website.periodFrom,
          data.period_to = state.website.periodTo,
          data.banner_type = state.bannerType

        const response = await api.orderSendSms(data)

        if (response.data) {
          commit('setOrderId', response.data.order_id)
          return response
        }
      }


      if (state.advertisementType === 'socialpost') {
        data.type = state.advertisementType
        data.post_id = state.social.setSocialNetworkId || null

        data.order_post_id = state.social.post_id || null
        data.visit_studio = state.social.visitPostORstudioPost || null

        data.post = state.social.post
        data.postTitle = state.social.postTitle
        data.post_image = state.social.post_image
        data.typePost = state.social.typePost
        data.post_image_size_id = state.social.post_image_size_id
        data.postTime = state.social.postTime

        const response = await api.orderSendSms(data)

        if (response.data) {
          commit('setOrderId', response.data.order_id)
          return response
        }
      }


    },
    async getReleases({commit, state}) {
      try {
        let response = await api.getReleases({id: state.newspaperId, type: state.advertisementType})

        if (response.data.releases) {
          commit('setReleases', response.data.releases)
        }

        if (response.data.article_photo_size) {
          commit('setArticlePhotoSize', response.data.article_photo_size)
        }

        if (response.data.article_settings) {
          commit('setArticleSettings', response.data.article_settings)
        }

        if (response.data.order_article) {
          commit('setOrderArticle', response.data.order_article)
        }

        if (response.data.banners) {
          commit('setBanners', response.data.banners)
          commit('setBannerOrderPrice', response.data.banner_order_price)
        }

        if (response.data.categories) {
          commit('setCategory', response.data.categories)
          commit('setAdvertSettings', response.data.advert_settings)
        }

        if (response.data.nekrolog_settings) {
          let payload = [
            {necrolog_settings: response.data.nekrolog_settings},
            {necrolog_photo_size: response.data.nekrolog_photo_size},
            {order_necrolog: response.data.order_nekrolog}
          ]
          commit('setNecrologySettings', payload)
        }


        if (response.data.eskealu_settings) {
          let payload = [
            {eskealu_settings: response.data.eskealu_settings},
            {eskealu_photo_size: response.data.eskealu_photo_size},
            {order_eskealu: response.data.order_eskealu}
          ]
          commit('setEskealuSettings', payload)
        }


      } catch (e) {
        console.log(e)
      }
    },


  },

  getters: {
    newspaperList: (state) => state.newspaperList,

    newspaperStrips: (state) => state.newspaper_strips,

    getCalculation: state => state.calculation,

    articlePhotoSize(state) {
      return state.articlePhotoSize
    },
    orderArticle(state) {
      return state.orderArticle
    },
    cartResult(state) {
      if (state.advertisementType === 'article') {
        if (state.typeArticle === 'owner') {
          let result = state.articlePhotoPrice +
            (state.symbol_price * (state.article.length + state.articleTitle.length))
          if (state.selectedReleases.length) {
            return (result * state.selectedReleases.length) + state.photoTypePrice
          } else if (!state.selectedReleases.length) {
            return result + state.photoTypePrice
          } else {
            return null
          }
        }
        if (state.typeArticle === 'order') {
          if (state.selectedReleases.length) {
            return (state.articlePhotoPrice * state.selectedReleases.length) + state.photoTypePrice + state.selectedArticlePrice
          } else if (!state.selectedReleases.length) {
            return state.articlePhotoPrice + state.photoTypePrice + state.selectedArticlePrice
          } else {
            return null
          }
        }
      }

      if (state.advertisementType === 'banner') {
        if (state.selectedReleases.length) {
          return (state.selectedBannerSizePrice * state.selectedReleases.length) + state.bannerTypePrice
        } else if (!state.selectedReleases.length) {
          return state.selectedBannerSizePrice + state.bannerTypePrice
        } else {
          return null
        }
      }

      if (state.advertisementType === 'advert') {
        let result = 0
        if (state.selectedReleases.length) {
          result = (+state.symbol_price * state.advertText?.length) * state.selectedReleases.length
        } else if (!state.selectedReleases.length) {
          result = +state.symbol_price * state.advertText?.length
        } else {
          result = 0
        }
        return result
      }

      if (state.advertisementType === 'webbanner') {
        return state.website.selectedWebBannerSizePrice * state.website.deyDiff + state.website.webBannerOrderPrice
      }


      if (state.advertisementType === 'socialpost') {
        if (state.social.typePost === 'owner') {
          let result = state.social.postPhotoPrice +
            (state.social.postSymbolPrice * (state.social.post.length + state.social.postTitle.length))
          if (state.social.postTime.length) {
            return (result * state.social.postTime.length) + state.social.postPhotoTypePrice
          } else if (!state.social.postTime.length) {
            return result + state.social.postPhotoTypePrice
          } else {
            return null
          }
        }
        if (state.social.typePost === 'order') {
          if (state.social.postTime.length) {
            return (state.social.postPhotoPrice * state.social.postTime.length) + state.social.postPhotoTypePrice + state.social.selectedPostPrice
          } else if (!state.social.postTime.length) {
            return state.social.postPhotoPrice + state.social.postPhotoTypePrice + state.social.selectedPostPrice
          } else {
            return null
          }
        }
      }


      if (state.advertisementType === 'necrology') {
        if (state.typeNecrology === 'owner') {
          let result = state.necrologPhotoPrice + (state.symbol_price * (state.necrolog.length + state.necrologTitle.length))
          if (state.selectedReleases.length) {
            return (result * state.selectedReleases.length)
          } else if (!state.selectedReleases.length) {
            return result
          } else {
            return null
          }

        }
        if (state.typeNecrology === 'order') {
          if (state.selectedReleases.length) {
            return (state.necrologPhotoPrice * state.selectedReleases.length) + state.selectedNecrologyPrice
          } else if (!state.selectedReleases.length) {
            return state.necrologPhotoPrice + state.selectedNecrologyPrice
          } else {
            return null
          }
        }
      }



      if (state.advertisementType === 'remember') {
        if (state.typeEskealu === 'owner') {
          let result = state.eskealuPhotoPrice + (state.symbol_price * (state.eskealu.length + state.eskealuTitle.length))
          if (state.selectedReleases.length) {
            return (result * state.selectedReleases.length)
          } else if (!state.selectedReleases.length) {
            return result
          } else {
            return null
          }

        }
        if (state.typeEskealu === 'order') {
          if (state.selectedReleases.length) {
            return (state.eskealuPhotoPrice * state.selectedReleases.length) + state.selectedEskealuPrice
          } else if (!state.selectedReleases.length) {
            return state.eskealuPhotoPrice + state.selectedEskealuPrice
          } else {
            return null
          }
        }
      }



    },

    pricePhotoInStudio(state) {
      return state.price_photo_in_studio
    },
    pricePhotoVisit(state) {
      return state.price_photo_visit
    },

    getBanners(state) {
      return state.banners
    },
    getBannerOrderPrice(state) {
      return state.bannerOrderPrice
    },

    getBusyBanner: state => state.busyBanner,

    getSelectedReleases(state) {
      return state.selectedReleases
    },
    // Advert
    getCategories(state) {
      return state.categories
    },
    getAdvertSettings(state) {
      return state.advertSettings
    },

    //Necrology
    getNecrologPhotoSize: state => state.necrologPhotoSize,
    getNecrologSettings: state => state.necrologSettings,
    getOrderNecrolog: state => state.orderNecrolog,


    //Eskealu
    getEskealuPhotoSize: state => state.eskealuPhotoSize,
    getEskealuSettings: state => state.eskealuSettings,
    getOrderEskealu: state => state.orderEskealu,


  },
  modules: {
    website, social
  }
})
