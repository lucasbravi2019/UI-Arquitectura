import './index.scss'

import { BudgetMaterial } from '../../interfaces/budget'

const BudgetMaterialItem = ({ material, index }: { material: BudgetMaterial, index: number }) => {
    return (
        <ul key={index} className="ingredients-list">
            {material.name ? (
                <li className="ingredients-item"><strong>Ingrediente:</strong> {material.name}</li>
            ) : (
                <li className="ingredients-item">El ingrediente no tiene nombre</li>
            )}
            {material.quantity ? (
                <li className="ingredients-item"><strong>Cantidad:</strong> {material.quantity.toFixed(2)} {material.dimension.metric} </li>
            ) : (
                <li className="ingredients-item">El ingrediente no tiene cantidad</li>
            )}
            {material.price ? (
                <li className="ingredients-item"><strong>Precio: $</strong> {material.price.toFixed(2)}</li>
            ) : (
                <li className="ingredients-item">El ingrediente no tiene precio</li>
            )}
        </ul>
    )
}

export default BudgetMaterialItem