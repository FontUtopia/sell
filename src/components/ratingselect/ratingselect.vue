<template>
	<div class="ratingselect">
		<div class="rating-type border-1px">
			<span class="block positive">{{desc.all}}
				<span class="count">47</span>
			</span>
			<span class="block positive">{{desc.positive}}
				<span class="count">47</span>
			</span>
			<span class="block positive">{{desc.negative}}
				<span class="count">47</span>
			</span>
		</div>
		<div class="switch">
			<span class="icon-check_circle"></span>
			<span class="text">只看有评价的内容</span>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	// const POSITIVE = 0
	// const NEGATIVE = 1
	const ALL = 2
	export default {
	  props : {
	    rating : {
	      type: Array,
				default() {
	        return []
				}
			},
			selectType :{
	      type: Number,
				default : ALL
			},
			onlyContent:{
	      type: Boolean,
				default : false
			},
			desc : {
	      type: Object,
				default(){
	        return {
	          all: '全部',
						positive: '满意',
						negative: '不满意'
					}
				}
			}
		}
	}
</script>
<style lang="stylus" ref="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.ratingselect
		.rating-type
			padding : 18px 0
			margin : 0 18px
			border-1px(rgba(7,17,27,0.1))
			font-size: 0
			.block
				display : inline-block
				padding : 8px 12px/
</style>