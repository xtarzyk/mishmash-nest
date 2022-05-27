import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RecipesIngredients } from './recipesIngredients.entity';

@Entity({ name: 'ingredients' })
export class Ingredient {
  @PrimaryGeneratedColumn()
  ingredientId: number;

  @Column()
  name: string;

  @OneToMany(() => RecipesIngredients, recipesIngredients => recipesIngredients.ingredient)
  recipesIngredients: Array<RecipesIngredients>
}
