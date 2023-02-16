import './index.scss'

import { useAppDispatch } from '../../redux/hooks/hooks'
import { runRemoveDimension } from '../../redux/reducers/dimensionSlice'
import SubmitButton from '../submit-button'

const PackageItem = ({ metric, quantity, id }: { metric: string, quantity: Number, id: string }) => {
    const dispatch = useAppDispatch()
    const handleDeletePackage = (dimensionId: any) => dispatch(runRemoveDimension(dimensionId))

    return (
        <section className='package__item'>
            <p>Cantidad: {quantity}</p>
            <p>Unidad: {metric}</p>
            <SubmitButton
                buttonText="Borrar Envase"
                className="card__delete-button"
                onClick={() => handleDeletePackage(id)}
            />
        </section>
    )
}

export default PackageItem