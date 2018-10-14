import Vue from 'vue'
import Vuex from 'vuex'
import wizard from './modules/wizard'
import createLogger from '../plugins/logger'
import 'es6-promise/auto'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        wizard,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
