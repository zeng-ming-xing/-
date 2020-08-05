<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_info:{}
				
			}
		},
		methods: {
			
		},
		onLoad(option){
			const {v}=option;
			const goods_info=JSON.parse(v);
			this.goods_info=goods_info
		}
	}
</script>

<style>

</style>
