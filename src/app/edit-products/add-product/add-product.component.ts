import { Component } from '@angular/core';
import { Bikes } from '../shared/bikes.model';
import { BikesService } from '../shared/bikes.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {

  bikes: Bikes[] = [];
  constructor(private bikesService: BikesService) { }

  ngOnInit(): void {
    this.bikesService.getUsers().subscribe((data: Bikes[]) => {
      this.bikes = data;
    });
  }

}
