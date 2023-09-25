import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../services/core/core.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  listForm: FormGroup;

  constructor(private httpService: HttpService, 
    private formBuilder: FormBuilder, 
    private dialogRef: MatDialogRef<DialogComponent>, 
    private coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.listForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      gender: '',
    });
  }

  ngOnInit(): void {
    this.listForm.patchValue(this.data);
  }

  submitForm() {
    if(this.listForm.valid) {
      if(this.data) {
        this.httpService.update(this.data.id, this.listForm.value).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Updated successfully !');
            this.dialogRef.close(true);
            console.log(val);
            
          },
          error: (err: any) => {
            console.error(err);
            
          }
        })
      } else {
        this.httpService.add(this.listForm.value).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Added successfully !');
            this.dialogRef.close(true);
            console.log(val);
            
          },
          error: (err: any) => {
            console.error(err);
            
          }
        })
      }
      
    }
  }


}
