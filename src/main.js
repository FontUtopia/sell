import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import goods from 'components/goods/goods'
import ratings from 'components/ratings/ratings'
import seller from 'components/seller/seller'

import 'common/stylus/index.styl'
// 全局注册

Vue.use(VueRouter)
Vue.use(VueResource)

/* eslint-disable no-new */
// new Vue({
//     el: 'body',
//     components: { App }
// })

let app = Vue.extend(App) // vue-router的使用方式

let router = new VueRouter({
    linkActiveClass: 'active'
})

router.map({
    '/goods': {
        component: goods
    },
    '/ratings': {
        component: ratings
    },
    'seller': {
        component: seller
    }
})

router.start(app, '#app')

// 设置默认跳到googoods
router.go('/goods')