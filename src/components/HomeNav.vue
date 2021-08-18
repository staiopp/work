<template>
	<div id="app">
		<div id="nav">
			<div class="line"></div>
			<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
			 @click="toAbout" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
				<el-menu-item index="1">
					<router-link to="/nav">首页</router-link>
				</el-menu-item>
				<el-submenu index="2">
					<template slot="title">我的工作台</template>
					<el-menu-item index="2-1">选项1</el-menu-item>
					<el-menu-item index="2-2">选项2</el-menu-item>
					<el-menu-item index="2-3">选项3</el-menu-item>
					<el-submenu index="2-4">
						<template slot="title">选项4</template>
						<el-menu-item index="2-4-1">选项1</el-menu-item>
						<el-menu-item index="2-4-2">选项2</el-menu-item>
						<el-menu-item index="2-4-3">选项3</el-menu-item>
					</el-submenu>
				</el-submenu>
				<el-menu-item index="3" disabled @click="toAbout">
					<router-link to="/about">About</router-link>
				</el-menu-item>
				<el-menu-item index="4">
					<router-link to="/">Home</router-link> 
				</el-menu-item>
			</el-menu>
		</div>
		<router-view />
	</div>
</template>

<script>
	// @ is an alias to /src
	// import HelloWorld from '@/components/HelloWorld.vue'
	// import musicHome from './components/MusicHome.vue'
	// import homeNav from 'components/HomeNav.vue'

	export default {
		name: 'app',
		data() {
			return {
				activeIndex: '1',
				activeIndex2: '1'
			};
		},
		methods: {
			handleSelect(key, value) {
				console.log(key);
			},
			toAbout:function(key){
	
			}
		}
	}
</script>

<style scoped>
	
	#nav{
		padding: 0;
	}
	
</style>
