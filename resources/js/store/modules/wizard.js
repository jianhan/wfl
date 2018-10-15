import * as mutationTypes from '../mutation-types'

const googleFormData = {
    latitude: '',
    longitude: '',
    radius: 500,
    minprice: null,
    maxprice: null
}

// initial state
const state = {
    // dataSources which is not mutable
    dataSources: {
        google: 'google',
        zomato: 'zomato',
        yelp: 'yelp',
        here: 'here',
    },
    selectedDatasource: 'google',
    googleFormData
}

// getters
const getters = {
    // cartProducts: (state, getters, rootState) => {
    //     return state.items.map(({
    //         id,
    //         quantity
    //     }) => {
    //         const product = rootState.products.all.find(product => product.id === id)
    //         return {
    //             title: product.title,
    //             price: product.price,
    //             quantity
    //         }
    //     })
    // }
}

// actions
const actions = {
    // checkout({
    //     commit,
    //     state
    // }, products) {
    //     const savedCartItems = [...state.items]
    //     commit('setCheckoutStatus', null)
    //     // empty cart
    //     commit('setCartItems', {
    //         items: []
    //     })
    //     shop.buyProducts(
    //         products,
    //         () => commit('setCheckoutStatus', 'successful'),
    //         () => {
    //             commit('setCheckoutStatus', 'failed')
    //             // rollback to the cart saved before sending the request
    //             commit('setCartItems', {
    //                 items: savedCartItems
    //             })
    //         }
    //     )
    // },

}

// mutations
const mutations = {
    [mutationTypes.UPDATE_SELECTED_DATASOURCE](state, payload) {
        Vue.set(state, 'selectedDatasource', payload)
    },
    [mutationTypes.UPDATE_LATITUDE_LONGITUDE](state, latitude, longitude) {
        Vue.set(state, 'googleFormData.latitude', latitude)
        Vue.set(state, 'googleFormData.longitude', longitude)
    },
    [mutationTypes.UPDATE_RADIUS](state, radius) {
        Vue.set(state, 'googleFormData.radius', radius)
    },
    [mutationTypes.UPDATE_MAX_PRICE](state, maxPrice) {
        Vue.set(state, 'googleFormData.maxPrice', maxPrice)
    },
    [mutationTypes.UPDATE_MIN_PRICE](state, minPrice) {
        Vue.set(state, 'googleFormData.minPrice', minPrice)
    },
    [mutationTypes.RESET_GOOGLE_FORM](state) {
        Vue.set(state, 'googleFormData', googleFormData)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
