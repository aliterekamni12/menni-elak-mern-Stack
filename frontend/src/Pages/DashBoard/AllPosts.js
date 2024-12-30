import React, { useContext } from 'react'
import ProjectIdContext from '../../context'
import PostCart from '../Posts/PostCart'
import UserPostsFD from '../Posts/UserPostsFD'

const AllPosts = () => {
    const{postData} = useContext(ProjectIdContext)
  return (

    <div className='everyPost'>
      {postData && postData.length !== 0? <>{postData && postData?.map((datas)=>(
        <div className='post-cart-2' key={datas?._id}>
            <UserPostsFD datas={datas} />
        </div>
      ))}</> : <h1>There is no post not accepted</h1>}
      
    </div>
  )
}

export default AllPosts
