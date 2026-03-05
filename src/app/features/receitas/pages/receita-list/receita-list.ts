import { Component, computed, inject, signal } from '@angular/core';
import { ReceitasService } from '../../services/receitas.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReceitaCard } from '../../components/receita-card/receita-card';
import { MatFormField, MatFormFieldControl, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReceitaInterface } from '../../../../core/models/receita-interface';
import { SupabaseClientService } from '../../../../core/supabase.client';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-receita-list',
  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    ReceitaCard,
    MatFormField,
    MatLabel,
    MatProgressSpinnerModule,
    MatInputModule,
  ],
  templateUrl: './receita-list.html',
  styleUrl: './receita-list.scss',
})
export class ReceitaList {
  supabase = inject(SupabaseClientService).client;

  receitas = signal<ReceitaInterface[]>([]);
  filtro = signal('');
  loading = signal(true);
  receitasFiltradas = computed(() => {
    const termo = this.filtro().toLowerCase();

    return this.receitas().filter((r) => r.nome.toLowerCase().includes(termo));
  });

  async ngOnInit() {
    await this.carregarReceitas();
  }

  async carregarReceitas() {
    this.loading.set(true);

    const { data, error } = await this.supabase.from('receitas').select(`
      *,
      tipos!receitas_tipo_id_fkey(nome)
    `);

    if (error) {
      console.error('Erro ao carregar receitas', error);
    } else {
      this.receitas.set(data ?? []);
    }

    this.loading.set(false);
  }
}
