<template>
	<div class="music-nav">
		<p class="nav-tit">DYMusic</p>
		<div class="nav-ipt">
			<nav-menu></nav-menu>
			<login></login>
			<nav-input style="float: right;" @serchSongs="getSongs"></nav-input>
		</div>
	</div>
</template>

<script>
	import NavMenu from './compont/Menu.vue'
	import login from './compont/Login.vue'
	import NavInput from './compont/NavInput.vue'
	export default {
		data() {
			return {
				searchText: ""
			}
		},
		components:{
			NavInput , login , NavMenu
		},
		methods:{
			getSongs:function(data){
				console.log(data)
			}
		}
	}
</script>

<style>
	.music-nav {
		margin: 10%;
		margin-top: 0px;
		margin-bottom: 0px;
		border: 2px solid black;
		background-color: #353921;
		width: 1020px;
		height: 80px;
		padding-top: 0;
	}

	.nav-tit {
		display: inline-block;
		float: left;
		width: 300px;
		height: 80px;
		line-height: 80px;
		color: #8CC5FF;
		font-size: 30px;
		margin: 0;
	}
	.nav-ipt{
		height: 80px;
		line-height: 60px;
		display: block;
		float: left;
		
	}
	.textInpu{
		prefix-icon:
	}
</style>
