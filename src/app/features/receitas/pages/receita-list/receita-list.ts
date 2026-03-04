import { Component, inject, signal } from '@angular/core';
import { ReceitasService } from '../../services/receitas.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-receita-list',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './receita-list.html',
  styleUrl: './receita-list.scss',
})
export class ReceitaList {
  private receitasService = inject(ReceitasService);

  receitas = signal<any[]>([]);
  loading = signal(true);

  async ngOnInit() {
    await this.carregarReceitas();
  }

  async carregarReceitas() {
    try {
      const data = await this.receitasService.listarReceitasCompletas();
      this.receitas.set(data ?? []);
    } catch (err) {
      console.error('Erro ao carregar receitas', err);
    } finally {
      this.loading.set(false);
    }
  }
}
