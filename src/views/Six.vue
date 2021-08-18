<template>
	<div style="float: left;width: 1000px;">
		<i class="el-icon-back" style="font-size: 20px; color: ghostwhite;float: left;" @click="fanhui"></i>
		<el-table :data="songsList" style="width: 100%;" height="450">
			<el-table-column prop="name" label="音乐标题" width="300">
				<template scope="scope">
					<div @click="play(scope.row)">
						<span @click="nameSearch(scope.row)" @mouseover="change" @mouseleave="change" :class="{changeColor : isChange}">
							{{ scope.row.name }}
						</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="ar" label="歌手" width="200">
				<template scope="scope">
					<div v-for="index in scope.row.ar.length">
						<span @click="singerSearch(scope.row.ar[index-1].id)" @mouseover="change" @mouseleave="change" :class="{changeColor : isChange}">
							{{ scope.row.ar[index-1].name }}
						</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="al.name" label="专辑" width="300px">
				<template scope="scope">
					<div>
						<span @click="nameSearch(scope.row.al)" @mouseover="change" @mouseleave="change" :class="{changeColor : isChange}">
							{{ scope.row.al.name }}
						</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="50">
				<template slot-scope="scope">
					<div @click="play(scope.row)">
						<i :class="platState"></i>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="" width="50">
				<template slot-scope="scope">
					<div v-if="scope.row.mv !== 0" @click="playMv(scope.row)">
						<i :class="platState1"></i>
					</div>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				songsList: [],
				platState: "el-icon-video-play",
				platState1: "el-icon-monitor",
				isShow: true,
				isShow2: false,
				artistsList: [],
				musicUrl: "",
				isChange: false,
				searchList: [],
				songsId: 500,
				searchName: "",
				alName : ""
			}
		},
		methods: {
			getSongs: function() {
				// console.log(this.$route)
				this.songsList = this.$route.params.result
			},
			fanhui:function(){
				this.$router.push({
					name: 'One'
				})
			},
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
			playMv(val){
				console.log(val.al)
				this.$router.push({
					name: 'mvPlay',
					params: {
						name : this.searchName,
						id : val.mv,
						musicName : val.name,
						singerName : val.ar,
						imgUrl : val.al.picUrl,
						alName : val.al.name
					}
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
			singerSearch:function(val){
				this.$router.push({
					name: 'Info',
					params:{
						sigName : val,
					}
				})
			},
			change: function() {
				this.isChange = !this.isChange
			}
		},
		mounted() {
			console.log(this.$route)
			this.songsList = this.$route.params.result
			this.searchName = this.$route.params.name
			for (let i = 0; i < this.songsList.length; i++) {
				this.artistsList.push(this.songsList[i].ar)
			}
			
		}
	}
</script>

<style>
	.changeColor {
		color: #00e8e8;
		/* cursor: url(../assets/mouse.jpg),auto; */
	}
</style>
