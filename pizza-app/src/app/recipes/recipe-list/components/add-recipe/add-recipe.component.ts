import { Location } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
})
export class AddRecipeComponent {
  public form: FormGroup;
  @Output() outputNewRecipe = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private dataStorageService: DataStorageService,
    private location: Location
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      imagePath: ['', [Validators.required]],
    });
  }

  public onSubmit() {
    this.recipeService.addRecipeItem({ ...this.form.value });
    this.dataStorageService.saveRecipes();
  }

  public onCancel() {
    this.location.back();
  }
}
