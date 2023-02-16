import './index.scss'

import { useEffect } from 'react'

import { useParams } from 'react-router-dom'

import BudgetDetailedCard from '../../../components/budget-detailed-card'
import {
    useAppDispatch,
    useAppSelector,
} from '../../../redux/hooks/hooks'
import {
    budgetSelector,
    runLoadBudget,
} from '../../../redux/reducers/budgetSlice'

const ShowBudget = () => {
    const { budgetId }: { budgetId: any } = useParams()
    const dispatch = useAppDispatch()
    const budgetSelect = useAppSelector(budgetSelector)

    useEffect(() => {
        dispatch(runLoadBudget(budgetId))
    }, [])


    return (
        <section className="show-recipe__container">
            <BudgetDetailedCard
                budget={budgetSelect}
            />
        </section>
    )
}

export default ShowBudget