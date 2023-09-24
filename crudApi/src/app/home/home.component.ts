import { Component, OnInit } from '@angular/core';
import { CoffeeService } from '../services/coffee.service';
import { Observable } from 'rxjs';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddComponent } from '../components/dialog-add/dialog-add.component';
import { Coffee } from '../model/coffee.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements  OnInit  {
  constructor(private coffeeService: CoffeeService, private dialog: MatDialog) {
   }

  coffee: Coffee = <Coffee>{};

  coffeeList: Coffee[] = [];
  coffeeList$: Observable<Coffee[]> = this.coffeeService.getCoffeeList();

  ngOnInit(): void {
    this.getCoffeeList();
  }

  // openDialogAdd() {
  //   const dialogRef = this.dialog.open(DialogAddComponent);
  //   dialogRef.afterClosed().subscribe({
  //     next: (res) => {
  //       this.coffeeService.getCoffeeList();
  //     },
  //     error: console.log,
  //   })
  // }
  

  getCoffeeList() {
    this.coffeeService.getCoffeeList().subscribe({
      next: (res) => {
        console.log(res);
        
      },
      error: console.log,
    });
  }

  deleteCoffee(id: number) {
    this.coffeeService.deleteCoffee(id).subscribe({
      next: (res) => {
        alert('Deleted successfully');
        if(res) {
          this.getCoffeeList(); 
        }
      },
      error: console.log,
    });
  }
}
