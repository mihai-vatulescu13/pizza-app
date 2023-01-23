import { Component, OnInit } from '@angular/core';
import { Ingredient } from './ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  public ingredients: Ingredient[] = [
    {
      name: 'Apples',
      amount: 3,
    },
    {
      name: 'Tomatoes',
      amount: 10,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
