import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-products',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,MatButtonModule, MatDialogModule ],
  templateUrl: './delete-products.component.html',
  styleUrl: './delete-products.component.scss'
})
export class DeleteProductsComponent {
  deleteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DeleteProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.deleteForm = this.fb.group({
      reason: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.deleteForm.valid) {
      this.dialogRef.close(this.deleteForm.value);
    }
  }
}
