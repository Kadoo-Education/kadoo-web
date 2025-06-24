import './globals.css';

export default function LoginPage() {
  return (
    <div>
      <div className="top-logo">
        <img src="/logo.png" alt="Logo Kadoo" className="logo" />
        <p>Education</p>
      </div>

      <div className="login-container">
      <div className="login-header">
        <div className="background-shapes">
          <img src="/Vector.png" className="vector" />
          <img src="/Vector (1).png" className="vector1" />
          <img src="/Vector (2).png" className="vector2" />
          <img src="/Vector (3).png" className="vector3" />
          <img src="/Vector (4).png" className="vector4" />
          <img src="/Vector (5).png" className="vector5" />
          <img src="/Vector (6).png" className="vector6" />
          <img src="/Group 4.png" className="group4" />
          <img src="/Group 6.png" className="group6" />
          <img src="/Group 7.png" className="group7" />
          <img src="/Group 8.png" className="group8" />
          <img src="/Group 9.png" className="group9" />
    
        </div>
        <h1>Bem vindo!</h1>
        <div className="linha" />
        <p>Você ainda não conhece a Kadoo?<br />Venha conhecer agora!</p>
        <button className="btn-info">Leia mais!</button>
      </div>

      <div className="login-right">
        <h2>Faça seu login</h2>
        <form className="login-form">
          <label>Email</label>
          <input type="email" placeholder="Escreva aqui" />
          <label>Senha</label>
          <input type="password" placeholder="Escreva aqui" />
          <button type="submit" className="btn-login">Login</button>
        </form>
        <p className="register-text">
          Ainda não possui uma conta? <a href="#">Cadastre-se!</a>
        </p>
      </div>
      </div>

    </div>
    
  );
}
