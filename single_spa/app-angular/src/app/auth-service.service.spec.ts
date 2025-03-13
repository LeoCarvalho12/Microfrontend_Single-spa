import { TestBed } from '@angular/core/testing';
import { AuthServiceService } from './auth-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthServiceService', () => {
  let service: AuthServiceService;
  let httpTestingController: HttpTestingController;
  const API_URL = 'http://localhost:4000/api'; // URL esperada

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthServiceService,
      ],
    });

    service = TestBed.inject(AuthServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Garante que nenhuma requisição pendente fique aberta
  });

  it('should call login with correct URL', () => {
    const mockResponse = { token: 'fake-token' };
    const email = 'test@example.com';
    const senha = '123456';

    service.login(email, senha).subscribe(response => {
      expect(response).toEqual(mockResponse); // Verifica a resposta simulada
    });

    const req = httpTestingController.expectOne(`${API_URL}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email, senha }); // Verifica se o body está correto

    req.flush(mockResponse); // Simula a resposta da API
  });

  it('should handle login error', () => {
    const email = 'test@example.com';
    const senha = 'wrongpassword';

    service.login(email, senha).subscribe({
      next: () => fail('Deveria ter retornado erro'),
      error: (error) => {
        expect(error.status).toBe(404);
      },
    });

    const req = httpTestingController.expectOne(`${API_URL}/login`);
    req.flush('Erro de login', { status: 404, statusText: 'Not Found' });
  });
});
