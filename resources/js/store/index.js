import Vue from 'vue'
import Vuex from 'vuex'
import wizard from './modules/wizard'
import google from './modules/google'
import createLogger from '../plugins/logger'
import 'es6-promise/auto'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        wizard,
        google
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
