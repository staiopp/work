<template>
	<div id="one">
		<p class="tj-title">热门音乐</p>
		<el-carousel :interval="4000" type="card" height="280px" line-height="50px">
			<el-carousel-item v-for="(item,index) in AlbumList" :key="index">
				<img :src="item.picUrl" style="width: 100%; height: 100%;" @click="playAlbum(item,index)"/>
			</el-carousel-item>
		</el-carousel>
		<p class="tj-title">热门歌单</p>
		<div style="width: 1045px;">
			<div style="border: 2px solid pink; width: 150px; height: 150px; float: left; margin-right: 55px;margin-bottom: 90px;" v-for="(item,index) in imgList">
				<img :src="item.picUrl" style="width: 100%; height: 100%px;" @click="gedan(index)"/>
				<div style="color: #00FFFF;font-size: 14px;text-align-last: start;text-align: left;">{{item.name}}</div>
			</div>
		</div>
		<span>1</span>
		<p class="tj-title">热门MV</p>
		<div style="width: 1045px;">
			<div style="border: 2px solid pink; width: 350px; height: 198px; float: left; margin-left: 90px;margin-bottom: 120px;" v-for="(item,index) in mvList">
				<img :src="item.picUrl" style="width: 100%; height: 100%;" @click="playMv(item,index)"/>
				<div style="color: #00FFFF;font-size: 14px;text-align-last: start;text-align: left;">{{item.name}}</div>
			</div>
		</div>
		<!-- <tui-jian></tui-jian> -->
	</div>
</template>

<script>
	import tuiJian from '../main-one/tuijian.vue'
	export default {
		data() {
			return {
				AlbumList: [],
				imgList: [],
				Alubmurl : "",
				numtype : 1,
				albumtype : 2,
				mvList: [],
				routeName : "One",
				idList: []
			}
		},
		components: {
			tuiJian
		},
		methods:{
			gedan:function(index){
				// console.log(index)
				this.$router.push({
					name: 'Five',
					params:{
						gedanName : this.imgList[index].name,
						gedanImg : this.imgList[index].picUrl,
						gedanId: this.imgList[index].id,
						type : this.numtype 
					}
				})
			},
			playAlbum:function(item,index){
				// this.Alubmurl = AlbumList[index].
				// this.$emit("gUrl",this.musicurl)
				// console.log(item)
				this.$router.push({
					name: 'Five',
					params:{
						gedanName : this.AlbumList[index].name,
						gedanImg : this.AlbumList[index].picUrl,
						gedanId: this.AlbumList[index].song.album.id,
						type : this.albumtype
					}
				})
			},
			playMv(val,index){
				// console.log(val.al)
				this.$router.push({
					name: 'mvPlay',
					params: {
						name : this.routeName,
						id : this.idList[index],
						musicName : val.name,
						singerName : val.artists,
						imgUrl : val.picUrl,
						alName : val.name
					}
				})
			}
		},
		mounted() {
			this.axios.get("/api/personalized/newsong")
				.then((res) => {
					// console.log(res.data.result)
					this.AlbumList = res.data.result
				})
				.catch((err) => {
					console.log(err)
				})
			// console.log("mounted")
			this.axios.get("/api/personalized?limit=10")
				.then((res) => {
					// console.log(res.data.result)
					this.imgList = res.data.result
				})
				.catch((err) => {
					console.log(err)
				})
			this.axios.get("/api/personalized/mv")
				.then((res) => {
					// console.log(res.data)
					this.mvList = res.data.result
					for (let i = 0; i < this.mvList.length; i++) {
						this.idList.push(this.mvList[i].id)
					}
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}
</script>

<style>
	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 100px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}

	.tj-title {
		color: #00d1d1;
		margin-top: 20px;
		margin-bottom: 30px;
		font-size: 20px;
	}
</style>
