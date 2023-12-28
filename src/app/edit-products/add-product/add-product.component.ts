import { Component } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {

  users: any[] = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
    console.log(this.users);
  }

  cards = [
    {title: 'Specialized', content: 'Description:'},
    {title: 'Schwinn', content: 'Description:'},
    {title: 'Trek', content: 'Description:'},
    {title: 'PUBLIC Bikes', content: 'Description:'}
  ];

}
