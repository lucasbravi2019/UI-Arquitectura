import './index.scss'

import {
    useEffect,
    useState,
} from 'react'

import FormCreateMaterial from '../../../components/form-create-material'
import MaterialItem from '../../../components/material-item'
import MessagePopup from '../../../components/message-popup'
import SearchInput from '../../../components/search-input'
import { MaterialMultiDimension } from '../../../interfaces/budget'
import { MaterialFieldDTO } from '../../../interfaces/material'
import {
    useAppDispatch,
    useAppSelector,
} from '../../../redux/hooks/hooks'
import {
    filterMaterials,
    materialsFilterSelector,
    materialsSelector,
    runAddMaterial,
    runLoadMaterials,
    runUpdateMaterial,
} from '../../../redux/reducers/materialSlice'

const initialValue: (id: string) => MaterialFieldDTO = (id: string): MaterialFieldDTO => {
    return {
        id: id,
        name: ''
    }
}

const MaterialPage = () => {
    const materialSelector: MaterialMultiDimension[] = useAppSelector(materialsSelector)
    const materialFilterSelector: MaterialMultiDimension[] = useAppSelector(materialsFilterSelector)
    const [initialValues, setInitialValues] = useState<MaterialFieldDTO>(initialValue(''))
    const [isUpdating, setIsUpdating] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(runLoadMaterials())
    }, [])

    const handleSubmit = (ingredient: any) => {
        if (isUpdating) {
            dispatch(runUpdateMaterial(ingredient))
            setInitialValues(initialValue(''))
            return
        }
        dispatch(runAddMaterial(ingredient))
    }
    const handleEdit = (ingredient: any) => {
        setInitialValues(ingredient)
        setIsUpdating(true)
    }

    return (
        <section>
            <h1>Crear Material</h1>
            <FormCreateMaterial
                initialValues={initialValues}
                onSubmit={handleSubmit}
                updating={isUpdating}
            />
            <SearchInput
                dispatch={(name: string) => dispatch(filterMaterials(name))}
            />
            {
                materialSelector.length === 0 && (
                    <h3>No hay materiales</h3>
                )
            }
            <section className='material__container'>
                {
                    materialFilterSelector && materialFilterSelector.length > 0 && materialFilterSelector.map(material =>
                        <section key={material.id}>
                            <MaterialItem
                                material={material}
                                handleEdit={setInitialValues}
                            />
                        </section>
                    )
                }
                {
                    materialSelector && materialFilterSelector.length === 0 && materialSelector.length > 0
                    && materialSelector.map(material =>
                        <section key={material.id}>
                            <MaterialItem
                                material={material}
                                handleEdit={handleEdit}
                            />
                        </section>
                    )
                }
                <MessagePopup />
            </section>
        </section>
    )
}

export default MaterialPage