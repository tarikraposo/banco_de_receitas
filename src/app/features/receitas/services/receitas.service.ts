import { inject, Injectable } from '@angular/core';
import { SupabaseClientService } from '../../../core/supabase.client';

@Injectable({
  providedIn: 'root',
})
export class ReceitasService {
  private supabaseService = inject(SupabaseClientService);

  async listar() {
    const { data, error } = await this.supabaseService.client.from('receitas').select('*');

    if (error) throw error;

    return data;
  }
  async testarConexao() {
    const { data, error } = await this.supabaseService.client
      .from('ingredientes')
      .select('*')
      .limit(5);

    if (error) {
      console.error('Erro Supabase:', error);
      return;
    }

    console.log('Ingredientes:', data);
  }
}
