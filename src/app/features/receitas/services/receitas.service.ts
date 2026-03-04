import { inject, Injectable, signal } from '@angular/core';
import { SupabaseClientService } from '../../../core/supabase.client';

@Injectable({
  providedIn: 'root',
})
export class ReceitasService {
  private supabaseService = inject(SupabaseClientService).client;
  ingredientesDisponiveis = signal<{ id: string; nome: string }[]>([]);

  async listarReceitasCompletas() {
    const { data, error } = await this.supabaseService
      .from('receitas')
      .select(
        `
      id,
      nome,
      descricao,
      imagem_url,
      tempo_preparo,
      porcoes,
      tipos(nome),
      dificuldades(nome),
      receita_ingredientes(
        quantidade,
        unidade,
        ingredientes(nome)
      )
    `,
      )
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data;
  }

  async carregarIngredientes() {
    const { data, error } = await this.supabaseService
      .from('ingredientes')
      .select('id, nome')
      .order('nome');

    if (error) {
      console.error('Erro ao carregar ingredientes', error);
      return;
    }

    this.ingredientesDisponiveis.set(data ?? []);
  }

  async buscarTipos() {
    const { data, error } = await this.supabaseService
      .from('tipos')
      .select('id, nome')
      .order('nome');

    if (error) throw error;

    return data;
  }

  async buscarDificuldades() {
    const { data, error } = await this.supabaseService
      .from('dificuldades')
      .select('id, nome')
      .order('nome');

    if (error) throw error;

    return data;
  }
}
