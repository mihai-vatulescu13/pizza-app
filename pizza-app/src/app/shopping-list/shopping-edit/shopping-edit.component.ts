import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  //extract ngForm reference into the component:
  @ViewChild('f') shoppingListForm: NgForm;

  private subscription: Subscription;
  editMode: boolean = false;
  editedElemIndex: number;
  editedElem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.selectedElemIndex$.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedElemIndex = index;

        this.editedElem = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.editedElem.name,
          amount: this.editedElem.amount,
        });
      }
    );
  }

  public onIngredientSubmit(form: NgForm) {
    const value = form.value;

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedElemIndex, {
        name: value.name,
        amount: value.amount,
      });
    } else {
      this.shoppingListService.addIngredient({
        //these values comes from name attribute as reference by using ngModel
        name: value.name,
        amount: value.amount,
      });
    }
    this.editMode = false;
    form.reset();
  }

  public onDelete() {
    this.shoppingListService.deleteIngredient(this.editedElemIndex);
    this.onResetForm();
    this.editMode = false;
  }

  public onResetForm() {
    this.shoppingListForm.reset();
  }

  ngOnDestroy(): void {
    //a way to unsubscribe besides .next(true) and .complete():
    this.subscription.unsubscribe();
  }
}
