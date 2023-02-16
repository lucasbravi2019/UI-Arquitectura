import './index.scss'

import { Budget } from '../../interfaces/budget'
import BudgetMaterialItem from '../budget-material-item'

const BudgetDetailedCard = ({ budget }: { budget: Budget }) => {
    return (
        <section className="recipe-detailed-card">
            <h1 className="recipe-detailed-card__title"><strong>Presupuesto:</strong> {budget.name}</h1>
            <h3 className="recipe-detailed-card__ingredients"><strong>Materiales</strong></h3>
            {budget.materials && budget.materials.length > 0 ? (
                <section className="recipe-detailed-card__ingredients-list__container">
                    {
                        budget.materials.map((material, index) => (
                            <BudgetMaterialItem
                                material={material}
                                index={index}
                                key={index}
                            />
                        ))
                    }
                </section>
            ) : (
                <p className="recipe-detailed-card__paragraph">Este presupuesto no tiene materiales</p>
            )}
            {budget.price ? (
                <p className="recipe-detailed-card__paragraph"><strong>Precio: </strong>$ {budget.price.toFixed(2)}</p>
            ) : (
                <p className="recipe-detailed-card__paragraph">Este presupuesto no tiene precio total</p>
            )}
        </section>
    )
}

export default BudgetDetailedCard