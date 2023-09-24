import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddComponent } from '../dialog-add/dialog-add.component';
import { CoffeeService } from 'src/app/services/coffee.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private dialog: MatDialog, private coffeeService: CoffeeService) { }

  @Input() coffeeList!: [] | any;

  openDialogAdd() {
    const dialogRef = this.dialog.open(DialogAddComponent);
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        this.coffeeService.getCoffeeList();
      },
      error: console.log,
    })
  }

  
}
