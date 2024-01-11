import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BikesService } from '../shared/bikes.service';

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

  constructor( private fb: FormBuilder,
               private router: Router,
               private route: ActivatedRoute,
               private bikesService: BikesService ) { }

  ngOnInit() {
    this.title = 'Creat New';
    this.initCreateProductForm();
    if (this.route.snapshot.paramMap.get('id')) {
      this.title = 'Edit';
      this.routeID = this.route.snapshot.paramMap.get('id');
      this.getById(this.routeID);
    }
  }

  cancel() { 
    this.router.navigate(["/view-product"])
  }

  saveProduct() {
    this.bikesService.create(this.createProductForm.value)
    .subscribe({
      next:(data: any) => {
        this.router.navigate(["/view-product"])
      },
      error:(err: any) => {
        console.log(err);
      }
    })
  }
  
  getById(id: any) {
    this.bikesService.getById(this.routeID).subscribe((data: any) => {
      console.log('in getBy' + data);
      this.createProductForm = this.fb.group({
        id: [data.id],
        name: [data.name, Validators.required],
        description: [data.description],
        rating: [data.rating],
        price: [data.price],
        quantity: [data.quantity],
        type: [data.type],
        image: ['../../../assets/bike.webp', ],
      });
    });
  }
 
  update() {
    this.bikesService.update(this.createProductForm.value)
    .subscribe({
      next:(data: any) => {
        this.router.navigate(["/bikes"]);
      },
      error:(err: any) => {
        console.log(err);
      }
    })
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
      image: ['../../../assets/bike.webp', ],
    });
  }

}
