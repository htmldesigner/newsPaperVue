import api from "../api/api";

export default {
    state: {
        socialNetworksList: null, // Список соцсетей
        setSocialNetworkId: null, // Id соц. сети

        post_id: null, //ID Заказного поста
        typePost: '', // Заказной или нет поста
        selectedPostPrice: 0, // Цена заказный статья
        post: '', // Тело статьи
        postTitle: '', // Заголовок поста
        post_image: null, // Собственное изображение поста
        visitPostORstudioPost: null, // визит в студию или выездная фотоссесия
        postPhotoTypePrice: 0, // Цена в зависимости от типа фотосессии
        postPhotoPrice: 0,
        post_image_size_id: null, // ID размера фотографии
        postTime: [], // Даты выхода постов

        postPhotoSize: null, // Список размеров изображений
        orderPost: null, // Список расценок на заказные посты

        postSymbolPrice: 0,
        postSymbolLimit: 0,
        postPrice_photo_in_studio: 0,
        postPrice_photo_visit: 0
    },
    mutations: {
        setPostType(state, payload) {
            state.typePost = payload
        },
        setSelectedPostPrice(store, payload) {
            store.selectedPostPrice = payload
        },
        postLength(state, payload) {
            state.post = payload
        },

        postTitleLength(state, payload) {
            state.postTitle = payload
        },
        setPostPhotoTypePrice(store, payload) {
            store.postPhotoTypePrice = payload
        },

        setPostSettings(store, payload) {
            store.postSymbolPrice = payload.post_settings.price
            this.state.symbol_limit = payload.post_settings.limit
            store.postPrice_photo_in_studio = payload.post_settings.postPrice_photo_in_studio
            store.postPrice_photo_visit = payload.post_settings.postPrice_photo_visit

            store.postPhotoSize = payload.post_photo_size
            store.orderPost = payload.order_post
        },

        setPostPhotoPrice(state, payload) {
            state.postPhotoPrice = payload
        },
        setPostImageSizeId(state, payload) {
            state.post_image_size_id = payload
        },
        setPostTime(state, payload) {
            state.postTime = payload
        },
        setSocialNetworksList(state, payload) {
            state.socialNetworksList = payload
        },

        setSocialNetworkId(state, payload) {
            state.setSocialNetworkId = +payload
        }

    },
    actions: {
        async getSocialNetworkList({commit, state}) {
            try {
                const response = await api.getSocialNetworkList()
                commit('setSocialNetworksList', response.data)
            } catch (e) {
                console.log(e)
            }
        },

        async getSocialNetworkReleases({commit, state, rootState}) {
            try {
                const response = await api.getReleases({
                    id: state.setSocialNetworkId,
                    type: rootState.advertisementType
                })
                commit('setPostSettings', response.data)
            } catch (e) {
                console.error(e)
            }
        }
    },
    getters: {
        postPricePhotoInStudio: state => state.postPrice_photo_in_studio,
        postPricePhotoVisit: state => state.postPrice_photo_visit,
        getSocialNetworksList: state => state.socialNetworksList,
        getOrderPost: state => state.orderPost,
        getPostPhotoSize: state => state.postPhotoSize,
        getPostTime: state => state.postTime,
        getPostLength: state => state.post
    }
}