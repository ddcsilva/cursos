import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../shared/interfaces/product.interface';
import { PayloadProduct } from '../../shared/interfaces/payload-product.type';
import { FormComponent } from '../../shared/components/form/form.component';
import { BackToListComponent } from '../../shared/components/back-to-list/back-to-list.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormComponent, BackToListComponent],
  templateUrl: './edit.component.html',
})
export class EditComponent {
  productService = inject(ProductService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  route = inject(ActivatedRoute);

  product: Product = this.route.snapshot.data['product'];

  onSubmit(product: PayloadProduct): void {
    this.productService.put(this.product.id, product).subscribe({
      next: () => {
        this.matSnackBar.open('Produto atualizado com sucesso!', 'Ok');
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.matSnackBar.open('Erro ao atualizar produto!', 'Ok');
      },
    });
  }
}
