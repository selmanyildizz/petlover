import React, { useState } from 'react';
import "../App.js"
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="b-image">
      <div className="login-form">
        {/* Kullanıcı Adı */}
        <h4 className='text-center'>Pet Lover</h4>
        <FloatLabel className="mt-3 " >
          <InputText style={{width:"80%"}} value={username} onChange={(e) => setUsername(e.target.value)} />
          <label htmlFor="username">Kullanıcı Adı</label>
        </FloatLabel>



        {/* Şifre */}
        <FloatLabel className="mt-4">
          <InputText style={{width:"80%"}} value={password} onChange={(e) => setPassword(e.target.value)} toggleMask />
          <label htmlFor="password">Şifre</label>
        </FloatLabel>

        {/* Giriş Butonu */}
        <Button label="Giriş" className="mt-3" style={{width:"60%"}} onClick={() => console.log('Login yapıldı')} />
      </div>
    </div>

  );
}

export default Login;
