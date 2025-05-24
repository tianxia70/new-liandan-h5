import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'index',
		component: () => import('@/pages/tab-bar/index.vue'),
		redirect: '/home',
		children: [
			{
				path: '/home',
				name: 'home',
				component: () => import('@/pages/tab-bar/home.vue')
			},
			{
				path: '/invite',
				name: 'invite',
				component: () => import('@/pages/tab-bar/invite.vue')
			},
			{
				path: '/start',
				name: 'start',
				component: () => import('@/pages/tab-bar/start.vue')
			},
			{
				path: '/me',
				name: 'me',
				component: () => import('@/pages/tab-bar/my.vue')
			},
			{
				path: '/task',
				name: 'task',
				component: () => import('@/pages/tab-bar/task.vue')
			}
		]
	},
	{
			path: '/welcome',
			name: 'welcome',
			meta: { noAuth: true },
			component: () => import('@/pages/login-register/welcome.vue')
	},
	{
			path: '/login',
			name: 'login',
			meta: { noAuth: true },
			component: () => import('@/pages/login-register/login.vue')
	},
	{
			path: '/register',
			name: 'register',
			meta: { noAuth: true },
			component: () => import('@/pages/login-register/register.vue')
	},
	{
			path: '/language',
			name: 'language',
			component: () => import('@/pages/language/index.vue')
	},
	{
			path: '/vipLevel',
			name: 'vipLevel',
			component: () => import('@/pages/vip/level.vue')
	},
	{
			path: '/notifiy',
			name: 'notifiy',
			component: () => import('@/pages/notifications/list.vue')
	},
	{
			path: '/notifiyDetail',		// 消息
			name: 'notifiyDetail',
			component: () => import('@/pages/notifications/detail.vue')
	},
	{
		path: '/transactionRecord',		// 资金记录
		name: 'transactionRecord',
		component: () => import('@/pages/transaction/record.vue')
	},
	{
		path: '/userInfo',		// 用户
		name: 'userInfo',
		component: () => import('@/pages/userInfo/index.vue')
	},
	{
		path: '/authEdit',		// 身份认证
		name: 'authEdit',
		component: () => import('@/pages/userInfo/authEdit.vue')
	},
	{
		path: '/changePassword',		// 修改密码
		name: 'changePassword',
		component: () => import('@/pages/password/changePassword.vue')
	},
	{
		path: '/changeTransPassword',		// 修改资金密码
		name: 'changeTransPassword',
		component: () => import('@/pages/password/changeTransPassword.vue')
	},
	{
		path: '/customerService',		// 修改资金密码
		name: 'customerService',
		component: () => import('@/pages/customerService/index.vue')
	},
	{
		path: '/recharge',		// 充值
		name: 'recharge',
		component: () => import('@/pages/recharge-withdraw/recharge.vue')
	},
	{
		path: '/withdraw',		// 提现
		name: 'withdraw',
		component: () => import('@/pages/recharge-withdraw/withdraw.vue')
	},
	{
		path: '/submitCompleted',		// 提交成功
		name: 'submitCompleted',
		component: () => import('@/pages/recharge-withdraw/completed.vue')
	},
	{
		path: '/account',		// 账户
		name: 'account',
		component: () => import('@/pages/account/list.vue')
	},
	{
		path: '/bindAccount',		// 添加账户
		name: 'bindAccount',
		component: () => import('@/pages/account/bindAccount.vue')
	},
	{
		path: '/webpage',		// 富文本等内容
		name: 'webpage',
		component: () => import('@/pages/webpage/index.vue')
	},
	
	
]

// 如果是正常H5则使用hash模式，app内则使用history模式
let webHistory = createWebHistory
if (typeof window !== 'undefined' && window.location && window.location.hostname) {
	webHistory = createWebHashHistory
}
const router = createRouter({
	history: webHistory(),
	routes
})

export default router