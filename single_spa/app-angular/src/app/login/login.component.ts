import { Component, OnInit, ChangeDetectorRef, Inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthServiceService } from "../auth-service.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
  <div class="login-container">
      <h2>Login</h2>
      <form (ngSubmit)="login()">
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            [(ngModel)]="email"
            name="email"
            [ngModelOptions]="{ standalone: true }"
            required
          />
        </div>
        <div class="form-group">
          <label for="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            [(ngModel)]="senha"
            name="senha"
            [ngModelOptions]="{ standalone: true }"
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p *ngIf="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p class="link-cadastro">
        Não possui conta? <a routerLink="/login/cadastro">Cadastre-se</a>
      </p>
    </div>
  `,
  styles: [
    `
      .login-container {
        width: 400px;
        margin: 50px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .login-container h2 {
        text-align: center;
        margin-bottom: 20px;
        font-family: Arial, sans-serif;
      }

      form {
        display: flex;
        flex-direction: column;
      }

      .form-group {
        display: flex;
        align-items: center;
        margin-bottom: 15px; /* Espaço entre cada grupo */
      }

      .form-group label {
        width: 120px;
        margin-right: 15px;
        font-weight: bold;
        font-family: Arial, sans-serif;
        text-align: right;
      }

      .form-group input {
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

      .link-cadastro {
        text-align: center;
        margin-top: 15px;
        font-family: Arial, sans-serif;
      }

      .link-cadastro a {
        color: #007bff;
        text-decoration: none;
      }

      .link-cadastro a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  email = "";
  senha = "";
  errorMessage = "";

  constructor(
    @Inject(AuthServiceService) private authService: AuthServiceService,
    private changeDetectorRef: ChangeDetectorRef,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.authService.login(this.email, this.senha).subscribe({
      next: (response: any) => {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.userId);
        window.history.pushState(null, "", "/product");
      },
      error: (error: any) => {
        console.error("Erro no login:", error);
        this.errorMessage = "Credenciais inválidas!";
        this.toastr.error("Erro no login. Verifique suas credenciais!", "Erro");
        this.changeDetectorRef.detectChanges();
      },
    });
  }
}
