import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from 'src/lib/entities/recipe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecipeService {
    constructor(
        @InjectRepository(Recipe)
        private recipeRepository: Repository<Recipe>,
    ) {}

    findAll() {
        return this.recipeRepository.find()
    }

    findOne(id: number) {
        return this.recipeRepository.findOne(id)
    }

    add(name: string) {
        const newRecipe = this.recipeRepository.create({ name })
        return this.recipeRepository.save(newRecipe) 
    }

    remove(id: number) {
        return this.recipeRepository.delete(id)
    }
}
