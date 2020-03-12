import React from 'react'


function Login(users) {

    return (
        <form action="/login" method="POST">
        <div>
            <input type="email" id="email" name="email" required>
        
        </div>
        <div>
            <input type="password" id="password" name="password" required>
        
        </div>
        
        </form>
            
        
    )
}

export default Login;