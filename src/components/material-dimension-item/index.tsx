import './index.scss'

import { useState } from 'react'

import { Dimension } from '../../interfaces/budget'
import { MaterialPriceDTO } from '../../interfaces/material'
import { useAppDispatch } from '../../redux/hooks/hooks'
import { runChangeDimensionPrice } from '../../redux/reducers/dimensionSlice'
import FormChangeIngredientPrice from '../form-change-material-price'
import SubmitButton from '../submit-button'

const initialValues: (id: string) => MaterialPriceDTO = (id: string): MaterialPriceDTO => {
    return {
        dimensionId: id,
        price: 0
    }
}

const MaterialDimensionItem = ({ envase }: { envase: Dimension }) => {
    const [editPackagePrice, setEditPackagePrice] = useState(false)
    const dispatch = useAppDispatch()

    const handleSubmit = (body: any) => {
        dispatch(runChangeDimensionPrice(body))
        setEditPackagePrice(false)
    }

    return (
        <section className="ingredient-package__item">
            <p>Cantidad: {envase.quantity} {envase.metric}</p>
            <p>Precio: $ {envase.price}</p>
            <section>
                {
                    editPackagePrice && (
                        <section>
                            <FormChangeIngredientPrice
                                initialValues={initialValues(envase.id)}
                                onSubmit={handleSubmit}
                            />
                            <SubmitButton
                                buttonText='Cancelar'
                                className='card__delete-button'
                                onClick={() => setEditPackagePrice(false)}
                            />
                        </section>
                    )
                }
            </section>
            <SubmitButton
                buttonText='Editar precio'
                className='card__edit-button'
                onClick={() => setEditPackagePrice(true)}
            />
        </section >
    )
}

export default MaterialDimensionItem