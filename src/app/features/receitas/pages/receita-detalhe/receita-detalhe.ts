import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupabaseClientService } from '../../../../core/supabase.client';
import { ReceitaInterface } from '../../../../core/models/receita-interface';
import {

  MatCardModule,
} from '@angular/material/card';

@Component({
  selector: 'app-receita-detalhe',
  standalone: true,
  templateUrl: './receita-detalhe.html',
  imports: [MatCardModule],
})
export class ReceitaDetalheComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private supabase = inject(SupabaseClientService).client;

  receita = signal<ReceitaInterface | null>(null);
  loading = signal(true);

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    const { data, error } = await this.supabase
      .from('receitas')
      .select(
        `
    *,
    tipos!receitas_tipo_id_fkey(nome),
    dificuldades!receitas_dificuldade_id_fkey(nome),
    receita_ingredientes(
      quantidade,
      unidade,
      ingredientes(nome)
    )
  `,
      )
      .eq('id', id)
      .single();

    if (error) {
      console.error(error);
    } else {
      this.receita.set(data);
    }

    this.loading.set(false);
  }
}
