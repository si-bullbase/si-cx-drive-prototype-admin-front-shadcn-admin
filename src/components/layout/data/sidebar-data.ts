import {
  IconLayoutDashboard,
  IconSearch,
} from '@tabler/icons-react'

import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Bullet Group',
    email: 'bltinc@bltinc.co.jp',
    avatar: '/images/logo.svg',
  },
  
  navGroups: [
    {
      title: 'general',
      items: [
        {
          title: 'ダッシュボード',
          url: '/',
          icon: IconLayoutDashboard,
        },
        {
          title: 'SNSサジェスト',
          url: '/suggests',
          icon: IconSearch,
        },
      
      ],
    },
  ],
}
