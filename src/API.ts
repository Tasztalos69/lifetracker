/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateMealInput = {
  id?: string | null,
  time?: string | null,
  dayID?: string | null,
};

export type ModelMealConditionInput = {
  time?: ModelStringInput | null,
  dayID?: ModelIDInput | null,
  and?: Array< ModelMealConditionInput | null > | null,
  or?: Array< ModelMealConditionInput | null > | null,
  not?: ModelMealConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Meal = {
  __typename: "Meal",
  id?: string,
  time?: string | null,
  dayID?: string | null,
  createdAt?: string,
  updatedAt?: string,
  Foods?: ModelFoodConnection,
};

export type ModelFoodConnection = {
  __typename: "ModelFoodConnection",
  items?:  Array<Food | null > | null,
  nextToken?: string | null,
};

export type Food = {
  __typename: "Food",
  id?: string,
  foodTypeID?: string | null,
  amount?: number | null,
  mealID?: string | null,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateMealInput = {
  id: string,
  time?: string | null,
  dayID?: string | null,
};

export type DeleteMealInput = {
  id?: string | null,
};

export type CreateFoodInput = {
  id?: string | null,
  foodTypeID?: string | null,
  amount?: number | null,
  mealID?: string | null,
};

export type ModelFoodConditionInput = {
  foodTypeID?: ModelIDInput | null,
  amount?: ModelIntInput | null,
  mealID?: ModelIDInput | null,
  and?: Array< ModelFoodConditionInput | null > | null,
  or?: Array< ModelFoodConditionInput | null > | null,
  not?: ModelFoodConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateFoodInput = {
  id: string,
  foodTypeID?: string | null,
  amount?: number | null,
  mealID?: string | null,
};

export type DeleteFoodInput = {
  id?: string | null,
};

export type CreateDayInput = {
  id?: string | null,
  personID?: string | null,
  date: string,
  sleep?: SleepInput | null,
  mealCount?: number | null,
  foodTotal?: number | null,
  supplements?: Array< SupplementTypeInput | null > | null,
};

export type SleepInput = {
  id: string,
  start: string,
  end: string,
  length?: string | null,
};

export type SupplementTypeInput = {
  name: string,
};

export type ModelDayConditionInput = {
  personID?: ModelIDInput | null,
  date?: ModelStringInput | null,
  mealCount?: ModelIntInput | null,
  foodTotal?: ModelIntInput | null,
  and?: Array< ModelDayConditionInput | null > | null,
  or?: Array< ModelDayConditionInput | null > | null,
  not?: ModelDayConditionInput | null,
};

export type Day = {
  __typename: "Day",
  id?: string,
  personID?: string | null,
  date?: string,
  sleep?: Sleep,
  mealCount?: number | null,
  foodTotal?: number | null,
  supplements?:  Array<SupplementType | null > | null,
  createdAt?: string,
  updatedAt?: string,
  Meals?: ModelMealConnection,
};

export type Sleep = {
  __typename: "Sleep",
  id?: string,
  start?: string,
  end?: string,
  length?: string | null,
};

export type SupplementType = {
  __typename: "SupplementType",
  name?: string,
};

export type ModelMealConnection = {
  __typename: "ModelMealConnection",
  items?:  Array<Meal | null > | null,
  nextToken?: string | null,
};

export type UpdateDayInput = {
  id: string,
  personID?: string | null,
  date?: string | null,
  sleep?: SleepInput | null,
  mealCount?: number | null,
  foodTotal?: number | null,
  supplements?: Array< SupplementTypeInput | null > | null,
};

export type DeleteDayInput = {
  id?: string | null,
};

export type CreatePersonInput = {
  id?: string | null,
  name: string,
};

export type ModelPersonConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelPersonConditionInput | null > | null,
  or?: Array< ModelPersonConditionInput | null > | null,
  not?: ModelPersonConditionInput | null,
};

export type Person = {
  __typename: "Person",
  id?: string,
  name?: string,
  createdAt?: string,
  updatedAt?: string,
  Days?: ModelDayConnection,
};

export type ModelDayConnection = {
  __typename: "ModelDayConnection",
  items?:  Array<Day | null > | null,
  nextToken?: string | null,
};

export type UpdatePersonInput = {
  id: string,
  name?: string | null,
};

export type DeletePersonInput = {
  id?: string | null,
};

export type CreateFoodTypeInput = {
  id?: string | null,
  name: string,
  foodCategoryID?: string | null,
};

export type ModelFoodTypeConditionInput = {
  name?: ModelStringInput | null,
  foodCategoryID?: ModelIDInput | null,
  and?: Array< ModelFoodTypeConditionInput | null > | null,
  or?: Array< ModelFoodTypeConditionInput | null > | null,
  not?: ModelFoodTypeConditionInput | null,
};

export type FoodType = {
  __typename: "FoodType",
  id?: string,
  name?: string,
  foodCategoryID?: string | null,
  createdAt?: string,
  updatedAt?: string,
  Foods?: ModelFoodConnection,
};

export type UpdateFoodTypeInput = {
  id: string,
  name?: string | null,
  foodCategoryID?: string | null,
};

export type DeleteFoodTypeInput = {
  id?: string | null,
};

export type CreateFoodCategoryInput = {
  id?: string | null,
  name: string,
  icon?: string | null,
};

export type ModelFoodCategoryConditionInput = {
  name?: ModelStringInput | null,
  icon?: ModelStringInput | null,
  and?: Array< ModelFoodCategoryConditionInput | null > | null,
  or?: Array< ModelFoodCategoryConditionInput | null > | null,
  not?: ModelFoodCategoryConditionInput | null,
};

export type FoodCategory = {
  __typename: "FoodCategory",
  id?: string,
  name?: string,
  icon?: string | null,
  createdAt?: string,
  updatedAt?: string,
  FoodTypes?: ModelFoodTypeConnection,
};

export type ModelFoodTypeConnection = {
  __typename: "ModelFoodTypeConnection",
  items?:  Array<FoodType | null > | null,
  nextToken?: string | null,
};

export type UpdateFoodCategoryInput = {
  id: string,
  name?: string | null,
  icon?: string | null,
};

export type DeleteFoodCategoryInput = {
  id?: string | null,
};

export type ModelMealFilterInput = {
  id?: ModelIDInput | null,
  time?: ModelStringInput | null,
  dayID?: ModelIDInput | null,
  and?: Array< ModelMealFilterInput | null > | null,
  or?: Array< ModelMealFilterInput | null > | null,
  not?: ModelMealFilterInput | null,
};

export type ModelFoodFilterInput = {
  id?: ModelIDInput | null,
  foodTypeID?: ModelIDInput | null,
  amount?: ModelIntInput | null,
  mealID?: ModelIDInput | null,
  and?: Array< ModelFoodFilterInput | null > | null,
  or?: Array< ModelFoodFilterInput | null > | null,
  not?: ModelFoodFilterInput | null,
};

export type ModelDayFilterInput = {
  id?: ModelIDInput | null,
  personID?: ModelIDInput | null,
  date?: ModelStringInput | null,
  mealCount?: ModelIntInput | null,
  foodTotal?: ModelIntInput | null,
  and?: Array< ModelDayFilterInput | null > | null,
  or?: Array< ModelDayFilterInput | null > | null,
  not?: ModelDayFilterInput | null,
};

export type ModelPersonFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelPersonFilterInput | null > | null,
  or?: Array< ModelPersonFilterInput | null > | null,
  not?: ModelPersonFilterInput | null,
};

export type ModelPersonConnection = {
  __typename: "ModelPersonConnection",
  items?:  Array<Person | null > | null,
  nextToken?: string | null,
};

export type ModelFoodTypeFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  foodCategoryID?: ModelIDInput | null,
  and?: Array< ModelFoodTypeFilterInput | null > | null,
  or?: Array< ModelFoodTypeFilterInput | null > | null,
  not?: ModelFoodTypeFilterInput | null,
};

export type ModelFoodCategoryFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  icon?: ModelStringInput | null,
  and?: Array< ModelFoodCategoryFilterInput | null > | null,
  or?: Array< ModelFoodCategoryFilterInput | null > | null,
  not?: ModelFoodCategoryFilterInput | null,
};

export type ModelFoodCategoryConnection = {
  __typename: "ModelFoodCategoryConnection",
  items?:  Array<FoodCategory | null > | null,
  nextToken?: string | null,
};

export type CreateMealMutationVariables = {
  input?: CreateMealInput,
  condition?: ModelMealConditionInput | null,
};

export type CreateMealMutation = {
  createMeal?:  {
    __typename: "Meal",
    id: string,
    time?: string | null,
    dayID?: string | null,
    createdAt: string,
    updatedAt: string,
    Foods?:  {
      __typename: "ModelFoodConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateMealMutationVariables = {
  input?: UpdateMealInput,
  condition?: ModelMealConditionInput | null,
};

export type UpdateMealMutation = {
  updateMeal?:  {
    __typename: "Meal",
    id: string,
    time?: string | null,
    dayID?: string | null,
    createdAt: string,
    updatedAt: string,
    Foods?:  {
      __typename: "ModelFoodConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteMealMutationVariables = {
  input?: DeleteMealInput,
  condition?: ModelMealConditionInput | null,
};

export type DeleteMealMutation = {
  deleteMeal?:  {
    __typename: "Meal",
    id: string,
    time?: string | null,
    dayID?: string | null,
    createdAt: string,
    updatedAt: string,
    Foods?:  {
      __typename: "ModelFoodConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateFoodMutationVariables = {
  input?: CreateFoodInput,
  condition?: ModelFoodConditionInput | null,
};

export type CreateFoodMutation = {
  createFood?:  {
    __typename: "Food",
    id: string,
    foodTypeID?: string | null,
    amount?: number | null,
    mealID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateFoodMutationVariables = {
  input?: UpdateFoodInput,
  condition?: ModelFoodConditionInput | null,
};

export type UpdateFoodMutation = {
  updateFood?:  {
    __typename: "Food",
    id: string,
    foodTypeID?: string | null,
    amount?: number | null,
    mealID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteFoodMutationVariables = {
  input?: DeleteFoodInput,
  condition?: ModelFoodConditionInput | null,
};

export type DeleteFoodMutation = {
  deleteFood?:  {
    __typename: "Food",
    id: string,
    foodTypeID?: string | null,
    amount?: number | null,
    mealID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateDayMutationVariables = {
  input?: CreateDayInput,
  condition?: ModelDayConditionInput | null,
};

export type CreateDayMutation = {
  createDay?:  {
    __typename: "Day",
    id: string,
    personID?: string | null,
    date: string,
    sleep?:  {
      __typename: "Sleep",
      id: string,
      start: string,
      end: string,
      length?: string | null,
    } | null,
    mealCount?: number | null,
    foodTotal?: number | null,
    supplements?:  Array< {
      __typename: "SupplementType",
      name: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    Meals?:  {
      __typename: "ModelMealConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateDayMutationVariables = {
  input?: UpdateDayInput,
  condition?: ModelDayConditionInput | null,
};

export type UpdateDayMutation = {
  updateDay?:  {
    __typename: "Day",
    id: string,
    personID?: string | null,
    date: string,
    sleep?:  {
      __typename: "Sleep",
      id: string,
      start: string,
      end: string,
      length?: string | null,
    } | null,
    mealCount?: number | null,
    foodTotal?: number | null,
    supplements?:  Array< {
      __typename: "SupplementType",
      name: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    Meals?:  {
      __typename: "ModelMealConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteDayMutationVariables = {
  input?: DeleteDayInput,
  condition?: ModelDayConditionInput | null,
};

export type DeleteDayMutation = {
  deleteDay?:  {
    __typename: "Day",
    id: string,
    personID?: string | null,
    date: string,
    sleep?:  {
      __typename: "Sleep",
      id: string,
      start: string,
      end: string,
      length?: string | null,
    } | null,
    mealCount?: number | null,
    foodTotal?: number | null,
    supplements?:  Array< {
      __typename: "SupplementType",
      name: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    Meals?:  {
      __typename: "ModelMealConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreatePersonMutationVariables = {
  input?: CreatePersonInput,
  condition?: ModelPersonConditionInput | null,
};

export type CreatePersonMutation = {
  createPerson?:  {
    __typename: "Person",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    Days?:  {
      __typename: "ModelDayConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdatePersonMutationVariables = {
  input?: UpdatePersonInput,
  condition?: ModelPersonConditionInput | null,
};

export type UpdatePersonMutation = {
  updatePerson?:  {
    __typename: "Person",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    Days?:  {
      __typename: "ModelDayConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeletePersonMutationVariables = {
  input?: DeletePersonInput,
  condition?: ModelPersonConditionInput | null,
};

export type DeletePersonMutation = {
  deletePerson?:  {
    __typename: "Person",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    Days?:  {
      __typename: "ModelDayConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateFoodTypeMutationVariables = {
  input?: CreateFoodTypeInput,
  condition?: ModelFoodTypeConditionInput | null,
};

export type CreateFoodTypeMutation = {
  createFoodType?:  {
    __typename: "FoodType",
    id: string,
    name: string,
    foodCategoryID?: string | null,
    createdAt: string,
    updatedAt: string,
    Foods?:  {
      __typename: "ModelFoodConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateFoodTypeMutationVariables = {
  input?: UpdateFoodTypeInput,
  condition?: ModelFoodTypeConditionInput | null,
};

export type UpdateFoodTypeMutation = {
  updateFoodType?:  {
    __typename: "FoodType",
    id: string,
    name: string,
    foodCategoryID?: string | null,
    createdAt: string,
    updatedAt: string,
    Foods?:  {
      __typename: "ModelFoodConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteFoodTypeMutationVariables = {
  input?: DeleteFoodTypeInput,
  condition?: ModelFoodTypeConditionInput | null,
};

export type DeleteFoodTypeMutation = {
  deleteFoodType?:  {
    __typename: "FoodType",
    id: string,
    name: string,
    foodCategoryID?: string | null,
    createdAt: string,
    updatedAt: string,
    Foods?:  {
      __typename: "ModelFoodConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateFoodCategoryMutationVariables = {
  input?: CreateFoodCategoryInput,
  condition?: ModelFoodCategoryConditionInput | null,
};

export type CreateFoodCategoryMutation = {
  createFoodCategory?:  {
    __typename: "FoodCategory",
    id: string,
    name: string,
    icon?: string | null,
    createdAt: string,
    updatedAt: string,
    FoodTypes?:  {
      __typename: "ModelFoodTypeConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateFoodCategoryMutationVariables = {
  input?: UpdateFoodCategoryInput,
  condition?: ModelFoodCategoryConditionInput | null,
};

export type UpdateFoodCategoryMutation = {
  updateFoodCategory?:  {
    __typename: "FoodCategory",
    id: string,
    name: string,
    icon?: string | null,
    createdAt: string,
    updatedAt: string,
    FoodTypes?:  {
      __typename: "ModelFoodTypeConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteFoodCategoryMutationVariables = {
  input?: DeleteFoodCategoryInput,
  condition?: ModelFoodCategoryConditionInput | null,
};

export type DeleteFoodCategoryMutation = {
  deleteFoodCategory?:  {
    __typename: "FoodCategory",
    id: string,
    name: string,
    icon?: string | null,
    createdAt: string,
    updatedAt: string,
    FoodTypes?:  {
      __typename: "ModelFoodTypeConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type GetMealQueryVariables = {
  id?: string,
};

export type GetMealQuery = {
  getMeal?:  {
    __typename: "Meal",
    id: string,
    time?: string | null,
    dayID?: string | null,
    createdAt: string,
    updatedAt: string,
    Foods?:  {
      __typename: "ModelFoodConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListMealsQueryVariables = {
  filter?: ModelMealFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMealsQuery = {
  listMeals?:  {
    __typename: "ModelMealConnection",
    items?:  Array< {
      __typename: "Meal",
      id: string,
      time?: string | null,
      dayID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetFoodQueryVariables = {
  id?: string,
};

export type GetFoodQuery = {
  getFood?:  {
    __typename: "Food",
    id: string,
    foodTypeID?: string | null,
    amount?: number | null,
    mealID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListFoodsQueryVariables = {
  filter?: ModelFoodFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFoodsQuery = {
  listFoods?:  {
    __typename: "ModelFoodConnection",
    items?:  Array< {
      __typename: "Food",
      id: string,
      foodTypeID?: string | null,
      amount?: number | null,
      mealID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetDayQueryVariables = {
  id?: string,
};

export type GetDayQuery = {
  getDay?:  {
    __typename: "Day",
    id: string,
    personID?: string | null,
    date: string,
    sleep?:  {
      __typename: "Sleep",
      id: string,
      start: string,
      end: string,
      length?: string | null,
    } | null,
    mealCount?: number | null,
    foodTotal?: number | null,
    supplements?:  Array< {
      __typename: "SupplementType",
      name: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    Meals?:  {
      __typename: "ModelMealConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListDaysQueryVariables = {
  filter?: ModelDayFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDaysQuery = {
  listDays?:  {
    __typename: "ModelDayConnection",
    items?:  Array< {
      __typename: "Day",
      id: string,
      personID?: string | null,
      date: string,
      mealCount?: number | null,
      foodTotal?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetPersonQueryVariables = {
  id?: string,
};

export type GetPersonQuery = {
  getPerson?:  {
    __typename: "Person",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    Days?:  {
      __typename: "ModelDayConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListPersonsQueryVariables = {
  filter?: ModelPersonFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPersonsQuery = {
  listPersons?:  {
    __typename: "ModelPersonConnection",
    items?:  Array< {
      __typename: "Person",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetFoodTypeQueryVariables = {
  id?: string,
};

export type GetFoodTypeQuery = {
  getFoodType?:  {
    __typename: "FoodType",
    id: string,
    name: string,
    foodCategoryID?: string | null,
    createdAt: string,
    updatedAt: string,
    Foods?:  {
      __typename: "ModelFoodConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListFoodTypesQueryVariables = {
  filter?: ModelFoodTypeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFoodTypesQuery = {
  listFoodTypes?:  {
    __typename: "ModelFoodTypeConnection",
    items?:  Array< {
      __typename: "FoodType",
      id: string,
      name: string,
      foodCategoryID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetFoodCategoryQueryVariables = {
  id?: string,
};

export type GetFoodCategoryQuery = {
  getFoodCategory?:  {
    __typename: "FoodCategory",
    id: string,
    name: string,
    icon?: string | null,
    createdAt: string,
    updatedAt: string,
    FoodTypes?:  {
      __typename: "ModelFoodTypeConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListFoodCategorysQueryVariables = {
  filter?: ModelFoodCategoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFoodCategorysQuery = {
  listFoodCategorys?:  {
    __typename: "ModelFoodCategoryConnection",
    items?:  Array< {
      __typename: "FoodCategory",
      id: string,
      name: string,
      icon?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateMealSubscription = {
  onCreateMeal?:  {
    __typename: "Meal",
    id: string,
    time?: string | null,
    dayID?: string | null,
    createdAt: string,
    updatedAt: string,
    Foods?:  {
      __typename: "ModelFoodConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateMealSubscription = {
  onUpdateMeal?:  {
    __typename: "Meal",
    id: string,
    time?: string | null,
    dayID?: string | null,
    createdAt: string,
    updatedAt: string,
    Foods?:  {
      __typename: "ModelFoodConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteMealSubscription = {
  onDeleteMeal?:  {
    __typename: "Meal",
    id: string,
    time?: string | null,
    dayID?: string | null,
    createdAt: string,
    updatedAt: string,
    Foods?:  {
      __typename: "ModelFoodConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateFoodSubscription = {
  onCreateFood?:  {
    __typename: "Food",
    id: string,
    foodTypeID?: string | null,
    amount?: number | null,
    mealID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateFoodSubscription = {
  onUpdateFood?:  {
    __typename: "Food",
    id: string,
    foodTypeID?: string | null,
    amount?: number | null,
    mealID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteFoodSubscription = {
  onDeleteFood?:  {
    __typename: "Food",
    id: string,
    foodTypeID?: string | null,
    amount?: number | null,
    mealID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateDaySubscription = {
  onCreateDay?:  {
    __typename: "Day",
    id: string,
    personID?: string | null,
    date: string,
    sleep?:  {
      __typename: "Sleep",
      id: string,
      start: string,
      end: string,
      length?: string | null,
    } | null,
    mealCount?: number | null,
    foodTotal?: number | null,
    supplements?:  Array< {
      __typename: "SupplementType",
      name: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    Meals?:  {
      __typename: "ModelMealConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateDaySubscription = {
  onUpdateDay?:  {
    __typename: "Day",
    id: string,
    personID?: string | null,
    date: string,
    sleep?:  {
      __typename: "Sleep",
      id: string,
      start: string,
      end: string,
      length?: string | null,
    } | null,
    mealCount?: number | null,
    foodTotal?: number | null,
    supplements?:  Array< {
      __typename: "SupplementType",
      name: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    Meals?:  {
      __typename: "ModelMealConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteDaySubscription = {
  onDeleteDay?:  {
    __typename: "Day",
    id: string,
    personID?: string | null,
    date: string,
    sleep?:  {
      __typename: "Sleep",
      id: string,
      start: string,
      end: string,
      length?: string | null,
    } | null,
    mealCount?: number | null,
    foodTotal?: number | null,
    supplements?:  Array< {
      __typename: "SupplementType",
      name: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    Meals?:  {
      __typename: "ModelMealConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreatePersonSubscription = {
  onCreatePerson?:  {
    __typename: "Person",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    Days?:  {
      __typename: "ModelDayConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdatePersonSubscription = {
  onUpdatePerson?:  {
    __typename: "Person",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    Days?:  {
      __typename: "ModelDayConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeletePersonSubscription = {
  onDeletePerson?:  {
    __typename: "Person",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    Days?:  {
      __typename: "ModelDayConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateFoodTypeSubscription = {
  onCreateFoodType?:  {
    __typename: "FoodType",
    id: string,
    name: string,
    foodCategoryID?: string | null,
    createdAt: string,
    updatedAt: string,
    Foods?:  {
      __typename: "ModelFoodConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateFoodTypeSubscription = {
  onUpdateFoodType?:  {
    __typename: "FoodType",
    id: string,
    name: string,
    foodCategoryID?: string | null,
    createdAt: string,
    updatedAt: string,
    Foods?:  {
      __typename: "ModelFoodConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteFoodTypeSubscription = {
  onDeleteFoodType?:  {
    __typename: "FoodType",
    id: string,
    name: string,
    foodCategoryID?: string | null,
    createdAt: string,
    updatedAt: string,
    Foods?:  {
      __typename: "ModelFoodConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateFoodCategorySubscription = {
  onCreateFoodCategory?:  {
    __typename: "FoodCategory",
    id: string,
    name: string,
    icon?: string | null,
    createdAt: string,
    updatedAt: string,
    FoodTypes?:  {
      __typename: "ModelFoodTypeConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateFoodCategorySubscription = {
  onUpdateFoodCategory?:  {
    __typename: "FoodCategory",
    id: string,
    name: string,
    icon?: string | null,
    createdAt: string,
    updatedAt: string,
    FoodTypes?:  {
      __typename: "ModelFoodTypeConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteFoodCategorySubscription = {
  onDeleteFoodCategory?:  {
    __typename: "FoodCategory",
    id: string,
    name: string,
    icon?: string | null,
    createdAt: string,
    updatedAt: string,
    FoodTypes?:  {
      __typename: "ModelFoodTypeConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};
