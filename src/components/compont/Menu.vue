<template>
	<el-dropdown style="float: right;margin-left: 60px;line-height: 100px;">
		<el-button type="primary" style="background-color: #16395a">
			友情链接<i class="el-icon-arrow-down el-icon--right"></i>
		</el-button>
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item><a href="https://binaryify.github.io/NeteaseCloudMusicApi/#/" target="_blank">网易云API官网</a></el-dropdown-item>
			<el-dropdown-item><a href="https://element.eleme.cn/#/zh-CN" target="_blank">Element组件库</a></el-dropdown-item>
			<el-dropdown-item><a href="https://cn.vuejs.org/v2/guide/index.html" target="_blank">Vue官方文档</a></el-dropdown-item>
		</el-dropdown-menu>
	</el-dropdown>
</template>

<style>
	.el-dropdown {
		vertical-align: top;
	}

	.el-dropdown+.el-dropdown {
		margin-left: 15px;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}
</style>

<script>
	export default {
		methods: {
			handleClick() {
				alert('button click');
			}
		}
	}
</script>
