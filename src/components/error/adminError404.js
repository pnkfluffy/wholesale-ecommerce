import React from 'react'
import { Link } from 'react-router-dom'

const PageError = () => {
  return (
    <div>
      <div>
        OOPS!
        <div>MAKE SURE YOU ARE ON ROUTE 5000</div>
        <div>You are logged in as Admin</div>
        <div>Continue to the Admin route to do activities or log out</div>
        <Link to='/admin'>GO TO ADMIN</Link>
      </div>
    </div>
  )
}

export default PageError
