<template>
	<div class="">
		<i class="el-icon-back" style="font-size: 20px; color: ghostwhite;float: left;" @click="fanhui"></i>
		<br />
		<div>
			<span class="newMusic-titie">标题</span>
			<span class="newMusic-titie">歌手</span>
			<span class="newMusic-titie">专辑</span>
			<span class="newMusic-titie">操作</span>
		</div>
		<div class="new-music" v-for="(item,index) in newLists">
			<img class="new-music-img" :src="item.picUrl" />
			<div style="width: 800px; height: 90px; float: left;margin-left: 40px;">
				<span class="name" @click="nameSearch(item)">{{ item.name }}</span>
				<span class="singer" @click="nameSearch(item.song.artists[index])">{{ item.song.artists[0].name }}</span>
				<span class="album" @click="nameSearch(item.song.album)">{{ item.song.album.name }}</span>
				<span style="color: #00FFFF;font-size: 18px;margin-left: 50px;line-height: 60px;"  @click="play(item)">
					<i :class="platState"></i>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				newLists: [],
				musicUrlList: [],
				platState: "el-icon-video-play",
				newSongs: [],
				num : 1
			}
		},
		methods: {
			fanhui: function() {
				console.log(this.$route)
				this.$router.go(-2)
			},
			// getUrl:function(url){
			// 	this.musicurl = url
			// 	this.$emit("gUrl",this.musicurl)
			// }
			play(val) {
				console.log(val)
				this.axios.get("/api/song/url?id=" + val.id)
					.then((res) => {
						// console.log(res.data)
						this.musicUrl = res.data.data[0].url
						this.$emit("giveUrl", this.musicUrl)
						console.log(this.musicUrl)
					})
					.catch((err) => {
						console.log(err)
					})
			},
			nameSearch: function(val) {
				console.log(val)
				this.axios.get("/api/cloudsearch?keywords=" + val.name + "&limit=50")
					.then((res) => {
						console.log(res.data.result.songs)
						this.searchList = res.data.result.songs
						this.$emit("serchSongs", this.searchList)
						this.songsId = this.songsId + 1
						this.$router.replace
						this.$router.push({
							name: 'Six',
							params: {
								result: this.searchList,
								// bool: this.value,
								// bool2: this.value2
							},
							query: {
								id: this.songsId
							}
						})
					})
					.catch((err) => {
						console.log(err)
					})
			},
		},
		mounted() {
			// console.log(this.$route)
			this.newLists = this.$route.params.newList
			for (let i = 0; i < this.newLists.length; i++) {
				this.axios.get("/api/song/url?id=" + this.newLists[i].id)
					.then((res) => {
						// console.log(res.data.data)
						this.musicUrlList.push(res.data.data[0].url)
						// console.log(this.musicUrlList)
					})
					.catch((err) => {
						console.log(err)
					})
			}

		}
	}
</script>

<style>
	.new-music {
		width: 1000px;
		height: 90px;
		/* border: 1px solid pink; */
		float: left;
		padding-bottom: 30px;
		margin-left: 50px;
	}

	.new-music-img {
		width: 90px;
		height: 90px;
		/* border: 1px solid pink; */
		float: left;
	}

	.newMusic-titie {
		color: ghostwhite;
		margin-left: 200px;
		float: left;
	}

	.name {
		color: #00FFFF;
		margin-left: 10px;
		float: left;
		width: 200px;
		word-wrap: break-word;
		font-size: 15px;
		text-align-last: left;
		text-align: left;
		margin-top: 10px;
	}

	.singer {
		color: #00FFFF;
		margin-left: 30px;
		float: left;
		width: 50px;
		word-wrap: break-word;
		font-size: 15px;
		text-align-last: left;
		text-align: left;
		margin-top: 10px;
	}

	.album {
		color: #00FFFF;
		margin-left: 150px;
		float: left;
		width: 150px;
		word-wrap: break-word;
		font-size: 15px;
		text-align-last: left;
		text-align: left;
		margin-top: 10px;
	}
</style>
