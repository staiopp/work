<template>
	<el-row>
		<el-col :span="8" v-for="(item, index) in imgList" :key="index" :offset="index > 0 ? 3 : 0">
			<el-card :body-style="{ padding: '0px' }">
				<img :src="item.picUrl" class="image">
				<div style="padding: 0;height: 78px; background-color: #E9EEF3;">
					<span style="word-wrap: break-word;font-size: 12px;">{{item.name}}</span>
					<div class="bottom clearfix">
					</div>
				</div>
			</el-card>
		</el-col>
	</el-row>
</template>

<style >
	.time {
		font-size: 13px;
		color: #999;
	}

	.bottom {
		margin-top: 13px;
		line-height: 12px;
		height: 20px;
	}

	.button {
		padding: 0;
		float: right;
	}

	.image {
		width: 100%;
		display: block;
	}
	.el-row{
		padding-top: 20px;
	}
	.el-col{
		width: 150px;
		height: 150px;
	}
	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}
</style>

<script>
	export default {
		data() {
			return {
				imgList:[]
			};
		},
		mounted() {
			this.axios.get("/apipersonalized?limit=4")
				.then((res) => {
					console.log(res.data.result)
					this.imgList = res.data.result
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}
</script>
