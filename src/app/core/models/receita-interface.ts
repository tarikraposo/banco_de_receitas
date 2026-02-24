export interface ReceitaInterface {
  nome: string;
  descricao: string;
  tempoPreparo: number;
  porcoes: number;
  tipoId: string;
  dificuldadeId: string;
  ingredientes: IngredienteForm[];
}

export interface IngredienteForm {
  ingredienteId: string;
  quantidade: number;
  unidade: string;
}
