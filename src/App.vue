<template>
  <div>
    <v-header :seller='seller'></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <a v-link="{path:'/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/ratings'}">评论</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/seller'}">商家</a>
      </div>
    </div>
		<!-- keep-alive 路由切换时页面不会被重新渲染-->
    <router-view :seller="seller" keep-alive></router-view>
  </div>
</template>
<script>
	import {urlParse} from 'common/js/util'
  import header from './components/header/header.vue'
  const ERR_OK = 0
  export default {
    data(){
      return{
        seller:{
          id:(() => {
            let queryParam = urlParse()
						console.log(queryParam)
            return queryParam.id
          })()
        }
      }
    },
    created(){
      this.$http.get('/api/seller?id='+this.seller.id).then((response) => {
        response = response.body
        if(response.errno===ERR_OK){
          // Object.assign从一个或多个sources对象中，复制所有自身可枚举的属性到target对象中，并返回这个target对象。
					// 把seller中的新属性id也放到对全局seller对象中
          this.seller = Object.assign({},this.seller,response.data)
          //this.seller = response.data
        }
      })
    },
    components: {
      'v-header':header  // html不允许使用关键字header
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "./common/stylus/mixin.styl"
		.tab
			display:flex
			width: 100%
			height: 40px
			line-height: 40px
			border-1px(rgba(7,17,27,0.1))
		.tab-item
			flex: 1
			text-align: center
			// & 表示a标签的父元素
			& > a
				display: block
				font-size: 14px
				color: rgb(77,85,93)
				&.active
						color: rgb(240,20,20)
</style>
