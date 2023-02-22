import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private recipeService: RecipeService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      imagePath: ['', [Validators.required]],
    });
  }

  onSubmit() {
    // const { name, description } = this.form.value;
    console.log(this.form.value);
    this.outputNewRecipe.emit({ ...this.form.value, imagePath: '' });
    this.recipeService.addRecipeItem({ ...this.form.value });
  }
}
