import { Entity, Column, PrimaryGeneratedColumn, TableForeignKey, ManyToMany, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { Recipe } from './recipe.entity';

@Entity()
export class RecipesIngredients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ingredientId: number;

  @Column()
  recipeId: number;

  @ManyToOne(
      () => Ingredient,
      ingredient => ingredient.recipesIngredients
  )
  @JoinColumn({ name: 'ingredientId' })
  ingredient: Array<Ingredient>

  @ManyToOne(
      () => Recipe,
      recipe => recipe.recipesIngredients
  )
  @JoinColumn({ name: 'recipeId' })
  recipe: Array<Recipe>
}