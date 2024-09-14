import React from 'react'

const Project = ({datas}) => {
  return (
    <div className='project-card'>
        <img src={datas.image} />
        <p>Title: {datas.name}</p>
        <p>Description: {datas.description}</p>
        
        {datas.isAchieved? <p>Thanks For All for the donations. we achieved our goal that is to reached {datas.goal}</p>:
        <>
        <p>The Goal: {datas.goal}$</p>
        <p>The Total donations :{datas.total}$</p>
        </>
        
        }
      </div>
  )
}

export default Project
