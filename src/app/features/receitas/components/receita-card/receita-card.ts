import { Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReceitaInterface } from '../../../../core/models/receita-interface';

@Component({
  selector: 'app-receita-card',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './receita-card.html',
  styleUrl: './receita-card.scss',
})
export class ReceitaCard {
  receita = input.required<ReceitaInterface>();
  receitaValue = computed(() => this.receita());
}
