import { Component } from '@angular/core';
import { Bikes } from '../shared/bikes.model';
import { BikesService } from '../shared/bikes.service';
import { Router } from '@angular/router';
import { DialogService } from '../shared/dialog.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss'
})
export class ViewProductComponent {

  bikes: Bikes[] = [];

  constructor( private bikesService: BikesService,
               private router: Router,
               private dialog: DialogService ) { }

  ngOnInit(): void {
    this.bikesService.getAllProducts().subscribe((data: Bikes[]) => {
      this.bikes = data;
    });
  }

  editProduct(id:number) {
    this.router.navigate(["/edit-product/" + id])
  }

  delete(id:number) {
    this.bikesService.delete(id).subscribe({
      next: (data) => {
        this.bikes = this.bikes.filter(x => x.id != id)
      },
    });
  }

  confirmCancelDialog(id:number) {
    this.dialog
      .confirmDialog({
        title: 'Confirm Deletion',
        message: 'Do you want to permanently delete this product?',
        confirmCaption: 'Confirm',
        cancelCaption: 'Cancel',
        hasCancelButton: true
      })
      .subscribe((confirmed) => {
        if (confirmed) {
          this.delete(id);
          console.log('Deleting product...');
        }
      });
  }

}
