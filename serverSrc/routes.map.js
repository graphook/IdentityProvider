import path from 'path'

import bodyParser from 'body-parser';
import accessControlAllowOrigin from './middleware/accessControlAllowOrigin'
import requireLogin from './middleware/requireLogin'

import sendUi from './handlers/sendUi.handler.js'

const routes = [
  {
    method: 'get',
    path: '/v1/auth',
    handler: require('./handlers/auth/auth.handler')
  },
  {
    method: 'get',
    path: '/protected/postauth',
    middleware: [requireLogin],
    handler: require('./handlers/auth/postAuth.handler')
  },
  {
    method: 'post',
    path: '/protected/login',
    handler: require('./handlers/auth/login.handler')
  },
  {
    method: 'post',
    path: '/v1/token',
    handler: require('./handlers/token/token.handler')
  },




  {
    method: 'get',
    path: '/protected/user',
    middleware: [requireLogin],
    handler: require('./handlers/user/get.handler')
  },
  {
    method: 'post',
    path: '/protected/user',
    handler: require('./handlers/user/post.handler')
  },
  {
    method: 'put',
    path: '/protected/user/password',
    middleware: [requireLogin],
    handler: require('./handlers/user/updatePassword.handler')
  },
  {
    method: 'put',
    path: '/protected/user/email',
    middleware: [requireLogin],
    handler: require('./handlers/user/updateEmail.handler')
  },
  {
    method: 'delete',
    path: '/protected/user',
    middleware: [requireLogin],
    handler: require('./handlers/user/delete.handler')
  },
  {
    method: 'get',
    path: '/protected/client',
    middleware: [requireLogin],
    handler: require('./handlers/client/get.handler')
  },
  {
    method: 'get',
    path: '/protected/client/:id',
    middleware: [requireLogin],
    handler: require('./handlers/client/getOne.handler')
  },
  {
    method: 'post',
    path: '/protected/client',
    middleware: [requireLogin],
    handler: require('./handlers/client/post.handler')
  },
  {
    method: 'put',
    path: '/protected/client/:id',
    middleware: [requireLogin],
    handler: require('./handlers/client/put.handler')
  },
  {
    method: 'delete',
    path: '/protected/client',
    middleware: [requireLogin],
    handler: require('./handlers/client/delete.handler')
  },
  {
    method: 'get',
    path: '/ui/manage',
    handler: sendUi.bind(null, '../uiBuild/manage.html')
  },
  {
    method: 'get',
    path: '/ui/login',
    handler: sendUi.bind(null, '../uiBuild/login.html')
  }
]

export default routes;
