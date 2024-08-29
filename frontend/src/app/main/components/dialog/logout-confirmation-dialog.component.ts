import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-logout-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <div class="p-6">
      <h1 class="text-xl font-bold text-center">Confirm Logout</h1>
      <div mat-dialog-content>Are you sure you want to logout?</div>
      <div mat-dialog-actions class="pt-4">
      <button type="button" class="bg-[#F37022] font-semibold w-full text-white px-4 py-2 rounded-md hover:bg-[#ff9557] transition-all"
        (click)="onCancel()">Cancel</button>
      <div class="h-2"></div>
      <button type="submit"
        class="bg-[#FFD6D6] font-semibold w-full text-[#F72222] px-4 py-2 rounded-md hover:bg-[#ffc8c8] transition-all"
        (click)="onConfirm()">Logout</button>
      </div>
    </div>
  `
})
export class LogoutConfirmationDialogComponent {

  constructor(public dialogRef: MatDialogRef<LogoutConfirmationDialogComponent>) { }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
