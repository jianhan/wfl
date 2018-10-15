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
    canProcessSearch: (state) => {
        if (state.selectedDatasource === state.dataSources.google) {
            if (_.get(state, 'googleFormData.latitude') == '' || _.get(state, 'googleFormData.longitude') == '' || _.get(state, 'googleFormData.radius') == 0) {
                return false
            }

            return true
        }
        return false
    }
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
    [mutationTypes.UPDATE_LATITUDE_LONGITUDE](state, {
        latitude,
        longitude
    }) {
        Vue.set(state, 'googleFormData', Object.assign({}, state.googleFormData, { latitude }))
        Vue.set(state, 'googleFormData', Object.assign({}, state.googleFormData, { longitude }))
    },
    [mutationTypes.UPDATE_RADIUS](state, radius) {
        Vue.set(state, 'googleFormData', Object.assign({}, state.googleFormData, { radius }))
    },
    [mutationTypes.UPDATE_MAX_PRICE](state, maxprice) {
        Vue.set(state, 'googleFormData', Object.assign({}, state.googleFormData, { maxprice }))
    },
    [mutationTypes.UPDATE_MIN_PRICE](state, minprice) {
        Vue.set(state, 'googleFormData', Object.assign({}, state.googleFormData, { minprice }))
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
