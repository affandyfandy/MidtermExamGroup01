import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-logout-confirmation-dialog',
    standalone: true,
    imports: [CommonModule, MatButtonModule],
    template: `
    <h1 mat-dialog-title>Confirm Logout</h1>
    <div mat-dialog-content>Are you sure you want to logout?</div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button (click)="onConfirm()" cdkFocusInitial>Logout</button>
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
