// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const userNavConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: getIcon('eva:pie-chart-2-fill'),
  // },
  {
    title: 'projects',
    path: '/dashboard/user-projects',
    icon: getIcon('ant-design:project-filled'),
  },
  {
    title: 'requests',
    path: '/dashboard/user-requests',
    icon: getIcon('fluent:document-question-mark-24-filled'),
  },

];
const adminNavConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: getIcon('eva:pie-chart-2-fill'),
  // },
  {
    title: 'users',
    path: '/dashboard/users',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'projects',
    path: '/dashboard/projects',
    icon: getIcon('ant-design:project-filled'),
  },
  {
    title: 'reports',
    path: '/dashboard/reports',
    icon: getIcon('bxs:report'),
  },

  {
    title: 'requests',
    path: '/dashboard/requests',
    icon: getIcon('fluent:document-question-mark-24-filled'),
  },

  {
    title: 'contact-messages',
    path: '/dashboard/contact-messages',
    icon: getIcon('fluent:chat-mail-20-filled'),
  },
  {
    title: 'testimonials',
    path: '/dashboard/testimonials',
    icon: getIcon('ic:baseline-reviews'),
  },
  {
    title: 'products',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'blogs',
    path: '/dashboard/blogs',
    icon: getIcon('fa6-brands:blogger'),
  },
];

export {userNavConfig, adminNavConfig};
