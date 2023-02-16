import './index.scss'

import { useEffect } from 'react'

import PackageItem from '../../components/dimension-item'
import FormCreatePackage from '../../components/form-create-dimension'
import {
    useAppDispatch,
    useAppSelector,
} from '../../redux/hooks/hooks'
import {
    dimensionsSelector,
    runAddDimension,
    runLoadDimensions,
} from '../../redux/reducers/dimensionSlice'
import { resetMessages } from '../../redux/reducers/messageSlice'

const DimensionPage = () => {
    const dispatch = useAppDispatch()
    const dimensionSelector = useAppSelector(dimensionsSelector)

    useEffect(() => {
        dispatch(resetMessages())
        dispatch(runLoadDimensions())
    }, [])

    const handleCreateDimension = (envase: any) => dispatch(runAddDimension(envase))

    return (
        <section>
            <h1>Crear Envase</h1>
            <FormCreatePackage
                initialValues={{ metric: '', quantity: 0 }}
                onSubmit={handleCreateDimension}
            />
            {
                dimensionSelector.length === 0 && (
                    <h3>No hay Dimensiones</h3>
                )
            }
            {
                dimensionSelector && (
                    <section className='package__container'>
                        {
                            dimensionSelector.map(dimension => (
                                <PackageItem
                                    metric={dimension.metric}
                                    quantity={dimension.quantity}
                                    id={dimension.id}
                                    key={dimension.id}
                                />
                            ))
                        }
                    </section>
                )
            }
        </section>
    )
}

export default DimensionPage