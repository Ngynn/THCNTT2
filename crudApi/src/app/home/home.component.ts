import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { HttpService } from '../services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from '../services/core/core.service';
import { WarningComponent } from '../dialog/warning/warning.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', "address", "gender", "action"];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private httpService: HttpService, private dialog: MatDialog, private coreService: CoreService) {

  }

  

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if(val) {
          this.getAll();
        }
      }
    }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    return this.httpService.getAll().subscribe({
      next: (res: any) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
      },
      error: (err: any) => {
        console.error(err);
        
      }
    })
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(WarningComponent, {
      data: {
        message: 'Are you sure you want to delete this item?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.httpService.delete(id).subscribe({
          next: (res: any) => {
            console.log(res);
            this.coreService.openSnackBar('Deleted', 'done');
            this.getAll();
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      } 
    });
    
  }

  openEditDialog(data: any) {
    const dialogRef = this.dialog.open(DialogComponent,
      {
        data,
      });
      dialogRef.afterClosed().subscribe({
        next: (val: any) => {
          if(val) {
            this.getAll();
          }
        }
      })
  }
  

}
