import Main from '@/components/main'
export const error_router = [{
  path: '/',
  meta: {
    hideInMenu: true
  },
  component: Main,
  children: [
    {
      path: '401',
      name: 'error_401',
      meta: {
        hideInMenu: true,
        title: '401',
      },
      component: () => import('@/view/error-page/401.vue')
    }
  ]
},
{
  path: '/',
  name: 'error_500',
  meta: {
    hideInMenu: true
  },
  component: Main,
  children: [
    {
      path: '500',
      name: 'error_500',
      meta: {
        hideInMenu: true,
        title: '500',
      },
      component: () => import('@/view/error-page/500.vue')
    }
  ]
}
]
