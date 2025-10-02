import { Component, inject } from '@angular/core';
import { Product } from '../../shared/interfaces/product.interface';
import { ProductService } from '../../shared/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { FormComponent } from '../../shared/components/form/form.component';
import { BackToListComponent } from '../../shared/components/back-to-list/back-to-list.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormComponent, BackToListComponent, RouterLink],
  templateUrl: './create.component.html',
})
export class CreateComponent {
  productService = inject(ProductService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  onSubmit(product: Product): void {
    this.productService.post(product).subscribe(() => {
      this.matSnackBar.open('Produto criado com sucesso!', 'Ok');
      this.router.navigateByUrl('/');
    });
  }
}
