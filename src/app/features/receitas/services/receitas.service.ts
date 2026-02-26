import { inject, Injectable, signal } from '@angular/core';
import { SupabaseClientService } from '../../../core/supabase.client';

@Injectable({
  providedIn: 'root',
})
export class ReceitasService {
  private supabaseService = inject(SupabaseClientService);
  ingredientesDisponiveis = signal<{ id: string; nome: string }[]>([]);

  async listar() {
    const { data, error } = await this.supabaseService.client.from('receitas').select('*');

    if (error) throw error;

    return data;
  }
  
  async carregarIngredientes() {
    const { data, error } = await this.supabaseService.client
      .from('ingredientes')
      .select('id, nome')
      .order('nome');

    if (error) {
      console.error('Erro ao carregar ingredientes', error);
      return;
    }

    this.ingredientesDisponiveis.set(data ?? []);
    console.log(data)
  }
}
