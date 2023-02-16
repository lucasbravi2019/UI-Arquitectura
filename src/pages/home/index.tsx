import './index.scss'

import { useEffect } from 'react'

import RecipeCard from '../../components/budgets-card'
import SearchInput from '../../components/search-input'
import { Budget } from '../../interfaces/budget'
import {
    useAppDispatch,
    useAppSelector,
} from '../../redux/hooks/hooks'
import {
    budgetsFilterSelector,
    budgetsSelector,
    filterBudgetsByName,
    runLoadBudgets,
} from '../../redux/reducers/budgetSlice'

const HomePage = () => {
    const budgetSelector: Budget[] = useAppSelector(budgetsSelector)
    const budgetFilterSelect: Budget[] = useAppSelector(budgetsFilterSelector)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(runLoadBudgets())
    }, [])

    return (
        <>
            <SearchInput
                dispatch={(budget: string) => dispatch(filterBudgetsByName(budget))}
            />
            {
                budgetSelector.length < 1 && (
                    <h1>Actualmente no hay presupuestos</h1>
                )
            }
            <div className="recipes__container">
                {
                    budgetFilterSelect && budgetFilterSelect.length > 0 && budgetFilterSelect.map((budget, index) => (
                        <RecipeCard
                            key={index}
                            deletable={false}
                            updatable={false}
                            budget={budget}
                        />
                    ))
                }
                {
                    budgetSelector && budgetSelector.length > 0 && budgetFilterSelect && budgetFilterSelect.length === 0 && budgetSelector.map((budget, index) => (
                        <RecipeCard
                            key={index}
                            deletable={false}
                            updatable={false}
                            budget={budget}
                        />
                    ))
                }
            </div>
        </>
    )
}

export default HomePage