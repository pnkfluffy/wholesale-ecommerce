import Cookies from 'universal-cookie'
import shajs from 'sha.js'

const cookie = new Cookies()

// let url = window.location.href
// let arr = url.split("/");
// const apiUrl = arr[0] + "//" + arr[2]

export default {
  // called when the user attempts to log in
  login: ({ username, password }) => {
    const request = new Request(`/api/admin-users/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
    return fetch(request).then(response => {
      if (response.status < 200 || response.status >= 300) {
        console.log('hi' + response.statusText)

        throw new Error(response.statusText)
      }
      window.location.href = '/'
      cookie.set('sig', response.data)
      return Promise.resolve()
    })
    // .catch(err => {
    //   // {!} SWAL ERROR MESSAGES
    //   return Promise.reject()
    // })
  },

  // called when the user clicks on the logout button
  logout: () => {
    const request = new Request(`/api/admin-users/logout`, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
    return fetch(request).then(response => {
      cookie.remove('sig')
      // window.location.href = '/admin'
      return Promise.resolve()
    })
  },

  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      cookie.remove('sig')
      return Promise.reject()
    }
    return Promise.resolve()
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return cookie.get('sig') ? Promise.resolve() : Promise.reject()
  },
  // called when the user navigates to a new location, to check for permissions / roles
  // getPermissions: () => {
  //   const request = new Request(`/api/admin-users/perms`, {
  //     method: 'GET'
  //   })
  //   return fetch(request)
  //     .then(response => {
  //       if (response.status < 200 || response.status >= 300) {
  //         console.log('hi' + response.statusText)

  //         throw new Error(response.statusText)
  //       }
  //       console.log("response", response.data)
  //       return Promise.resolve(response.data)
  //     })
  //     .catch(err => {
  //       // {!} SWAL ERROR MESSAGES
  //       return Promise.reject()
  //     })
  // }
  getPermissions: () => Promise.resolve()
}
