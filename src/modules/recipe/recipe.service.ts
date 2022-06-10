import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from 'src/lib/entities/ingredient.entity';
import { Recipe } from 'src/lib/entities/recipe.entity';
import { RecipesIngredients } from 'src/lib/entities/recipesIngredients.entity';
import { RecipeModel } from 'src/lib/models';
import { RecipeNameModel } from 'src/lib/models/recipe-name-model';
import { Repository } from 'typeorm';
import { RecipeIngredientDao } from './dao/recipe-ingredients.dao';

@Injectable()
export class RecipeService {
    constructor(
        @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
        @InjectRepository(RecipesIngredients) private recipeIngredientsRepo: Repository<RecipesIngredients>
    ) {}
    
        
    findAll() {
        return this.recipeRepository.find()
    }
        
    findById(id: number) {
        return this.recipeRepository.findOne(id)
    }

    async findByIngredients(ids: Array<number>) {
        const recipes = await this.findRecipes()
        const sortedIds = ids.sort()
        
        return recipes.reduce((acc, curr) => {
            const searchRecipe = curr.ingredients.every((ingredient, index) => ingredient.ingredientId === sortedIds[index])
            if (searchRecipe) {
                return [
                    {
                        recipeId: curr.recipeId,
                        recipeName: curr.recipeName
                    }
                ]
            }
            return acc
        }, [] as Array<RecipeNameModel>)

        // return this.recipeRepository
        //     .createQueryBuilder('R')
        //     .select('R.recipeId, R.name')
        //     .distinct()
        //     .innerJoin(RecipesIngredients, 'RI', 'R.recipeId = RI.recipeId')
        //     .where('RI.ingredientId IN(:...ids)', { ids })
        //     .getRawOne()
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

    async add(name: string, ids: Array<number>) {
        const newRecipe = this.recipeRepository.create({ name })
        const recipeId = await this.recipeRepository.save(newRecipe).then(saved => saved.recipeId)
        const newArr = ids.map(ingredientId => ({
            recipeId,
            ingredientId
        }))
        
        const newRI = this.recipeIngredientsRepo
            .createQueryBuilder()
            .insert()
            .into(RecipesIngredients)
            .values(newArr)
            .execute()

        return this.recipeRepository.save(newRecipe), newRI
    }

    remove(id: number) {
        return this.recipeRepository.delete(id)
    }
}
