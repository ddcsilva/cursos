import { Component, inject } from '@angular/core';
import { PayloadProduct } from '../../shared/interfaces/payload-product.type';
import { ProductService } from '../../shared/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form/form.component';
import { BackToListComponent } from '../../shared/components/back-to-list/back-to-list.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormComponent, BackToListComponent],
  templateUrl: './create.component.html',
})
export class CreateComponent {
  productService = inject(ProductService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  onSubmit(product: PayloadProduct): void {
    this.productService.post(product).subscribe({
      next: () => {
        this.matSnackBar.open('Produto criado com sucesso!', 'Ok');
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.matSnackBar.open('Erro ao criar produto!', 'Ok');
      },
    });
  }
}
