export interface CartItem {
  produto_id: number;
  produto: {
    id: number;
    nome: string;
    preco: number;
  };
  quantidade: number;
}