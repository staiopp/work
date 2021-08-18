<template>
	<div class="Leaderboard">
		<i class="el-icon-back" style="font-size: 20px; color: ghostwhite;float: left;" @click="fanhui"></i>
		<br />
		<div class="ph-head">
			<div style="border: 2px solid pink; width: 150px; height: 150px; float: left; margin-top: 20px;margin-right: 45px;margin-bottom: 90px;"
			 v-for="(item,index) in paiHangList">
				<img :src="item.coverImgUrl" style="width: 100%; height: 100%px;" @click="gedan(index)" />
				<div style="color: #00FFFF;font-size: 14px;text-align-last: start;">{{item.name}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		mounted() {
			// console.log("$route")
			// console.log(this.$route)
			// console.log("$route")
			this.paiHangList = this.$route.params.phList
		},
		data(){
			return {
				paiHangList : [],
				difList : [],
				imgUrl : [],
				numtype : 1
			}
		},
		methods:{
			fanhui:function(){
				this.$router.go(-2)
			},
			gedan: function(index) {
				// console.log(index)
				this.$router.push({
					name: 'Five',
					params: {
						gedanName: this.paiHangList[index].name,
						gedanImg: this.paiHangList[index].coverImgUrl,
						gedanId: this.paiHangList[index].id,
						type : this.numtype
					}
				})
			}
		}

	}
</script>

<style>
	.Leaderboard{
		/* border: 1px solid pink; */
		width: 1015px;
		height: 800px;
	}
	.ph-head{
		width: 1000px;
		height: 200px;
		float: left;
		margin-left: 20px;
		margin-bottom: 23px;
		/* border: 1px solid pink; */
	}
	.ph-img{
		width: 150px;
		height: 150px;
		border: 1px solid pink;
		float: left;
	}
	.ph-title{
		float: left;
		font-size: 22px;
		color: ghostwhite;
		margin-left: 50px;
		line-height: 25px;
	}
	.el-table td,
	.el-table th {

	}
</style>
