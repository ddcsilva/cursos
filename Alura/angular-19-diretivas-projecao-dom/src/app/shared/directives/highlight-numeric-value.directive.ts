import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appHighlightNumericValue]',
  standalone: true,
})
export class HighlightNumericValueDirective {
  private elementRef = inject(ElementRef<HTMLElement>);

  appHighlightNumericValue = input.required<number>();
  positiveColor = input<string>('var(--destaque-receita)');
  negativeColor = input<string>('var(--destaque-despesa)');

  constructor() {
    effect(() => {
      if (this.appHighlightNumericValue() > 0) {
        this.elementRef.nativeElement.style.color = this.positiveColor();
      } else if (this.appHighlightNumericValue() < 0) {
        this.elementRef.nativeElement.style.color = this.negativeColor();
      } else {
        return;
      }
    });
  }
}
