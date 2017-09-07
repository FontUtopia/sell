<template>
    <div class="goods">
			<div class="menu-wrapper" v-el:menu-wrapper>
				<ul>
					<li v-for="item in goods" class="menu-item"
							:class="{'current':currentIndex===$index}" @click="selectMenu($index,$event)">
						<span class="text border-1px">
							<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
							{{item.name}}
						</span>
					</li>
				</ul>
			</div>
			<div class="foods-wrapper" v-el:foods-wrapper>
				<ul>
					<li v-for="item in goods" class="food-list food-list-hook">
						<h1 class="title">{{item.name}}</h1>
						<ul>
							<li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
								<div class="icon">
									<img width="57" height="57" :src="food.icon">
								</div>
								<div class="content">
									<h2 class="name">{{food.name}}</h2>
									<p class="desc">{{food.description}}</p>
									<div class="extra">
										<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
									</div>
									<div class="price">
										<span class="now">¥{{food.price}}</span>
										<span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
									</div>
									<div class="cartcontrol-wrapper">
										<cartcontrol :food="food"></cartcontrol>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    </div>
	<food :food="selectedFood" v-ref:food></food>
</template>
<script type="text/ecmascript-6">
	import BScroll from 'better-scroll'
	import food from "components/food/food"
	import shopcart from "components/shopcart/shopcart"
	import cartcontrol from "components/cartcontrol/cartcontrol"
		const ERR_OK = 0
     export default{
			 props: {
			   seller: {
			     type: Object
				 }
			 },
			 data(){
			   return {
			     goods : [],
           // 左侧菜单对应的右侧部分高度的区间数组，滚动右侧的时候左侧要出现高亮
           listHeight: [],
           scrollY: 0,
           selectedFood : {}
				 }
			 },
			 computed: {
			   currentIndex() {
			     for(let i=0;i<this.listHeight.length; i++){
							let height1 = this.listHeight[i]
						 	let height2 = this.listHeight[i+1]
						 	if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
							  return i
							}
					 }
					 return 0
				 },
         selectFoods(){
           let foods = []
           this.goods.forEach((good)=>{
             good.foods.forEach((food)=>{
               if(food.count){
                 foods.push(food)
               }
             })
           })
           return foods
         }
			 },
			 created() {
         this.classMap = ['decrease','discount','special','invoice','guarantee']

			   this.$http.get('/api/goods').then((response)=>{
           response = response.body
					 if(response.errno === ERR_OK){
             this.goods = response.data
						 this.$nextTick(() => {
               // dom更新后再进行初始化滚轮
               this._initScroll()
               this._calculateHeight()
						 })
					 }
				 })
			 },
			 methods:{
			   _initScroll(){
			     this.menuScroll = new BScroll(this.$els.menuWrapper,{
			       click:true
					 })
					 this.foodsScroll = new BScroll(this.$els.foodsWrapper,{
             click:true,
					   probeType: 3
					 })

					 this.foodsScroll.on('scroll',(pos) => {
					   this.scrollY = Math.abs(Math.round(pos.y))
					 })
				 },
				 _calculateHeight(){
					 let foodlist = this.$els.foodsWrapper.getElementsByClassName('food-list-hook')
					 let height = 0
					 this.listHeight.push(height)
					 for(let i=0;i<foodlist.length;i++){
						 let item = foodlist[i]
						 height += item.clientHeight
						 this.listHeight.push(height)
					 }
				 },
         selectMenu(index,event){
				   console.log(event)
				   if(!event._constructed){
							return
					 }
           let foodlist = this.$els.foodsWrapper.getElementsByClassName('food-list-hook')
					 let el = foodlist[index]
					 this.foodsScroll.scrollToElement(el,300)
				 },
         selectFood(food, event){
//					 if (!event._constructed) {
//					   return
//					 }
					 this.selectedFood = food
					 this.$refs.food.show()
				 }
			 },
       components:{
         food,
         shopcart,
         cartcontrol
       }
     }
</script>
<style lang="stylus" ref="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.goods
		display : flex
		position : absolute
		top : 174px
		bottom : 46px
		width : 100%
		overflow : hidden
		.menu-wrapper
			flex : 0 0 80px
			width : 80px // 如果不设置width属性，安卓浏览器会失效
			background : #f3f5f7
			.menu-item
				display : table // 无论几行都会垂直居中
				height: 54px
				width 56px
				padding : 0 12px
				line-height : 14px
				&.current
					position: relative
					z-index : 10
					margin-top : -1px
					background : #fff
					font-weight : 700
					.text
						border-none()
				.icon
					display: inline-block
					width: 12px
					height: 12px
					vertical-align: top
					background-size: 12px 12px
					margin-right: 4px
					background-repeat: no-repeat
					&.decrease
						bg-image('decrease_3')
					&.special
						bg-image('special_3')
					&.invoice
						bg-image('invoice_3')
					&.guarantee
						bg-image('guarantee_3')
					&.discount
						bg-image('discount_3')
				.text
					display : table-cell // table表格中的单元格最大的特点之一就是同一行列表元素都等高。所以，很多时候，我们需要等高布局的时候，就可以借助display:table-cell属性。
					width : 56px
					vertical-align : middle
					border-1px(rgba(7,17,27,0.1))
					font-size : 12px
		.foods-wrapper
			flex : 1
			.title
				padding-left : 14px
				height : 26px
				line-height : 26px
				border-left : 2px solid #d9dde1
				font-size: 12px
				color: rgb(147,153,159)
				background : #f3f5f7
			.food-item
				display : flex
				margin : 18px
				padding-bottom : 18px
				border-1px(rgba(7,17,27,0.1))
				&:last-child
					border-none()
					margin-bottom : 0
				.icon
					flex : 0 0 57px
					margin-right : 10px
				.content
					flex : 1
					.name
						margin: 2px 0 8px 0
						height : 14px
						line-height : 14px
						font-size : 14px
						color : rgb(7,17,27)
					.desc,.extra
						line-height : 10px
						font-size : 10px
						color: rgb(147,153,159)
					.desc
						margin-bottom :8px
						line-height:12px
					.extra
						.count
							margin-right : 12px
					.price
						font-weight :700
						line-height :24px
						.now
							margin-right : 8px
							font-size : 14px
							color : rgb(240,20,20)
						.old
							text-decoration : line-through
							font-size: 10px
							color: rgb(147,153,159)
					.cartcontrol-wrapper
						position : absolute
						right : 0
						bottom : 12px
</style>