import * as React from "react";
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { UserList } from './MenuItems/Users';
import { PostList, PostEdit, PostCreate } from './MenuItems/Posts';
import Dashboard from './MenuItems/Dashboard';
import authProvider from './authProvider';
import createHistory from 'history/createBrowserHistory';

import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';

const history = createHistory();

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const AdminSetup = () => (
  <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider} history={history}>
    <Resource name="users" list={UserList} icon={UserIcon} />
    <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
  </Admin>
);

export default AdminSetup;