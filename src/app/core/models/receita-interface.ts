export interface ReceitaInterface {
  nome: string;
  descricao: string;
  tempoPreparo: number;
  porcoes: number;
  tipoId: string;
  dificuldadeId: string;
  ingredientes: [
    {
      ingredienteId: string;
      quantidade: number;
      unidade: string;
    },
  ];
}
