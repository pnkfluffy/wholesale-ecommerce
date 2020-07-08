import * as React from "react";
import { Provider } from "react-redux";
import { createHashHistory } from "history";
import { simpleClient, Admin, Resource } from "react-admin";
import restProvider from "ra-data-simple-rest";
import defaultMessages from "ra-language-english";
import polyglotI18nProvider from "ra-i18n-polyglot";

import createAdminStore from "./createAdminStore";
import jsonServerProvider from "ra-data-json-server";

import { UserList } from "./MenuItems/Users";
import { PostList, PostEdit, PostCreate } from "./MenuItems/Posts";
import Dashboard from "./MenuItems/Dashboard";
import authProvider from './authProvider';
import createHistory from "history/createBrowserHistory";

import PostIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";

const dataProvider = jsonServerProvider("http://localhost:5000");
// const authProvider = () => Promise.resolve();
const i18nProvider = polyglotI18nProvider((locale) => {
  return defaultMessages;
});

const history = createHashHistory();

const AdminSetup = () => (
  <Provider
    store={createAdminStore({
      authProvider,
      dataProvider,
      history,
    })}
  >
    <Admin
      authProvider={authProvider}
      restClient={simpleClient("http://localhost:5000")}
      //dataProvider={dataProvider}
      history={history}
      title="My Admin"
    >
      <Resource name="users" list={UserList} icon={UserIcon} />
      <Resource
        name="posts"
        list={PostList}
        edit={PostEdit}
        create={PostCreate}
        icon={PostIcon}
      />
    </Admin>
  </Provider>
);

export default AdminSetup;
