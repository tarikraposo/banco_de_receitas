import { Component, inject, OnInit, signal } from '@angular/core';
import {
  IngredienteForm,
  ReceitaFormModel,
  ReceitaInterface,
} from '../../../../core/models/receita-interface';
import { form } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReceitasService } from '../../services/receitas.service';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SupabaseClientService } from '../../../../core/supabase.client';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-receita-form',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './receita-form.html',
  styleUrl: './receita-form.scss',
})
export class ReceitaForm implements OnInit {
  receitaModel = signal<ReceitaFormModel>({
    nome: '',
    descricao: '',
    tempo_preparo: 0,
    porcoes: 1,
    imagem_url: '',
    modo_preparo: '',
    tipo_id: '',
    dificuldade_id: '',
    ingredientes: [],
  });

  supabaseService = inject(SupabaseClientService);
  receitaService = inject(ReceitasService);
  receitaForm = form(this.receitaModel);
  ingredientesDisponiveis = this.receitaService.ingredientesDisponiveis;

  salvando = signal(false);
  tiposReceita = signal<{ id: string; nome: string }[]>([]);
  dificuldades = signal<{ id: string; nome: string }[]>([]);

  // constructor() {
  //   effect(() => {
  //     console.log('Model atualizado:', this.receitaModel());
  //   });
  // }

  ngOnInit(): void {
    this.receitaService.carregarIngredientes();
    this.carregarOpcoes();
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
  async carregarOpcoes() {
    this.tiposReceita.set(await this.receitaService.buscarTipos());

    this.dificuldades.set(await this.receitaService.buscarDificuldades());
  }
  adicionarIngrediente() {
    this.receitaModel.update((model) => ({
      ...model,
      ingredientes: [...model.ingredientes, { ingrediente_id: '', quantidade: 1, unidade: '' }],
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

  async salvarReceita(event: Event) {
    event.preventDefault();
    this.salvando.set(true);

    try {
      const receita = this.receitaModel();
      const { ingredientes, ...dadosReceita } = receita;

      // 1️⃣ salva receita
      const { data, error } = await this.supabaseService.client
        .from('receitas')
        .insert(dadosReceita)
        .select()
        .single();

      if (error) throw error;

      // 2️⃣ salva ingredientes
      if (ingredientes.length > 0) {
        const ingredientesPayload = ingredientes.map((i) => ({
          receita_id: data.id,
          ingrediente_id: i.ingrediente_id,
          quantidade: i.quantidade,
          unidade: i.unidade,
        }));

        const { error: erroIngredientes } = await this.supabaseService.client
          .from('receita_ingredientes')
          .insert(ingredientesPayload);

        if (erroIngredientes) throw erroIngredientes;
      }

      console.log('Receita salva com sucesso ✅');
    } catch (err) {
      console.error('Erro ao salvar receita', err);
    } finally {
      this.salvando.set(false);
    }
  }
}
