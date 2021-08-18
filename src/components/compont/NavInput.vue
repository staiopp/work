<template>
	<el-row class="demo-autocomplete">
		<el-col :span="12" style="height: 50px;">
			<!--<div class="sub-title">激活即列出输入建议</div> -->
			<!-- <el-autocomplete style="width: 180px;" class="inline-input" v-model="state1" :fetch-suggestions="querySearch" 
			placeholder="请输入内容"  @click="search"></el-autocomplete> -->
			<input style="width: 180px; height: 30px; border-radius: 4px;" @keyup.enter="search" v-model="state1" />
		</el-col>
		<span class="el-icon-search" style="color: #00FFFF;margin-left: 55px;" @click="search"></span>
	</el-row>

</template>
<script>
	export default {
		data() {
			return {
				restaurants: [],
				state1: '陈奕迅',
				state2: '',
				searchList: [],
				value: true,
				value2: false,
				songsId : 300
			};
		},
		// inject: ['reload'],
		methods: {
			search() {
				console.log(this.state1)
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
								name : this.state1
							},
							query:{
								id : this.songsId
							}
						})
					})
					.catch((err) => {
						console.log(err)
					})
			}
		},
		mounted() {

		}
	}
</script>
