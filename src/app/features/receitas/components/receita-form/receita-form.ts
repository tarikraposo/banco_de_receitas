import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { IngredienteForm, ReceitaInterface } from '../../../../core/models/receita-interface';
import { form } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReceitasService } from '../../services/receitas.service';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SupabaseClientService } from '../../../../core/supabase.client';

@Component({
  selector: 'app-receita-form',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './receita-form.html',
  styleUrl: './receita-form.scss',
})
export class ReceitaForm implements OnInit {
  receitaModel = signal<ReceitaInterface>({
    nome: '',
    descricao: '',
    tempoPreparo: 0,
    porcoes: 1,
    imagem_url: '',
    tipoId: '',
    dificuldadeId: '',
    ingredientes: [],
  });

  tiposReceita = signal<{ id: string; nome: string }[]>([
    { id: 'sobremesa', nome: 'Sobremesa' },
    { id: 'prato-principal', nome: 'Prato Principal' },
    { id: 'entrada', nome: 'Entrada' },
    { id: 'bebida', nome: 'Bebida' },
  ]);

  dificuldades = signal<{ id: string; nome: string }[]>([
    { id: 'facil', nome: 'Fácil' },
    { id: 'media', nome: 'Média' },
    { id: 'dificil', nome: 'Difícil' },
  ]);

  receitaService = inject(ReceitasService);
  ingredientesDisponiveis = this.receitaService.ingredientesDisponiveis;
  receitaForm = form(this.receitaModel);

  constructor() {
    effect(() => {
      console.log('Model atualizado:', this.receitaModel());
    });
  }

  ngOnInit(): void {
    this.receitaService.carregarIngredientes();
  }

  atualizarCampo(campo: keyof ReceitaInterface, valor: any) {
    this.receitaModel.update((model) => ({
      ...model,
      [campo]: valor,
    }));
  }

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

  adicionarIngrediente() {
    this.receitaModel.update((model) => ({
      ...model,
      ingredientes: [...model.ingredientes, { ingredienteId: '', quantidade: 1, unidade: '' }],
    }));
  }

  removerIngrediente(index: number) {
    this.receitaModel.update((model) => ({
      ...model,
      ingredientes: model.ingredientes.filter((_, i) => i !== index),
    }));
  }

  enviarFormulario() {
    console.log('Formulário enviado:', this.receitaModel());
    // Implementar envio para o serviço
  }
}
