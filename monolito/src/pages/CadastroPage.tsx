import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../components/styles/Cadastro.module.css"; 

const CadastroPage = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cadastrado, setCadastrado] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/auth/register", {
        nome,
        email,
        senha,
      });
      setCadastrado(true);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar. Tente novamente.");
    }
  };

  if (cadastrado) {
    return (
      <div className={styles.container}>
        <h2 className={styles.successMessage}>Cadastro realizado com sucesso!</h2>
        <Link to="/login" className={styles.loginLink}>
          → Ir para Login
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Cadastro</h2>

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Cadastrar
        </button>

        <p className={styles.backLogin}>
          Já possui uma conta? <Link to="/login">Fazer login</Link>
        </p>
      </form>
    </div>
  );
};

export default CadastroPage;
