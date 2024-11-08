import React, { useState } from 'react';
import "../App.js"
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function registerUser(email, username) {
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, username })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log(data.message); // Başarılı mesajı
      } else {
        console.error(data.message); // Hata mesajı
      }
    } catch (error) {
      console.error("Kullanıcı kaydedilirken bir hata oluştu:", error);
    }
  }
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
        <div className="d-flex justify-content-center mt-3">
        <Button label="Giriş"   style={{width:"60%"}} onClick={() => registerUser(username, password)} />
        </div>
        
      </div>
    </div>

  );
}

export default Register;
