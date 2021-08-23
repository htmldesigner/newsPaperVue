import api from "../api/api";

export default {
    state: {
        webWebSiteList: null,
        selectedWebSiteId: null,
        webBanners: [],
        //advertisementType Тип реклымы на сайте

        //webBanner
        webBannerOrderPrice: 0, // цена заказного банера выбраного на фронте
        selectedWebBannerSizePrice: 0, // Цена за выбранный банер из списка возможных
        selectedWebBannerId: null, // ID Выбраного веб банера
        //TODO Установить цену за заказной веб банер
        webBannerTypePrice: 0, // Цена за заказной дизайн (с бека)
        webBannerComment: '',
        webBannerImage: null,
        periodFrom: null,
        periodTo: null,
        deyDiff: 0,


    },
    mutations: {
        setWebSiteList(state, payload) {
            state.webWebSiteList = payload
        },
        setWebSiteId(state, payload) {
            state.selectedWebSiteId = parseInt(payload)
        },
        setWebBanners(state, payload) {
            state.webBanners = payload.banners
            state.webBannerTypePrice = payload.web_banner_order_price
        },
        setPeriodWebBannerPublication(state, payload) {
           state.periodFrom = payload.from
           state.periodTo = payload.to
        }
    },
    actions: {
        async getWebSiteList({commit}) {
            try {
                const response = await api.getWebSiteList()
                console.log(response.data)
                commit('setWebSiteList', response.data)
            } catch (e) {
                console.error(e)
            }
        },
        async getWebSiteReleases({commit, state, rootState}) {
            try {
                const response = await api.getReleases({id: state.selectedWebSiteId, type: rootState.advertisementType})
                commit('setWebBanners', response.data)
            } catch (e) {
                console.error(e)
            }
        }
    },
    getters: {
        getWebBanners(state) {
            return state.webBanners
        },
        getWebSiteList(state) {
            return state.webWebSiteList
        },
        getWebBannerOrderPrice(state) {
            return state.webBannerTypePrice
        },
        getSelectedWebBannerId: state => state.selectedWebBannerId
    }
}