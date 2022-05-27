import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from 'src/lib/entities/ingredient.entity';
import { Recipe } from 'src/lib/entities/recipe.entity';
import { RecipesIngredients } from 'src/lib/entities/recipesIngredients.entity';
import { Repository } from 'typeorm';

type Test = {
    recipeName: string,
    ingredientName: string
}

@Injectable()
export class RecipeService {
    constructor(
        @InjectRepository(Recipe)
        private recipeRepository: Repository<Recipe>,

        @InjectRepository(RecipesIngredients)
        private recipesIngredientsRepository: Repository<RecipesIngredients>
        ) {}
        
    findAll() {
        return this.recipeRepository.find()
    }
        
    findById(id: number) {
        return this.recipeRepository.findOne(id)
    }

    findByIngredients(ids: Array<number>) {
        return this.recipeRepository
            .createQueryBuilder('R')
            .select('R.name AS recipeName, R.recipeId, I.name AS ingredientName, I.ingredientId')
            .innerJoin(RecipesIngredients, 'RI', 'R.recipeId = RI.recipeId')
            .innerJoin(Ingredient, 'I', 'I.ingredientId = RI.ingredientId')
            .getRawMany<Test>()
    }
        
    findRecipe() {
        return this.recipeRepository
            .createQueryBuilder('R')
            .select('R.name AS recipeName, I.name AS ingredientName')
            .innerJoin(RecipesIngredients, 'RI', 'R.recipeId = RI.recipeId')
            .innerJoin(Ingredient, 'I', 'I.ingredientId = RI.ingredientId')
            .getRawMany<Test>()
    }

    add(name: string) {
        const newRecipe = this.recipeRepository.create({ name })
        return this.recipeRepository.save(newRecipe) 
    }

    remove(id: number) {
        return this.recipeRepository.delete(id)
    }
}
