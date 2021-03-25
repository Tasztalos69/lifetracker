// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Meal, Food, Day, Person, FoodType, FoodCategory, SupplementType, Sleep } = initSchema(schema);

export {
  Meal,
  Food,
  Day,
  Person,
  FoodType,
  FoodCategory,
  SupplementType,
  Sleep
};