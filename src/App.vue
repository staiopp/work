<template>
	<div id="app">
		<img src="./assets/bg1.jpeg" class="bg"/>
		<!-- <HomeNav></HomeNav> -->
		<music-nav></music-nav>
		<music-main @gedanUrl="getUrl"></music-main>
	</div>
</template>

<script>
	// @ is an alias to /src
	import MusicNav from './components/MusicNav.vue'
	import MusicMain from './components/compont/MusicMain.vue'
	export default {
		name: 'app',
		data(){
			return {
				musicurl : ""
			}
		},
		components: {
			MusicNav , MusicMain
		},
		methods:{
			getUrl:function(url){
				this.musicurl = url
			}
		},
		mounted() {
			// console.log(this.$refs)
			// console.log(111)
			// console.log(this.$parent)
			// console.log(111)
		}
	}
</script>


<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		padding: 30px;
		padding-top: 0;
		margin: 0;
/* 		background: url(assets/bg2.jpeg); */
		overflow-y: visible;
	}

	#nav {
		padding: 30px;
	}

	#nav a {
		font-weight: bold;
		color: #2c3e50;
	}

	#nav a.router-link-exact-active {
		color: #42b983;
	}
	.bg{
		height: 100%;
		width: 100%;
		position:absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}
</style>
