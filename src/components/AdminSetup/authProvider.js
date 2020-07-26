import Cookies from 'universal-cookie'

const cookie = new Cookies()
const apiUrl = "http://localhost:5000";

export default {
  // called when the user attempts to log in
  login: ({ username, password }) => {
    const request = new Request(`${apiUrl}/admin-users/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        cookie.set('sig', response.data)
        return Promise.resolve();
      })
  },

  // called when the user clicks on the logout button
  logout: () => {
    const request = new Request(`${apiUrl}/admin-users/logout`, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    return fetch(request)
      .then(response => {
        cookie.remove("sig");
        return Promise.resolve();
      })
  },

  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      cookie.remove("sig");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    console.log(cookie.get("sig"));
    
    return cookie.get("sig")
      ? Promise.resolve()
      : Promise.reject();
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
};
