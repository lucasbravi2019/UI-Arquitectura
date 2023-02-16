import { useEffect } from 'react'

import FormMaterialDimension from '../../../components/form-material-dimension'
import MessagePopup from '../../../components/message-popup'
import { MaterialDimensionDTO } from '../../../interfaces/material'
import {
    useAppDispatch,
    useAppSelector,
} from '../../../redux/hooks/hooks'
import {
    dimensionsSelector,
    runLoadDimensions,
} from '../../../redux/reducers/dimensionSlice'
import {
    materialsSelector,
    runAddDimensionToMaterial,
    runLoadMaterials,
} from '../../../redux/reducers/materialSlice'
import { resetMessages } from '../../../redux/reducers/messageSlice'

const initialValues: MaterialDimensionDTO = {
    materialId: '',
    dimensionId: '',
    price: 0
}

const AddDimensionToMaterialPage = () => {
    const dispatch = useAppDispatch()
    const dimensionSelector = useAppSelector(dimensionsSelector)
    const materialSelector = useAppSelector(materialsSelector)

    useEffect(() => {
        dispatch(resetMessages())
        dispatch(runLoadMaterials())
        dispatch(runLoadDimensions())
    }, [])

    const handleSubmit = (body: any) => dispatch(runAddDimensionToMaterial(body))

    return (
        <section>
            <h1>Agregar Dimension a Material</h1>
            <FormMaterialDimension
                dimensions={dimensionSelector.map(dimension => {
                    return { id: dimension.id, name: `${dimension.quantity} ${dimension.metric}` }
                })}
                materials={materialSelector.map(material => {
                    return { id: material.id, name: material.name }
                })}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            />
            <MessagePopup />
        </section>
    )
}

export default AddDimensionToMaterialPage