import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string = 'DONE'): void {
    this.snackBar.open(message, action,{
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'end',

    });
  }
}
