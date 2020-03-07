import * as React from 'react';

const Home = React.lazy(() => import('./Home'));
const Chat = React.lazy(() => import('./Chat'));
const Match = React.lazy(() => import('./match/Match'));
const Auth = React.lazy(() => import('./auth/Auth'));
const Events = React.lazy(() => import('./important/events/Events'));
const Notices = React.lazy(() => import('./important/notices/Notices'));
const Center = React.lazy(() => import('./center/Center'));
const Magazine = React.lazy(() => import('./magazine/Magazine'));
const Trash = React.lazy(() => import('./trash/Trash'));
const Rooms = React.lazy(() => import('./rooms/Rooms'));
const Cyphers = React.lazy(() => import('./cyphers/Cyphers'));
const Youtuber = React.lazy(() => import('./youtuber/Youtuber'));
const Admin = React.lazy(() => import('./admin/Admin'));
const MyPage = React.lazy(() => import('./mypage/MyPage'));
const Trade = React.lazy(() => import('./trade/Trade'));
const Privacy = React.lazy(() => import('./Privacy'));
const Community = React.lazy(() => import('./community/Community'));
const Contact = React.lazy(() => import('./Contact'));

export {
  Home,
  Chat,
  Match,
  Auth,
  Trash,
  Rooms,
  Events,
  Notices,
  Center,
  Cyphers,
  Admin,
  Magazine,
  Youtuber,
  MyPage,
  Trade,
  Privacy,
  Community,
  Contact
};
