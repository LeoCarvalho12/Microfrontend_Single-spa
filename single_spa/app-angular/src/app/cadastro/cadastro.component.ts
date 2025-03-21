import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthServiceService } from "../auth-service.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-cadastro",
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="cadastro-container">
      <h2>Cadastro</h2>
      <form (ngSubmit)="cadastrar()">
        <div>
          <label for="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            [(ngModel)]="nome"
            name="nome"
            required
          />
        </div>
        <div>
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            [(ngModel)]="email"
            name="email"
            required
          />
        </div>
        <div>
          <label for="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            [(ngModel)]="senha"
            name="senha"
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <p *ngIf="sucessMessage" class="sucess-message">{{ sucessMessage }}</p>
      <p *ngIf="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p class="link-login">
        Já possui conta? <a routerLink="/login">Fazer Login</a>
      </p>
    </div>
  `,
  styles: [
    `
      .cadastro-container {
        width: 400px;
        margin: 50px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .cadastro-container h2 {
        text-align: center;
        margin-bottom: 20px;
        font-family: Arial, sans-serif;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }

      form label {
        width: 120px; 
        margin-right: 10px;  
        font-weight: bold;
        font-family: Arial, sans-serif;
        text-align: right;
      }

      form input {
        flex: 1;             
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
        font-family: Arial, sans-serif;
      }

      button {
        padding: 10px;
        font-size: 16px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        font-family: Arial, sans-serif;
      }

      button:hover {
        background-color: #0056b3;
      }

      .error-message {
        margin-top: 15px;
        color: red;
        text-align: center;
        font-family: Arial, sans-serif;
      }

      .sucess-message {
        margin-top: 15px;
        color: green;
        text-align: center;
        font-family: Arial, sans-serif;
      }

      .link-login {
        text-align: center;
        margin-top: 15px;
        font-family: Arial, sans-serif;
      }

      .link-login a {
        color: #007bff;
        text-decoration: none;
      }

      .link-login a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class CadastroComponent {
  nome = "";
  email = "";
  senha = "";
  errorMessage = "";
  sucessMessage = "";

  constructor(
    @Inject(AuthServiceService) private authService: AuthServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  cadastrar() { 
    this.errorMessage = "";
    this.sucessMessage = "";

    this.authService
      .cadastrar({ nome: this.nome, email: this.email, senha: this.senha })
      .subscribe({
        next: (response: any) => {
          console.log("Resposta do servidor:", response);
          if (response && response.token && response.user) {
            this.toastr.success("Cadastro realizado com sucesso!");
            this.sucessMessage = "Cadastro realizado com sucesso!";
            this.router.navigate(["/login"]);
          } else {
            this.toastr.warning("Cadastro pode ter falhado, resposta inesperada do servidor.");
            this.errorMessage = "O servidor retornou uma resposta inesperada.";
          }
        },
        error: (error: any) => {
          console.error("Erro no cadastro:", error);
          this.errorMessage = "Erro no cadastro. Tente novamente!";
          this.toastr.error("Erro no cadastro. Tente novamente!");
        },
      });
  }


}
