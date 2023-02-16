import {
    useEffect,
    useState,
} from 'react'

import BudgetsCard from '../../../components/budgets-card'
import RecipeCard from '../../../components/budgets-card'
import FormCreateBudget from '../../../components/form-create-budget'
import SearchInput from '../../../components/search-input'
import { Budget } from '../../../interfaces/budget'
import {
    useAppDispatch,
    useAppSelector,
} from '../../../redux/hooks/hooks'
import {
    budgetsFilterSelector,
    budgetsSelector,
    filterBudgetsByName,
    runAddBudget,
    runLoadBudgets,
    runUpdateBudget,
} from '../../../redux/reducers/budgetSlice'
import { resetMessages } from '../../../redux/reducers/messageSlice'

const initialValue = {
    id: '',
    name: ''
}

const BudgetPage = () => {
    const dispatch = useAppDispatch()
    const budgetSelector = useAppSelector(budgetsSelector)
    const budgetFilterSelector = useAppSelector(budgetsFilterSelector)
    const [inputValue, setInputValue] = useState<Budget>(initialValue)
    const [updating, setUpdating] = useState(false)

    useEffect(() => {
        dispatch(resetMessages())
        dispatch(runLoadBudgets())
    }, [])

    const handleCreateBudget = (budgetName: any) => dispatch(runAddBudget(budgetName))
    const handleUpdateBudget = (budgetName: any) => {
        dispatch(runUpdateBudget(budgetName))
        setUpdating(false)
        setInputValue(initialValue)
    }

    useEffect(() => {
        if (!updating) {
            setInputValue(initialValue)
        }
    }, [updating])

    return (
        <section>
            <h1>Crear Presupuesto</h1>
            <FormCreateBudget
                initialValues={inputValue}
                onSubmit={updating ? handleUpdateBudget : handleCreateBudget}
                update={updating}
                setUpdate={setUpdating}
            />
            <SearchInput
                dispatch={(budget: string) => dispatch(filterBudgetsByName(budget))}
            />
            {
                budgetSelector.length === 0 && (
                    <h3>No hay Presupuestos</h3>
                )
            }
            {
                budgetFilterSelector && budgetFilterSelector.length > 0 && (
                    <section className='recipes__container'>
                        {
                            budgetFilterSelector.map(budget => (
                                <BudgetsCard
                                    budget={budget}
                                    deletable={true}
                                    updatable={true}
                                    setValue={setInputValue}
                                    setUpdating={setUpdating}
                                    key={budget.id}
                                />
                            ))
                        }
                    </section>
                )
            }
            {
                budgetSelector && budgetFilterSelector.length == 0 && (
                    <section className='recipes__container'>
                        {
                            budgetSelector.map(budget => (
                                <RecipeCard
                                    budget={budget}
                                    deletable={true}
                                    updatable={true}
                                    setValue={setInputValue}
                                    setUpdating={setUpdating}
                                    key={budget.id}
                                />
                            ))
                        }
                    </section>
                )
            }
        </section>
    )
}

export default BudgetPage