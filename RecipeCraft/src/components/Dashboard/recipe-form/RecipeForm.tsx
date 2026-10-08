import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

import type {
  RecipeCategory,
  RecipeCuisine,
  RecipeDifficulty,
  RecipeFormData,
  RecipeIngredient,
  RecipeInstruction,
  RecipeStatus,
} from "../../../types/recipe.types";

import {
  useCreateRecipeMutation,
} from "../../../features/recipes/recipeApi";

import {
  prepareRecipePayload,
} from "../../../features/recipes/recipeUtils";

import RecipeBasicInfo from "./RecipeBasicInfo";
import RecipeImageUpload from "./RecipeImageUpload";
import RecipeDetails from "./RecipeDetails";
import IngredientEditor from "./IngredientEditor";
import InstructionEditor from "./InstructionEditor";
import RecipeAdditionalInfo from "./RecipeAdditionalInfo";
import RecipeFormActions from "./RecipeFormActions";


interface RecipeFormProps {
  initialData?: RecipeFormData;

  mode?: "create" | "edit";

  isSubmitting?: boolean;

  onSaveDraft: (
    data: RecipeFormData
  ) => Promise<void> | void;

  onPublish: (
    data: RecipeFormData
  ) => Promise<void> | void;
}


/* =========================================================
   PUBLISH VALIDATION
========================================================= */

const validateForPublish = (
  form: RecipeFormData
): string | null => {
  if (!form.title.trim()) {
    return "Recipe title is required.";
  }

  if (!form.category) {
    return "Please select a category.";
  }

  const validIngredients =
    form.ingredients.filter(
      (ingredient) =>
        ingredient.name.trim()
    );

  if (validIngredients.length === 0) {
    return "Add at least one ingredient.";
  }

  const validInstructions =
    form.instructions.filter(
      (instruction) =>
        instruction.description.trim()
    );

  if (validInstructions.length === 0) {
    return "Add at least one instruction.";
  }

  return null;
};


/* =========================================================
   API ERROR
========================================================= */

interface ApiError {
  status?: number;

  data?: {
    success?: boolean;
    message?: string;
  };
}


const getApiErrorMessage = (
  error: unknown
): string => {
  const apiError =
    error as ApiError;

  return (
    apiError?.data?.message ??
    "Something went wrong."
  );
};


/* =========================================================
   COMPONENT
========================================================= */

export default function RecipeForm({
  initialData,
  mode = "create",
  isSubmitting = false,
  onSaveDraft,
  onPublish, 

}: RecipeFormProps) {
  const navigate =
    useNavigate();


  /* =======================================================
     CREATE RECIPE MUTATION
  ======================================================= */

  const [
    createRecipe,
    { isLoading },
  ] = useCreateRecipeMutation();


  /* =======================================================
     FORM STATE
  ======================================================= */

  const [title, setTitle] =
    useState(
      initialData?.title ?? ""
    );


  const [
    description,
    setDescription,
  ] = useState(
    initialData?.description ?? ""
  );


  const [
    coverImage,
    setCoverImage,
  ] = useState(
    initialData?.coverImage ?? ""
  );


  const [
    category,
    setCategory,
  ] = useState<RecipeCategory>(
    initialData?.category ?? "Appetizer"
  );


  const [
    cuisine,
    setCuisine,
  ] = useState<RecipeCuisine>(
    initialData?.cuisine ?? "Indian"
  );


  const [tags, setTags] =
    useState<string[]>(
      initialData?.tags ?? []
    );


  const [
    prepTime,
    setPrepTime,
  ] = useState(
    Number(initialData?.prepTime ?? 0)
  );


  const [
    cookTime,
    setCookTime,
  ] = useState(
    Number(initialData?.cookTime ?? 0)
  );


  const [
    servings,
    setServings,
  ] = useState(
    Number(initialData?.servings ?? 1)
  );


  const [
    difficulty,
    setDifficulty,
  ] = useState<RecipeDifficulty>(
    initialData?.difficulty ?? "Easy"
  );


  const [
    ingredients,
    setIngredients,
  ] = useState<
    RecipeIngredient[]
  >(
    initialData?.ingredients ?? [
      {
        id: crypto.randomUUID(),
        name: "",
        quantity: "",
        unit: "" as RecipeIngredient["unit"],
      },
    ]
  );


  const [
    instructions,
    setInstructions,
  ] = useState<
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


  const [
    nutrition,
    setNutrition,
  ] = useState(
    initialData?.nutrition ?? {
      calories: "",
      protein: "",
      carbohydrates: "",
      fat: "",
    }
  );


  const [tips, setTips] =
    useState(
      initialData?.tips ?? ""
    );


  const [notes, setNotes] =
    useState(
      initialData?.notes ?? ""
    );


  /* =======================================================
     SUBMITTING STATUS

     Used only for button UI:
     "Saving..." / "Publishing..."
  ======================================================= */

  const [
    submittingStatus,
    setSubmittingStatus,
  ] = useState<
    RecipeStatus | null
  >(null);


  /* =======================================================
     BUILD CURRENT FORM DATA

     Notice:
     status is NOT included here.
  ======================================================= */

  const getFormData =
    (): RecipeFormData => ({
      title,

      description,

      coverImage,

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
    });


  /* =======================================================
     SAVE / PUBLISH
  ======================================================= */

  const handleSubmitRecipe =
    async (
      status: RecipeStatus
    ) => {
      const currentForm =
        getFormData();


      /* =========================
         PUBLISH VALIDATION
      ========================= */

      if (
        status === "published"
      ) {
        const validationError =
          validateForPublish(
            currentForm
          );

        if (validationError) {
          toast.error(
            validationError
          );

          return;
        }
      }


      /* =========================
         PREPARE API PAYLOAD
      ========================= */

      const payload =
        prepareRecipePayload(
          currentForm,
          status
        );


      try {
        setSubmittingStatus(
          status
        );


        /* =======================
           POST /recipes
        ======================= */

        const response =
          await createRecipe(
            payload
          ).unwrap();


        /* =======================
           SUCCESS
        ======================= */

        toast.success(
          response.message
        );


        /* =======================
           NAVIGATION
        ======================= */

        if (
          status === "published"
        ) {
          navigate(
            "/dashboard/recipes"
          );
        } 

      } catch (error) {
        console.error(
          "Recipe creation error:",
          error
        );

        toast.error(
          getApiErrorMessage(
            error
          )
        );

      } finally {
        setSubmittingStatus(
          null
        );
      }
    };


  /* =======================================================
     PREVIEW
  ======================================================= */

  const handlePreview = () => {
    const data =
      getFormData();

    console.log(
      "Recipe preview:",
      data
    );

    // Later:
    // navigate to preview page
    // or open preview modal.
  };


  /* =======================================================
     UI
  ======================================================= */

  return (
    <motion.form
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      onSubmit={(e) =>
        e.preventDefault()
      }
      className="space-y-5"
    >
      <RecipeBasicInfo
        title={title}
        description={
          description
        }
        category={category}
        cuisine={cuisine}
        tags={tags}
        setTitle={setTitle}
        setDescription={
          setDescription
        }
        setCategory={(value: string) =>
          setCategory(value as RecipeCategory)
        }
        setCuisine={(value: string) =>
          setCuisine(value as RecipeCuisine)
        }
        setTags={setTags}
      />


      <RecipeImageUpload
        image={coverImage}
        setImage={
          setCoverImage
        }
      />


      <RecipeDetails
        prepTime={prepTime}
        cookTime={cookTime}
        servings={servings}
        difficulty={
          difficulty
        }
        setPrepTime={
          setPrepTime
        }
        setCookTime={
          setCookTime
        }
        setServings={
          setServings
        }
        setDifficulty={
          setDifficulty
        }
      />


      <IngredientEditor
        ingredients={
          ingredients
        }
        setIngredients={
          setIngredients
        }
      />


      <InstructionEditor
        instructions={
          instructions
        }
        setInstructions={
          setInstructions
        }
      />


      <RecipeAdditionalInfo
        nutrition={
          nutrition
        }
        tips={tips}
        notes={notes}
        setNutrition={
          setNutrition
        }
        setTips={setTips}
        setNotes={setNotes}
      />


      <RecipeFormActions
        isEditing={
          isEditing
        }
        isLoading={
          isLoading
        }
        submittingStatus={
          submittingStatus
        }
        onSaveDraft={() =>
          onSaveDraft()
        }
        onPublish={() =>
          handleSubmitRecipe(
            "published"
          )
        }
        onPreview={
          handlePreview
        }
      />
    </motion.form>
  );
}