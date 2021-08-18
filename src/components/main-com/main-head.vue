<template>
	<div class="m-head">
		<router-view style="margin: 10px;margin-bottom: 0;padding: 0;" ></router-view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: '1',
				activeIndex2: '1'
			};
		},
		// methods: {
		// 	handleSelect(key, keyPath) {
		// 		console.log(key, keyPath);
		// 	}
		// }
		methods:{
			
		},
		mounted() {
			console.log(33333)
			console.log(this)
		}
	}
</script>

<style>
	.m-head{
		padding: 0;
		/* background-color: #000000; */
	}
	.el-menu--horizontal>.el-menu-item a, .el-menu--horizontal>.el-menu-item a:hover{
		font-size: 18px;
		text-decoration: none;
		font-family: "book antiqua";
	}
	.el-menu.el-menu--horizontal{
		background-color: #dddfc7;
	}
</style>
