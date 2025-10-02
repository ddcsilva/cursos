import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, MatButtonModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  products: Product[] = [];
  productsService = inject(ProductService);
  router = inject(Router);
  confirmationDialogService = inject(ConfirmationDialogService);

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
    });
  }

  onEdit(product: Product): void {
    this.router.navigate(['edit', product.id]);
  }

  onDelete(product: Product): void {
    this.confirmationDialogService
      .openDialog()
      .pipe(filter((answer: boolean) => answer))
      .subscribe(() => {
        this.productsService.delete(product.id).subscribe(() => {
          this.loadProducts();
        });
      });
  }
}
