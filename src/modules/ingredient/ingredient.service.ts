import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from 'src/lib/entities/ingredient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IngredientService {
    constructor(
        @InjectRepository(Ingredient)
        private ingredientRepository: Repository<Ingredient>,
    ) {}

    findAll() {
        return this.ingredientRepository.find()
    }

    findOne(id: number) {
        return this.ingredientRepository.findOne(id)
    }

    add(name: string) {
        const newIngredient = this.ingredientRepository.create({ name })
        return this.ingredientRepository.save(newIngredient) 
    }

    async edit(id: number, name: string) {
        const ingredient = await this.ingredientRepository.findOne(id)
        ingredient.name = name
        return this.ingredientRepository.save(ingredient)
    }

    remove(id: number) {
        return this.ingredientRepository.delete(id)
    }
}
