import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { Ingredient } from 'src/app/shopping-list/ingredient.model';
import { RecipeService } from '../recipe-list/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  public id: number;
  public editMode: boolean = false;
  recipeForm: FormGroup;
  public isSubmited: boolean;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  public onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.isSubmited = true;
      this.dataStorageService.saveRecipes();
    } else {
      this.recipeService.addRecipeItem(this.recipeForm.value);
    }
    this.onCancel();
  }

  public onCancel() {
    //navigate back from the current route:
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    this.isSubmited = false;

    if (this.editMode) {
      //get data from the selected element:
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(this.getNewFormGroup(ingredient));
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  private getNewFormGroup(ingredient: Ingredient) {
    return new FormGroup({
      name: new FormControl(ingredient.name, Validators.required),
      amount: new FormControl(ingredient.amount, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
    });
  }

  //create dynamic form fields section:
  public onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  public onDeleteIngredientItem(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
