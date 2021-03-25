import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class SupplementType {
  readonly name: string;
  constructor(init: ModelInit<SupplementType>);
}

export declare class Sleep {
  readonly id: string;
  readonly start: string;
  readonly end: string;
  readonly length?: string;
  constructor(init: ModelInit<Sleep>);
}

export declare class Meal {
  readonly id: string;
  readonly time?: string;
  readonly Foods?: Food[];
  readonly dayID?: string;
  constructor(init: ModelInit<Meal>);
  static copyOf(source: Meal, mutator: (draft: MutableModel<Meal>) => MutableModel<Meal> | void): Meal;
}

export declare class Food {
  readonly id: string;
  readonly foodTypeID?: string;
  readonly amount?: number;
  readonly mealID?: string;
  constructor(init: ModelInit<Food>);
  static copyOf(source: Food, mutator: (draft: MutableModel<Food>) => MutableModel<Food> | void): Food;
}

export declare class Day {
  readonly id: string;
  readonly personID?: string;
  readonly date: string;
  readonly sleep?: Sleep;
  readonly mealCount?: number;
  readonly foodTotal?: number;
  readonly Meals?: (Meal | null)[];
  readonly supplements?: (SupplementType | null)[];
  constructor(init: ModelInit<Day>);
  static copyOf(source: Day, mutator: (draft: MutableModel<Day>) => MutableModel<Day> | void): Day;
}

export declare class Person {
  readonly id: string;
  readonly name: string;
  readonly Days?: (Day | null)[];
  constructor(init: ModelInit<Person>);
  static copyOf(source: Person, mutator: (draft: MutableModel<Person>) => MutableModel<Person> | void): Person;
}

export declare class FoodType {
  readonly id: string;
  readonly name: string;
  readonly foodCategoryID?: string;
  readonly Foods?: (Food | null)[];
  constructor(init: ModelInit<FoodType>);
  static copyOf(source: FoodType, mutator: (draft: MutableModel<FoodType>) => MutableModel<FoodType> | void): FoodType;
}

export declare class FoodCategory {
  readonly id: string;
  readonly name: string;
  readonly icon?: string;
  readonly FoodTypes?: (FoodType | null)[];
  constructor(init: ModelInit<FoodCategory>);
  static copyOf(source: FoodCategory, mutator: (draft: MutableModel<FoodCategory>) => MutableModel<FoodCategory> | void): FoodCategory;
}