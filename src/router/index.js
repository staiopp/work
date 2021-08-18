import Vue from 'vue'
import VueRouter from 'vue-router'
import One from '../views/One.vue'
import Two from '../views/Two.vue'
import Three from '../views/Three.vue'
import Four from '../views/Four.vue'
import Five from '../views/Five.vue'
import Six from '../views/Six.vue'
import mvPlay from '../playviews/MvPlay.vue'
import msInfo from '../views/muiscInfo.vue'
import jieShao from '../views/jieShao.vue'
import jieShao2 from '../views/jieShao2.vue'
 
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const routes = [{
		path: '/',
		name: 'Home',
		component: One
	},
	{
		path: '/one',
		name: 'One',
		component: One
	},
	{
		path: '/two',
		name: 'Two',
		component: Two
	},
	{
		path: '/three/:list',
		name: 'Three',
		component: Three
	},
	{
		path: '/four/:nList',
		name: 'Four',
		component: Four
	},
	{
		path: '/five/:gedanName/:type',
		name: 'Five',
		component: Five
	},
	{
		path: '/six/',
		name: 'Six',
		component: Six
	},
	{
		path: '/six/mvplay',
		name: 'mvPlay',
		component: mvPlay
	},
	{
		path: 'musicInfo',
		name: 'Info',
		component: msInfo,
		children : [
			{
				path: 'jieshao',
				component: jieShao
			},
			{
				path: 'jieshao2',
				component: jieShao2
			}
		]
	}
]

const router = new VueRouter({
	mode: 'hash',
	routes
})


export default router
