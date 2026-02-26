export interface ReceitaInterface {
  nome: string;
  descricao: string;
  tempoPreparo: number;
  porcoes: number;
  imagem_url?: string;
  tipoId: string;
  dificuldadeId: string;
  ingredientes: IngredienteForm[];
}

export interface IngredienteForm {
  ingredienteId: string;
  quantidade: number;
  unidade: string;
}
