import {
  createRouter as _createRouter,
  createWebHashHistory,
  type RouteRecordRaw
} from 'vue-router'

export enum RN {
  PageAuth = 'PageAuth',
  PageIndexing = 'PageIndexing'
}

const getRoutes = (): RouteRecordRaw[] => [
  {
    path: '/',
    redirect: { name: RN.PageAuth }
  },
  {
    path: '/auth',
    name: RN.PageAuth,
    component: () => import('./pages/PageAuth.vue'),
    meta: {
      title: 'Auth'
    }
  },
  {
    path: '/indexing',
    name: RN.PageIndexing,
    component: () => import('./pages/PageIndexing.vue'),
    meta: {
      title: 'Indexing'
    }
  }
]

export function createRouter() {
  return _createRouter({
    routes: getRoutes(),
    history: createWebHashHistory()
  })
}
