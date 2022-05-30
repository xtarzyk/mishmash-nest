import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from 'src/lib/entities/ingredient.entity';
import { Recipe } from 'src/lib/entities/recipe.entity';
import { RecipesIngredients } from 'src/lib/entities/recipesIngredients.entity';
import { RecipeModel } from 'src/lib/models';
import { Repository } from 'typeorm';
import { RecipeIngredientDao } from './dao/recipe-ingredients.dao';

@Injectable()
export class RecipeService {
    constructor(@InjectRepository(Recipe) private recipeRepository: Repository<Recipe>) {}
        
    findAll() {
        return this.recipeRepository.find()
    }
        
    findById(id: number) {
        return this.recipeRepository.findOne(id)
    }

    findByIngredients(ids: Array<number>) {
        return this.recipeRepository
            // .createQueryBuilder('R')
            // .select('R.name AS recipeName, R.recipeId, I.name AS ingredientName, I.ingredientId')
            // .innerJoin(RecipesIngredients, 'RI', 'R.recipeId = RI.recipeId')
            // .innerJoin(Ingredient, 'I', 'I.ingredientId = RI.ingredientId')
            // .getRawOne()
    }
        
    async findRecipes() {
        const recipes = await this.recipeRepository
            .createQueryBuilder('R')
            .select('R.recipeId, R.name AS recipeName, I.ingredientId, I.name AS ingredientName')
            .innerJoin(RecipesIngredients, 'RI', 'R.recipeId = RI.recipeId')
            .innerJoin(Ingredient, 'I', 'I.ingredientId = RI.ingredientId')
            .getRawMany<RecipeIngredientDao>()

        return recipes.reduce((acc, currentItem) => {
            const accElement = acc.find(recipe => recipe.recipeId === currentItem.recipeId)
            if (!accElement) {
                return [
                    ...acc,
                    {
                        recipeId: currentItem.recipeId,
                        recipeName: currentItem.recipeName,
                        ingredients: [{
                            ingredientId: currentItem.ingredientId, 
                            ingredientName: currentItem.ingredientName
                        }]
                    }
                ]
            }
            
            return acc.map(recipe => {
                if (recipe.recipeId === currentItem.recipeId) {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients.concat({ 
                            ingredientId: currentItem.ingredientId, 
                            ingredientName: currentItem.ingredientName 
                        })
                    }
                }

                return recipe
            })
        }, [] as Array<RecipeModel>)
    }

    add(name: string) {
        const newRecipe = this.recipeRepository.create({ name })
        return this.recipeRepository.save(newRecipe) 
    }

    remove(id: number) {
        return this.recipeRepository.delete(id)
    }
}
