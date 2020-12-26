import Vue from 'vue'
import App from './App'

import Global from './common/global'

Vue.config.productionTip = false

Vue.prototype.$common = Global

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
