import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItensLista } from './itens-lista.interface';

@Component({
  selector: 'app-lista-compras',
  imports: [FormsModule, CommonModule],
  templateUrl: './lista-compras.component.html',
  styleUrl: './lista-compras.component.scss',
})
export class ListaComprasComponent {
  item: string = '';
  itens: ItensLista[] = [];

  private proximoId: number = 1;

  adicionarItem(): void {
    const itemTrimmed = this.item.trim();

    if (!itemTrimmed) {
      return;
    }

    this.itens.push({
      id: this.proximoId++,
      nome: itemTrimmed,
      comprado: false,
    });

    this.item = '';
  }

  removerItem(id: number): void {
    this.itens = this.itens.filter(item => item.id !== id);
  }
}
