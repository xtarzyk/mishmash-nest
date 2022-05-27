import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { RecipesIngredients } from './recipesIngredients.entity'

@Entity({ name: 'recipes' })
export class Recipe {
  @PrimaryGeneratedColumn()
  recipeId: number;

  @Column()
  name: string;

  @OneToMany(() => RecipesIngredients, recipesIngredients => recipesIngredients.recipe)
  recipesIngredients: Array<RecipesIngredients>
}