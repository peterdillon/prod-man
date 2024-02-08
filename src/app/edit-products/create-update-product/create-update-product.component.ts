import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '../shared/dialog.service';
import { Firestore, getFirestore, doc,  DocumentData, QuerySnapshot, getDoc } from 'firebase/firestore';
import { FirebaseService } from '../shared/firebase.service';

@Component({
  selector: 'app-create-update-product',
  templateUrl: './create-update-product.component.html',
  styleUrl: './create-update-product.component.scss'
})
export class CreateProductComponent implements OnInit {

  db: Firestore;
  createProductForm!: FormGroup;
  routeID: any;
  title = '';
  newProduct = true;
  bikeCollectiondata: { id: string, name: string}[] | any = [];

  constructor( private fb: FormBuilder,
               private router: Router,
               private route: ActivatedRoute,
               private dialog: DialogService,
               private firebaseService: FirebaseService ) { 
                this.db = getFirestore();
              }
            
  ngOnInit(): void {
    this.get();
    this.firebaseService.obsr_UpdatedSnapshot.subscribe((snapshot) => {
      this.updateBikeCollection(snapshot);
    })

    this.title = 'Create New';
    this.initCreateProductForm();
    if (this.route.snapshot.paramMap.get('id')) {
      this.title = 'Edit';
      this.newProduct = false;
      this.routeID = this.route.snapshot.paramMap.get('id');
      this.initEditProductForm();
    }
  }

  async saveNewProduct() {
    await this.firebaseService.addBike(
      this.createProductForm.get('name')?.value,
      this.createProductForm.get('description')?.value,
      this.createProductForm.get('rating')?.value,
      this.createProductForm.get('price')?.value,
      this.createProductForm.get('quantity')?.value,
      this.createProductForm.get('type')?.value,
      this.createProductForm.get('image')?.value,
      this.createProductForm.get('logo')?.value
      );
      this.router.navigate(["/view-product"]);
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

  async delete(docId: string) {
    await this.firebaseService.deleteBike(docId);
  }

  async update() {
    await this.firebaseService.updateBike(
      this.routeID, 
      this.createProductForm.get('name')?.value,
      this.createProductForm.get('description')?.value,
      this.createProductForm.get('rating')?.value,
      this.createProductForm.get('price')?.value,
      this.createProductForm.get('quantity')?.value,
      this.createProductForm.get('type')?.value,
      this.createProductForm.get('image')?.value,
      this.createProductForm.get('logo')?.value );
      this.router.navigate(["/view-product"])
  }

  cancel() { 
    this.router.navigate(["/view-product"])
  }

  async initEditProductForm() {
    const docRef = doc(this.db, 'bikes', this.routeID);
    const docSnap = await getDoc(docRef);
    // await getDoc(docRef);
    if (docSnap.exists()) {
        this.createProductForm = this.fb.group({
          name: [docSnap.data()['name'], Validators.required],
          description: [docSnap.data()['description'], Validators.required],
          rating: [docSnap.data()['rating'], Validators.required],
          price: [docSnap.data()['price'], Validators.required],
          quantity: [docSnap.data()['quantity'], Validators.required],
          type: [docSnap.data()['type'], Validators.required],
          image: [docSnap.data()['image'], Validators.required],
          logo: [docSnap.data()['logo'], Validators.required]
        });
      } else {
        console.log("No such document!");
      }
  }
 
  initCreateProductForm(): void {
    this.createProductForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      rating: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      type: ['', Validators.required],
      image: ['../../../assets/bike-2.png', Validators.required],
      logo: ['../../../assets/schwinn.webp', Validators.required],
    });
  }

}
