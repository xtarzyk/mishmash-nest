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

    remove(id: number) {
        return this.ingredientRepository.delete(id)
    }
}
