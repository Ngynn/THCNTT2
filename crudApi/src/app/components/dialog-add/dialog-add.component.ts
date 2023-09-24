import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CoffeeService } from 'src/app/services/coffee.service';


@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss']
})
export class DialogAddComponent {
  coffeeList: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private coffeeService: CoffeeService, private dialogRef: MatDialogRef<DialogAddComponent>) { 
    this.coffeeList = this.formBuilder.group({
      name: '',
      image: '',
      price: '',
      quantity: ''
    });
  }

  Save()  {
    if(this.coffeeList.valid) {
      this.coffeeService.addCoffee(this.coffeeList.value).subscribe({
        next: (val: any) => {
          alert('Coffee added successfully');
          this.dialogRef.close(true);
          
        },
        error: (err: any) => {
          console.log(err);
        },
      })
    }
  }


  
}
