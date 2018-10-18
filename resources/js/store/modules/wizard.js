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
    canProcessSearch: (state) => {
        if (state.selectedDatasource === state.dataSources.google) {
            if (_.get(state, 'googleFormData.latitude') == '' || _.get(state, 'googleFormData.longitude') == '' || _.get(state, 'googleFormData.radius') == 0) {
                return false
            }

            return true
        }
        return false
    },
    isAddressSet: (state) => {
        
    }
}

// actions
const actions = {

}

// mutations
const mutations = {
    [mutationTypes.UPDATE_WIZARD_IS_LOADING](state, payload) {
        this.isLoading = payload
    },
    [mutationTypes.UPDATE_SELECTED_DATASOURCE](state, payload) {
        this.selectedDatasource = payload
    },
    [mutationTypes.UPDATE_LATITUDE_LONGITUDE](state, {
        latitude,
        longitude
    }) {
        this.latitude = latitude
        this.longitude = longitude
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
