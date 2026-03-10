export interface ReceitaInterface {
  // ===== colunas da tabela receitas =====
  id: string;
  nome: string;
  descricao: string;
  tempo_preparo: number;
  porcoes: number;
  imagem_url?: string;
  modo_preparo: string;

  tipo_id: string;
  dificuldade_id: string;

  // ===== relacionamento (JOIN) =====
  tipos?: {
    id: number;
    nome: string;
  };

  dificuldades?: {
    id: number;
    nome: string;
  };

  // ===== usado só no frontend =====
  ingredientes?: IngredienteForm[];
  receita_ingredientes?: ReceitaIngredienteDetalhe[];
}

export interface ReceitaFormModel {
  nome: string;
  descricao: string;
  tempo_preparo: number;
  porcoes: number;
  imagem_url?: string;
  modo_preparo: string;
  tipo_id: string;
  dificuldade_id: string;
  ingredientes: IngredienteForm[];
}

export interface IngredienteForm {
  ingrediente_id: string;
  quantidade: number;
  unidade: string;
}
export interface ReceitaIngredienteDetalhe {
  quantidade: number | null;
  unidade: string | null;
  ingredientes: {
    nome: string;
  };
}
