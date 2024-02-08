import { Component } from '@angular/core';
import { Bikes } from '../shared/bikes.model';
import { BikesService } from '../shared/bikes.service';
import { Router } from '@angular/router';
import { DialogService } from '../shared/dialog.service';
import { DocumentData, QuerySnapshot, orderBy } from '@firebase/firestore';
import { FirebaseService } from '../shared/firebase.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss'
})
export class ViewProductComponent {

  bikeCollectiondata: { 
    id: string;
    name: string;
    description: string;
    rating: number;
    price: number;
    quantity: number;
    type: string;
    image: string;  }[] | any = [];

  constructor( private bikesService: BikesService,
               private router: Router,
               private dialog: DialogService,
               private firebaseService: FirebaseService  ) { }

  ngOnInit(): void {
    this.get();
    this.firebaseService.obsr_UpdatedSnapshot.subscribe((snapshot) => {
      this.updateBikeCollection(snapshot);
    })
  }
 
  async get() {
    const snapshot = await this.firebaseService.getBikes();
    this.updateBikeCollection(snapshot);
  }

  updateBikeCollection(snapshot: QuerySnapshot<DocumentData>) {
    this.bikeCollectiondata = [];
    snapshot.docs.forEach((Bike) => {
      this.bikeCollectiondata.push({ ...Bike.data(), id: Bike.id });
    })
  }
  
  editProduct(id:string) {
    this.router.navigate(["/edit-product/" + id])
  }

  async delete(docId: string) {
    await this.firebaseService.deleteBike(docId);
  }

  confirmDeleteDialog(id:string) {
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
        }
    });
  }
}
