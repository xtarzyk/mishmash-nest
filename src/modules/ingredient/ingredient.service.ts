import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Ingredient } from 'src/lib/entities/ingredient.entity'
import { Repository } from 'typeorm'

@Injectable()
export class IngredientService {
    constructor(
        @InjectRepository(Ingredient)
        private ingredientRepository: Repository<Ingredient>,
    ) {}

    findAll() {
        return this.ingredientRepository.find()
    }

    findOneById(id: number) {
        console.log(id, 'by-id')
        return this.ingredientRepository.findOne(id)
    }

    findOneByName(name: string) {
        console.log(name, 'by-name')
        const ingredient = this.ingredientRepository.findOne({ where: { name } })
        console.log(ingredient)
        return ingredient
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
