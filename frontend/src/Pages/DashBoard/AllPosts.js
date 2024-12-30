import React, { useContext } from 'react'
import ProjectIdContext from '../../context'
import PostCart from '../Posts/PostCart'

const AllPosts = () => {
    const{postData} = useContext(ProjectIdContext)
  return (
    <div>
      {postData && postData?.map((datas)=>(
        <div className='post-cart-1' key={datas?._id}>
            <PostCart datas={datas} />
        </div>
      ))}
    </div>
  )
}

export default AllPosts
