import React from 'react'

const Signup = () => {
  return (
    <div className='login'>
      
        <h1>Signup</h1>
        <form>
            <label htmlFor='username'>username: </label>
            <input name='username' id='username' type='text' onChange={(e)=>{setUsername(e.target.value)}} />
            <label htmlFor='password'>password: </label>
            <input name='password' id='password' type='password' onChange={(e)=>{setPassword(e.target.value)}} />
            
            <input id='submit' type='submit' onClick={handleSubmit}/>
            {response.length !== 0 ? <p>{response.message} </p> : <></>}
        </form>
       
        
        
      
    </div>
  )
}

export default Signup
