<template>
	<div class="music-info">
		<i class="el-icon-back" style="font-size: 20px; color: ghostwhite;float: left;" @click="fanhui"></i>
		<div>
			<div class="img-head">
			<img :src="imgUrl" style="width: 100%;height: 150px" />
			<span style="color: #00FFFF;">{{name}}</span>
			<div style="color: #a8a8a8;text-align: left;margin-top: 10px;">标签:</div>
			<div>
				<span v-for="item in mtags" style="color: #a8a8a8; margin-left: 5px;">{{ item }}</span>
			</div>
		</div>
		</div>
		<div class="music-list" >
			<music-list :pList="playList" @giveUrl="getUrl" :urList="urlList"></music-list>
		</div>
	</div>
</template>

<script>
	import musicList from '../playviews/MusicList.vue'
	export default {
		data() {
			return {
				id: "",
				imgUrl: "",
				name: "",
				playList: [],
				mtags: [],
				musicurl: "",
				num : "",
				albumList : [],
				urlList : []
			}
		},
		components:{
			musicList
		},
		methods:{
			fanhui:function(){
				this.$router.go(-1)
			},
			getUrl:function(url){
				this.musicurl = url
				this.$emit("gUrl",this.musicurl)
			}
		},
		mounted() {
			// console.log(this.$route)
			this.id = this.$route.params.gedanId
			this.imgUrl = this.$route.params.gedanImg
			this.name = this.$route.params.gedanName
			this.num = this.$route.params.type
			if( this.num == 1 ){
				this.axios.get("/api/playlist/detail?id=" + this.id)
				.then((res) => {
					// console.log(res.data.playlist.tracks)
					// console.log(res.data.playlist.trackIds)
					this.playList = res.data.playlist.tracks
					this.mtags = res.data.playlist.tags
				})
				.catch((err) => {
					console.log(err)
				})
			}else{
				this.axios.get("/api/album?id=" + this.id)
				.then((res) => {
					console.log(res.data.songs)
					this.albumList = res.data.songs
					this.playList = res.data.songs
					for(let i = 0 ; i < this.albumList.length ; i ++){
						this.axios.get("/api/song/url?id=" + this.albumList[i].id )
						.then((res) => {
							console.log(res.data)
							
							this.urlList.push(res.data.data[0].url)
							console.log(this.urlList)
						})
						.catch((err) => {
							console.log(err)
						})
					}
				})
				.catch((err) => {
					console.log(err)
				})
			}
			
		}
	}
</script>

<style>
	.music-info {
		width: 1000px;
/* 		border: 1px solid pink; */
		height: 350px;
		margin-top: 0;
	}
	
	.img-head {
		width: 150px;
		height: 300px;
		/* border: 1px solid pink; */
		margin-left: 40px;
		margin-top: 0px;
		float: left;
	}
	
	.music-list{
		margin-left: 250px;
		margin-top: 0px;
		width: 700px;
		height: 350px;
/* 		border: 1px solid pink; */
	}
</style>
