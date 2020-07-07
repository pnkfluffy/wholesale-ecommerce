import * as React from "react";
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import defaultMessages from 'ra-language-english';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import createAdminStore from './createAdminStore';
// import messages from './i18n';
import jsonServerProvider from 'ra-data-json-server';

import { UserList} from './MenuItems/Users';
import { PostList, PostEdit, PostCreate} from './MenuItems/Posts';
import Dashboard from './MenuItems/Dashboard';
import createHistory from 'history/createBrowserHistory';

import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com/");
//const authProvider = () => Promise.resolve();
// const i18nProvider = polyglotI18nProvider(locale => {
//     if (locale !== 'en') {
//         return messages[locale];
//     }
//     return defaultMessages;
// });

const history = createHashHistory();


const AdminSetup = () =>( 
<Provider
        store={createAdminStore({
          //  authProvider,
            dataProvider,
            history,
        })}
    >
        <Admin
          //  authProvider={authProvider}
            dataProvider={dataProvider}
            history={history}
            title="My Admin"
        >
  <Resource name="users" list={UserList} icon={UserIcon}/>
  <Resource name="posts" list={PostList} edit={PostEdit}  create={PostCreate} icon={PostIcon}/>
  </Admin>
  </Provider>
    );

export default AdminSetup;