<template>
	<div class="login" style="height: 100px;">
		<el-avatar> 登录 </el-avatar>
		<p class="userName">{{ username }}</p>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				username : "游客"
			}
		}
	}
</script>

<style scoped>
	.login {
		float: right;
		line-height: 125px;
		margin-left: 30px;
	}
	.userName{
		color: #00FFFF;
		float: right;
		line-height: 100px;
		margin-left: 5px;
	}
</style>
