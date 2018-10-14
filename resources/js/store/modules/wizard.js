import * as mutationTypes from '../mutation-types'

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
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
