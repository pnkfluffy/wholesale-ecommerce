// let url = window.location.href
// let arr = url.split("/");
// const apiUrl = arr[0] + "//" + arr[2]

export default {
  // called when the user attempts to log in
  login: ({ username, password }) => {
    console.log('attempt')
    const request = new Request(`/api/admin-users/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
    return fetch(request).then(async response => {
      console.log('res', response)
      if (response.status < 200 || response.status >= 300) {
        console.log('hi' + response.statusText)

        throw new Error(response.statusText)
      }
      let res = await response.json()
      console.log('nao', res.sig, res.perms)
      localStorage.setItem('sig', res.sig)
      localStorage.setItem('perms', res.perms)
      window.location.href = '/'
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
      localStorage.removeItem('sig')
      localStorage.removeItem('perms')

      // window.location.href = '/admin'
      return Promise.resolve()
    })
  },

  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('sig')
      localStorage.removeItem('perms')

      return Promise.reject()
    }
    return Promise.resolve()
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem('sig') ? Promise.resolve() : Promise.reject()
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => {
    let role = localStorage.getItem('perms')
    return role ? Promise.resolve(role) : Promise.reject()
  }
}
