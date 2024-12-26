import React from 'react'

const UserCart = ({datas}) => {
  return (
    <div className='user'>
      <h3>Full Name: {datas.firstName} {datas.lastName}</h3>
      <p>Email: {datas.email}</p>
      <p>Username: {datas.username}</p>
      {datas.isAdmin ? <p>Admin: Yes</p> : <p>Admin: No</p>}
      {datas.isVerified ? <p>Admin: Yes</p> : <p>Admin: No</p>}
    </div>
  )
}

export default UserCart
