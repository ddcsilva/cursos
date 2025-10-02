import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';
import { switchMap, tap } from 'rxjs';
import { NoItemsComponent } from './components/no-items/no-items.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, MatButtonModule, RouterLink, NoItemsComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  productsService = inject(ProductService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  confirmationDialogService = inject(ConfirmationDialogService);
  matSnackBar = inject(MatSnackBar);

  products = signal<Product[]>(this.route.snapshot.data['products']);

  onEdit(product: Product): void {
    this.router.navigate(['edit', product.id]);
  }

  onDelete(product: Product): void {
    this.confirmationDialogService
      .openDialog()
      .pipe(
        switchMap(() => this.productsService.delete(product.id)),
        switchMap(() => this.productsService.getAll()),
        tap((products) => this.products.set(products))
      )
      .subscribe({
        next: () => {
          this.matSnackBar.open('Produto excluído com sucesso!', 'Ok');
        },
        error: () => {
          this.matSnackBar.open('Erro ao excluir produto!', 'Ok');
        },
      });
  }
}
