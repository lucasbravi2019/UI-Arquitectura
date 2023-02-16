import './index.scss'

import { Budget } from '../../interfaces/budget'
import { useAppDispatch } from '../../redux/hooks/hooks'
import { runDeleteBudget } from '../../redux/reducers/budgetSlice'
import MessagePopup from '../message-popup'
import NavigationButton from '../navigation-button'
import SubmitButton from '../submit-button'

const BudgetsCard = ({ budget, updatable, deletable, setValue, setUpdating }:
    { budget: Budget, updatable: boolean, deletable: boolean, setValue?: Function, setUpdating?: Function }) => {
    const dispatch = useAppDispatch()

    const handleDeleteRecipe = (id: any) => dispatch(runDeleteBudget(id))

    const budgetCardButtons = () => (
        <section className="recipe-card__buttons">
            <NavigationButton
                link={`/budget-show/${budget.id}`}
                routeName="Ver Presupuesto"
                className="navigation-bar__link"
            />
            {
                updatable && setUpdating && setValue && (
                    <SubmitButton
                        buttonText='Editar Presupuesto'
                        className='card__edit-button'
                        onClick={() => {
                            setUpdating(true)
                            setValue(budget)
                        }}
                    />
                )
            }
            {
                deletable && (
                    <SubmitButton
                        buttonText='Borrar Presupuesto'
                        className='card__delete-button'
                        onClick={() => handleDeleteRecipe(budget.id)}
                    />
                )
            }
        </section>
    )

    return (
        <section className="recipe-card">
            <MessagePopup />

            <h3 className="recipe-card__title"><strong>Receta:</strong> {budget.name}</h3>
            {budget.price && budget.price > 0 ? (
                <p className="recipe-card__paragraph"><strong>Precio: </strong>$ {budget.price?.toFixed(2)}</p>
            ) : (
                <p className="recipe-card__paragraph"><strong>Precio: </strong>$ 0</p>
            )}

            {
                budgetCardButtons()
            }
        </section>
    )
}

export default BudgetsCard