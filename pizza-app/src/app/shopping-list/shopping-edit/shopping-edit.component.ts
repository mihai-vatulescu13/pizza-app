import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  public onIngredientAdd(event: any) {
    event.preventDefault();

    let ingredientName: string = this.nameInputRef.nativeElement.value;
    let ingredientAmount: number = this.amountInputRef.nativeElement.value;

    this.shoppingListService.addIngredient({
      name: ingredientName,
      amount: ingredientAmount,
    });
  }
}
