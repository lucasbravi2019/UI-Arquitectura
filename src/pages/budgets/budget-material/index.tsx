import { useEffect } from 'react'

import FormRecipeIngredient from '../../../components/form-budget-material'
import MessagePopup from '../../../components/message-popup'
import {
    BudgetMaterialForm,
    MaterialMultiDimension,
} from '../../../interfaces/budget'
import {
    useAppDispatch,
    useAppSelector,
} from '../../../redux/hooks/hooks'
import {
    runAddMaterialToBudget,
} from '../../../redux/reducers/budgetMaterialSlice'
import {
    budgetsSelector,
    runLoadBudgets,
} from '../../../redux/reducers/budgetSlice'
import {
    materialsSelector,
    runLoadMaterials,
} from '../../../redux/reducers/materialSlice'

const getPackageByIngredientId = (ingredientId: string, ingredients: MaterialMultiDimension[]) => {
    const ingredient = ingredients.filter(ingrediente => ingrediente.id === ingredientId)
    if (ingredient.length > 0 && ingredient[0].dimensions) {
        return ingredient[0].dimensions.map(dimension => {
            return {
                id: `${dimension.quantity} ${dimension.metric}`,
                name: `${dimension.quantity} ${dimension.metric}`
            }
        })
    }
    return []
}

const initialValues: BudgetMaterialForm = {
    materialId: '',
    metric: '',
    quantity: 0,
    budgetId: ''
}

const BudgetMaterialPage = () => {
    const dispatch = useAppDispatch()
    const materialSelector = useAppSelector(materialsSelector)
    const budgetSelector = useAppSelector(budgetsSelector)

    const handleSubmit = (body: any) => dispatch(runAddMaterialToBudget(body))

    useEffect(() => {
        dispatch(runLoadBudgets())
        dispatch(runLoadMaterials())
    }, [])

    return (
        <section>
            <h1>Agregar Ingredientes a Receta</h1>
            <FormRecipeIngredient
                materials={materialSelector}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                budgets={budgetSelector}
                packageSelector={getPackageByIngredientId}
            />
            <MessagePopup />
        </section>
    )
}

export default BudgetMaterialPage