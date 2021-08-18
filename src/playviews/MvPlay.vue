<template>
	<div>
		<i class="el-icon-back" style="font-size: 20px; color: ghostwhite;float: left;" @click="fanhui"></i>
		<br />
		<div style="width: 1000px;">
			<video ref='video' id="myVideo" class="video-js" autoplay="autoplay" controls="controls">
				<source :src="mvUrl" type="video/mp4">
			</video>
			<div style="float: left;margin-left: 60px;padding-right: 30px;">
				<img :src="mvImg" style="width: 200px;height: 200px;" />
			</div>
			<div style="color: ghostwhite;float: left;margin-left: 40px;">歌名：</div>
			<div style="color: #00FFFF;float: left;font-size: 14px;width: 200px;word-wrap: break-word;text-align-last: left;">
				<span style="">{{ songName }}</span>
			</div>
			<div style="color: ghostwhite;float: left;margin-left: 40px;">歌手：</div>
			<div style="color: #00FFFF;float: left;font-size: 14px;width: 200px;word-wrap: break-word;text-align-last: left;">
				<span v-for="index in sgName.length">
					{{ sgName[index-1].name }}
				</span>
			</div>
			<div style="color: ghostwhite;float: left;margin-left: 40px;">专辑：</div>
			<div style="color: #00FFFF;float: left;font-size: 14px;width: 200px;word-wrap: break-word;text-align-last: left;">
				<span >
					{{ albName }}
				</span>
			</div>
		</div>

	</div>

</template>

<script>
	export default {
		data() {
			return {
				mvUrl: "",
				state1: "",
				searchList: [],
				songsId: 1000,
				mvId: "",
				mvImg: "",
				sgName: [],
				songName: "",
				albName : ""
			}
		},
		methods: {
			fanhui: function() {
				// this.$router.go(0)
				console.log(this.state1)
				if( this.state1 != 'One' && this.state1 != 7)
				{
					this.axios.get("/api/cloudsearch?keywords=" + this.state1 + "&limit=50")
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
									name: this.state1
								},
								query: {
									id: this.songsId
								}
							})
						})
						.catch((err) => {
							console.log(err)
						})
				}else if( this.state1 = 7 ){
					this.$router.push({
						path: '/One'
					})
				}else{
					this.$router.push({
						path: '/One'
					})
				}
				
			}

		},
		mounted() {
			console.log(this.$route)
			this.state1 = this.$route.params.name
			this.mvId = this.$route.params.id
			this.mvImg = this.$route.params.imgUrl
			this.songName = this.$route.params.musicName
			this.sgName = this.$route.params.singerName
			this.albName = this.$route.params.alName
			this.axios.get("/api/mv/url?id=" + this.mvId)
				.then((res) => {
					console.log(res.data.data)
					this.mvUrl = res.data.data.url
					this.$refs.video.src = res.data.data.url
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}
</script>

<style>
	.mv-play {
		width: 800px;
		height: 500px;
	}

	.video-js {
		width: 700px;
		height: 400px;
		float: left;
	}
</style>
