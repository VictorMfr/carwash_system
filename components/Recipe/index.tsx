'use client';

import withUIDisplayControls from "@/HOC/withUIDisplayControls";
import { RecipeProvider } from "./ContextProvider";
import RecipePage from "./RecipePage/RecipePage";

const RecipeIndex = () => {
    return (
        <RecipeProvider>
            <RecipePage/>
        </RecipeProvider>
    )
}

export default withUIDisplayControls(RecipeIndex);
