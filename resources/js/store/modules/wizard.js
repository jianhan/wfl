import * as mutationTypes from '../mutation-types'

// initial state
const initialState = {
    // dataSources which is not mutable
    dataSources: {
        google: 'google',
        zomato: 'zomato',
        yelp: 'yelp',
        here: 'here',
    },
    isLoading: false,
    selectedAddress: '',
    selectedDatasource: 'google',
    latitude: 0,
    longitude: 0,
}

// getters
const getters = {
    isSelectedAddressSet: (state) => {
        return state.selectedAddress != '' && this.latitude !== 0 && this.longitude !== 0
    }
}

// actions
const actions = {

}

// mutations
const mutations = {
    [mutationTypes.UPDATE_WIZARD_IS_LOADING](state, payload) {
        state.isLoading = payload
    },
    [mutationTypes.UPDATE_SELECTED_DATASOURCE](state, payload) {
        state.selectedDatasource = payload
    },
    [mutationTypes.UPDATE_LATITUDE_LONGITUDE](state, {
        latitude,
        longitude
    }) {
        state.latitude = latitude
        state.longitude = longitude
    },
    [mutationTypes.UPDATE_SELECTED_ADDRESS](state, payload) {
        state.selectedAddress = payload
    },
    [mutationTypes.RESET_WIZARD](state) {
        state = initialState
    },
}


export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
