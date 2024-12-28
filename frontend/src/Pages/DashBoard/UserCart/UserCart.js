import React from 'react'

const UserCart = ({datas}) => {
  return (
    <div className='user'>
      
      <h3>Full Name: {datas.firstName} {datas.lastName}</h3>
      <p>Email: {datas.email}</p>
      <p>Username: {datas.username}</p>
      <p>User Role : {datas.role}</p>
      {datas.isAdmin ? <p>Admin: Yes</p> : <p>Admin: No</p>}
      {datas.isVerified ? <p>Verified: Yes</p> : <p>Verified: No</p>}
    </div>
  )
}

export default UserCart
