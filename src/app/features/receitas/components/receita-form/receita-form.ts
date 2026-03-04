import { Component, inject, OnInit, signal } from '@angular/core';
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
  receitaModel = signal<ReceitaInterface>({
    nome: '',
    descricao: '',
    tempoPreparo: 0,
    porcoes: 1,
    imagem_url: '',
    modo_preparo: '',
    tipoId: '',
    dificuldadeId: '',
    ingredientes: [],
  });

  supabaseService = inject(SupabaseClientService);
  receitaService = inject(ReceitasService);
  receitaForm = form(this.receitaModel);
  ingredientesDisponiveis = this.receitaService.ingredientesDisponiveis;

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

  async salvarReceita() {
    try {
      // 1️⃣ Separar ingredientes
      const { ingredientes, ...dadosReceita } = this.receitaModel();

      // 2️⃣ Inserir receita
      const { data: receitaCriada, error: erroReceita } = await this.supabaseService.client
        .from('receitas')
        .insert({
          nome: dadosReceita.nome,
          descricao: dadosReceita.descricao,
          tempo_preparo: dadosReceita.tempoPreparo,
          modo_preparo: dadosReceita.modo_preparo,
          porcoes: dadosReceita.porcoes,
          tipo_id: dadosReceita.tipoId,
          imagem_url: dadosReceita.imagem_url,
        })
        .select()
        .single();

      if (erroReceita) throw erroReceita;

      // 3️⃣ Preparar ingredientes com receita_id
      const ingredientesParaInserir = ingredientes.map((i) => ({
        receita_id: receitaCriada.id,
        ingrediente_id: i.ingredienteId,
        quantidade: i.quantidade,
        unidade: i.unidade,
      }));

      // 4️⃣ Inserir ingredientes
      const { error: erroIngredientes } = await this.supabaseService.client
        .from('receita_ingredientes')
        .insert(ingredientesParaInserir);

      if (erroIngredientes) throw erroIngredientes;

      console.log('Receita salva com sucesso 🎉', receitaCriada);
    } catch (error) {
      console.error('Erro ao salvar receita ❌', error);
    }
  }
}
