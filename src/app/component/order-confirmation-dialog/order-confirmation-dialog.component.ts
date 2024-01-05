import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-order-confirmation-dialog',
  template: `
    <div style="text-align: center; margin-top: 20px;">
      <p style="color: black; font-size: 18px; margin-bottom: 10px;">Dziękujemy za złożenie zamówienia</p>
      <button (click)="closeDialog()" style="padding: 10px 20px; background-color: #ff5733; color: white; border: none; border-radius: 5px; cursor: pointer;">OK</button>
    </div>

  `,
  encapsulation: ViewEncapsulation.None, // Ustawienie braku enkapsulacji
})
export class OrderConfirmationDialogComponent {
  constructor(private dialogRef: MatDialogRef<OrderConfirmationDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

}
