import { Component } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {

  cards = [
    {title: 'Specialized', content: 'Description:'},
    {title: 'Schwinn', content: 'Description:'},
    {title: 'Trek', content: 'Description:'},
    {title: 'PUBLIC Bikes', content: 'Description:'}
  ];

}
