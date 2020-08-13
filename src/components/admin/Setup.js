import * as React from 'react'
import { Provider } from 'react-redux'
import { createHashHistory, createBrowserHistory } from 'history'
import { Admin, Resource, fetchUtils } from 'react-admin'
import defaultMessages from 'ra-language-english'
import polyglotI18nProvider from 'ra-i18n-polyglot'
import createAdminStore from './createAdminStore'

import { UserList, UserEdit, UserShow, UserCreate } from './menuItems/Users'
import {
  ProductList,
  ProductShow,
  ProductEdit,
  ProductCreate
} from './menuItems/Products'
import { CustomList, CustomCreate, CustomShow } from "./menuItems/Customs"
import { OrderList, OrderShow, OrderEdit } from './menuItems/Orders'
import { ReviewList, ReviewShow } from './menuItems/Reviews'
import { CommissionList, CommissionShow } from './menuItems/Commission'
// import { PostList, PostEdit, PostCreate } from "./MenuItems/Posts";
import Dashboard from './menuItems/Dashboard'
import authProvider from './providers/authProvider'

import UserIcon from '@material-ui/icons/Group'
import ProductIcon from '@material-ui/icons/LocalFlorist'
import OrderIcon from '@material-ui/icons/AccountBalanceWallet'
import ReviewIcon from '@material-ui/icons/LibraryBooks'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'

import myDataProvider from './providers/myDataProvider'
const i18nProvider = polyglotI18nProvider(locale => {
  return defaultMessages
})

const history = createBrowserHistory()

const AdminSetup = () => (
  <Provider
    store={createAdminStore({
      authProvider,
      myDataProvider,
      history
    })}
  >
    <Admin
      authProvider={authProvider}
      dataProvider={myDataProvider}
      history={history}
      title='My Admin'
    >
      {permissions => [
        <Resource
          name='admin-users'
          options={{ label: 'Customers' }}
          list={UserList}
          edit={UserEdit}
          show={UserShow}
          create={UserCreate}
          icon={UserIcon}
        />,
        <Resource
          name='admin-products'
          options={{ label: 'Products' }}
          list={ProductList}
          edit={ProductEdit}
          show={ProductShow}
          create={ProductCreate}
          icon={ProductIcon}
        />,
        <Resource
          name='admin-orders'
          options={{ label: 'Orders' }}
          list={OrderList}
          show={OrderShow}
          edit={OrderEdit}
          icon={OrderIcon}
        />,
        <Resource 
          name="admin-customs"
          options={{label: "Custom Orders"}}
          list={CustomList}
          create={CustomCreate}
          show={CustomShow}
        />,
        <Resource
          name='admin-reviews'
          options={{ label: 'Reviews' }}
          list={ReviewList}
          show={ReviewShow}
          icon={ReviewIcon}
        />,
        <Resource
          name='admin-commissions'
          options={{ label: 'Commission' }}
          list={CommissionList}
          show={CommissionShow}
          icon={MonetizationOnIcon}
        />
      ]}
    </Admin>
  </Provider>
)

export default AdminSetup
