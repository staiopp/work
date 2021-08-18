<template>
	<div style="width: 1045px;">
		<div style="color: #00FFFF;">
			<i class="el-icon-back" style="font-size: 20px; color: ghostwhite;float: left;" @click="fanhui"></i>
			<div>
				<span style="font-size: 20px;padding-left: 250px">海量歌单</span>
				<!-- <input placeholder="请输入歌单名字"/> -->
				<span style="color: ghostwhite;padding-left: 250px;">
					换一换
					<i class="el-icon-refresh" style="font-size: 15px; 
				color: ghostwhite;margin-left: 6px;" @click="changeList"></i>
				</span>
			</div>
		</div>
		<div style="border: 2px solid pink; width: 150px; height: 150px; float: left; margin-top: 20px;margin-right: 55px;margin-bottom: 90px;"
		 v-for="(item,index) in imgList">
			<img :src="item.coverImgUrl" style="width: 100%; height: 100%px;" @click="gedan(index)" />
			<div style="color: #00FFFF;font-size: 14px;text-align-last: start;">{{item.name}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				AlbumList: [],
				imgList: [],
				num: 20,
				numtype : 1
			}
		},
		methods: {
			gedan: function(index) {
				// console.log(index)
				this.$router.push({
					name: 'Five',
					params: {
						gedanName: this.imgList[index].name,
						gedanImg: this.imgList[index].coverImgUrl,
						gedanId: this.imgList[index].id,
						type : this.numtype
					}
				})
			},
			fanhui: function() {
				this.$router.go(-1)
			},
			changeList: function() {
				this.axios.get("/api/top/playlist/highquality?before=" + this.lastMusicId + "&limit=25")
					.then((res) => {
						// console.log(res.data)
						this.imgList = res.data.playlists
						if (res.data.playlists.length >= 24) {
							this.lastMusicId = res.data.playlists[24].updateTime
						} else {
							this.lastMusicId = 1503639064232
						}
					})
					.catch((err) => {
						console.log(err)
					})
			}
		},
		mounted() {
			// console.log("mounted")
			this.axios.get("/api/top/playlist/highquality?before=1503639064232&limit=25")
				.then((res) => {
					// console.log(res.data)
					this.imgList = res.data.playlists
					this.lastMusicId = res.data.playlists[24].updateTime
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}
</script>

<style>
	
</style>
