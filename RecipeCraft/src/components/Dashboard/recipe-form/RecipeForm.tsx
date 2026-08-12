import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import type {
  RecipeFormData,
  RecipeIngredient,
  RecipeInstruction,
} from "../../../types/recipe.types";

import RecipeBasicInfo from "./RecipeBasicInfo";
import RecipeImageUpload from "./RecipeImageUpload";
import RecipeDetails from "./RecipeDetails";
import IngredientEditor from "./IngredientEditor";
import InstructionEditor from "./InstructionEditor";
import RecipeAdditionalInfo from "./RecipeAdditionalInfo";
import RecipeFormActions from "./RecipeFormActions";

interface Props {
  initialData?: Partial<RecipeFormData>;
  isEditing?: boolean;
}

export default function RecipeForm({
  initialData,
  isEditing = false,
}: Props) {
  const navigate = useNavigate();

  const [title, setTitle] = useState(
    initialData?.title ?? ""
  );

  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );

  const [image, setImage] = useState(
    initialData?.image ?? ""
  );

  const [category, setCategory] = useState(
    initialData?.category ?? ""
  );

  const [cuisine, setCuisine] = useState(
    initialData?.cuisine ?? ""
  );

  const [tags, setTags] = useState<string[]>(
    initialData?.tags ?? []
  );

  const [prepTime, setPrepTime] = useState(
    initialData?.prepTime ?? ""
  );

  const [cookTime, setCookTime] = useState(
    initialData?.cookTime ?? ""
  );

  const [servings, setServings] = useState(
    initialData?.servings ?? ""
  );

  const [difficulty, setDifficulty] = useState<
    "Easy" | "Medium" | "Hard"
  >(initialData?.difficulty ?? "Easy");

  const [ingredients, setIngredients] = useState<
    RecipeIngredient[]
  >(
    initialData?.ingredients ?? [
      {
        id: crypto.randomUUID(),
        name: "",
        quantity: "",
        unit: "",
      },
    ]
  );

  const [instructions, setInstructions] = useState<
    RecipeInstruction[]
  >(
    initialData?.instructions ?? [
      {
        id: crypto.randomUUID(),
        step: 1,
        description: "",
      },
    ]
  );

  const [nutrition, setNutrition] = useState(
    initialData?.nutrition ?? {
      calories: "",
      protein: "",
      carbohydrates: "",
      fat: "",
    }
  );

  const [tips, setTips] = useState(
    initialData?.tips ?? ""
  );

  const [notes, setNotes] = useState(
    initialData?.notes ?? ""
  );

  const buildRecipeData = (
    status: "draft" | "published"
  ): RecipeFormData => ({
    title,
    description,
    image,
    category,
    cuisine,
    tags,
    prepTime,
    cookTime,
    servings,
    difficulty,
    ingredients,
    instructions,
    nutrition,
    tips,
    notes,
    status,
  });

  const handleSaveDraft = () => {
    const data = buildRecipeData("draft");

    console.log("Saving draft:", data);

    // Later:
    // POST /api/recipes
    // or PUT /api/recipes/:id

    navigate("/dashboard/recipes");
  };

  const handlePublish = () => {
    const data = buildRecipeData("published");

    console.log("Publishing recipe:", data);

    // Later:
    // POST /api/recipes

    navigate("/dashboard/recipes");
  };

  const handlePreview = () => {
    console.log(
      buildRecipeData("draft")
    );

    // Later we'll open the actual preview page.
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={(e) => e.preventDefault()}
      className="space-y-5"
    >
      <RecipeBasicInfo
        title={title}
        description={description}
        category={category}
        cuisine={cuisine}
        tags={tags}
        setTitle={setTitle}
        setDescription={setDescription}
        setCategory={setCategory}
        setCuisine={setCuisine}
        setTags={setTags}
      />

      <RecipeImageUpload
        image={image}
        setImage={setImage}
      />

      <RecipeDetails
        prepTime={prepTime}
        cookTime={cookTime}
        servings={servings}
        difficulty={difficulty}
        setPrepTime={setPrepTime}
        setCookTime={setCookTime}
        setServings={setServings}
        setDifficulty={setDifficulty}
      />

      <IngredientEditor
        ingredients={ingredients}
        setIngredients={setIngredients}
      />

      <InstructionEditor
        instructions={instructions}
        setInstructions={setInstructions}
      />

      <RecipeAdditionalInfo
        nutrition={nutrition}
        tips={tips}
        notes={notes}
        setNutrition={setNutrition}
        setTips={setTips}
        setNotes={setNotes}
      />

      <RecipeFormActions
        isEditing={isEditing}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
        onPreview={handlePreview}
      />
    </motion.form>
  );
}