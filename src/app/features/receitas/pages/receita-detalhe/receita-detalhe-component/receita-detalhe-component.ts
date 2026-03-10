import { Component, input } from '@angular/core';

import { ReceitaInterface } from '../../../../../core/models/receita-interface';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-receita-detalhe-component',
  standalone: true,
  templateUrl: './receita-detalhe-component.html',
  imports: [MatCardModule],
})
export class ReceitaDetalheComponent {
  receita = input.required<ReceitaInterface | null>();
  loading = input.required<boolean>();
}
