import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BikesService } from '../shared/bikes.service';
import { DialogService } from '../shared/dialog.service';

@Component({
  selector: 'app-create-update-product',
  templateUrl: './create-update-product.component.html',
  styleUrl: './create-update-product.component.scss'
})
export class CreateProductComponent implements OnInit {

  createProductForm!: FormGroup;
  url = 'http://localhost:3000';
  routeID: any;
  title = '';
  newProduct = true;

  constructor( private fb: FormBuilder,
               private router: Router,
               private route: ActivatedRoute,
               private bikesService: BikesService,
               private dialog: DialogService  ) { }

  ngOnInit() {
    this.title = 'Create New';
    this.initCreateProductForm();
    if (this.route.snapshot.paramMap.get('id')) {
      this.title = 'Edit';
      this.newProduct = false;
      this.routeID = this.route.snapshot.paramMap.get('id');
      this.initEditProductForm(this.routeID);
    }
  }

  cancel() { 
    this.router.navigate(["/view-product"])
  }

  saveNewProduct() {
    this.bikesService.create(this.createProductForm.value)
    .subscribe({
      next:(data: any) => {
        this.router.navigate(["/view-product"])
      },
      error:(err: any) => {
        console.log(err);
        if (err.status === 500) {
          this.msgDialog();
        }
      }
    })
  }

  saveEditedProduct() {
    this.bikesService.update(this.routeID, this.createProductForm.value)
    .subscribe({
      next:(data: any) => {
        this.router.navigate(["/view-product"]);
      },
      error:(err: any) => {
        console.log(err);
      }
    })
  }

  msgDialog() {
    this.dialog
      .confirmDialog({
        title: 'ID already exists!',
        message: 'Please change ID to save this product.',
        confirmCaption: 'Okay',
        hasCancelButton: false
      })
      .subscribe((yes) => {
        if (yes) {
          console.log('Confirmed.');
        }
      });
  }
  
  initEditProductForm(id: any) {
    this.bikesService.getById(this.routeID).subscribe((data: any) => {
      this.createProductForm = this.fb.group({
        id: [{value: data.id, disabled: true}],
        name: [data.name, Validators.required],
        description: [data.description],
        rating: [data.rating],
        price: [data.price],
        quantity: [data.quantity],
        type: [data.type],
        image: [data.image],
        logo: [data.logo]
      });
    });
  }
 
  initCreateProductForm(): void {
    this.createProductForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
      rating: [''],
      price: [''],
      quantity: [''],
      type: [''],
      image: ['../../../assets/bike-2.webp'],
      logo: ['../../../assets/schwinn.webp'],
    });
  }

}
