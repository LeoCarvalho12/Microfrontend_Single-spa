import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styles from "./styles/Login.module.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/auth/login", {
        email,
        senha: password,
      });

      if (response.data?.userId) {
        localStorage.setItem("userId", response.data.userId);
        alert("Login realizado com sucesso!");
        navigate("/products");
      } else {
        alert("Credenciais inválidas!");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Erro ao fazer login.");
    }
  };

  return (
    <div className={styles["login-container"]}>
      <form onSubmit={handleLogin} className={styles["login-form"]}>
        <h2 className={styles["login-title"]}>Login</h2>

        <div className={styles["form-group"]}>
          <label className={styles["form-label"]}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles["form-input"]}
          />
        </div>

        <div className={styles["form-group"]}>
          <label className={styles["form-label"]}>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles["form-input"]}
          />
        </div>

        <button type="submit" className={styles["login-button"]}>
          Entrar
        </button>

        <p className={styles["register-link"]}>
          Ainda não tem uma conta?{" "}
          <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
