import { IngredientModel } from "./ingredient-model"

export type RecipeModel = {
    recipeId: number,
    recipeName: string,
    ingredients: Array<IngredientModel>
}