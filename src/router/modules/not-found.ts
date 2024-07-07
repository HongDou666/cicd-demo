export default {
  name: 'NotFound',
  path: '/NotFound',
  component: () => import(/* webpackChunkName: "NotFound" */ '@/pages/NotFound/index.vue'),
  meta: {
    name: '404页面'
  },
  children: []
}
