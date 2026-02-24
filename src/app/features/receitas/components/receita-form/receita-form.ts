import { Component, signal } from '@angular/core';
import { IngredienteForm, ReceitaInterface } from '../../../../core/models/receita-interface';
import { form } from '@angular/forms/signals';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-receita-form',
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './receita-form.html',
  styleUrl: './receita-form.scss',
})
export class ReceitaForm {
  receitaModel = signal<ReceitaInterface>({
    nome: '',
    descricao: '',
    tempoPreparo: 0,
    porcoes: 1,
    tipoId: '',
    dificuldadeId: '',
    ingredientes: [],
  });

  receitaForm = form(this.receitaModel);

  atualizarIngrediente(index: number, campo: keyof IngredienteForm, valor: any) {
    this.receitaModel.update((model) => {
      const ingredientesAtualizados = [...model.ingredientes];
      ingredientesAtualizados[index] = {
        ...ingredientesAtualizados[index],
        [campo]: valor,
      };

      return {
        ...model,
        ingredientes: ingredientesAtualizados,
      };
    });
  }

  removerIngrediente(index: number) {
    this.receitaModel.update((model) => ({
      ...model,
      ingredientes: model.ingredientes.filter((_, i) => i !== index),
    }));
  }
}
