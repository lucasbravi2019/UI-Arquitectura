import './index.scss'

import { MaterialMultiDimension } from '../../interfaces/budget'
import { useAppDispatch } from '../../redux/hooks/hooks'
import { runDeleteMaterial } from '../../redux/reducers/materialSlice'
import MaterialDimensionItem from '../material-dimension-item'
import SubmitButton from '../submit-button'

const MaterialItem = ({ material, handleEdit }: { material: MaterialMultiDimension, handleEdit: Function }) => {
    const dispatch = useAppDispatch()

    const handleDeleteMaterial = (id: any) => dispatch(runDeleteMaterial(id))

    return (
        <>
            <section className='material__item'>
                <p>Nombre: {material.name}</p>
                {
                    material.dimensions && material.dimensions.length > 0 && (
                        <>
                            <p className="material-dimension__title">Dimensiones</p>
                            <section className="material-dimension__container">
                                {
                                    material.dimensions && material.dimensions.map(dimension => (
                                        <section key={dimension.id}>
                                            <MaterialDimensionItem
                                                envase={dimension}
                                            />
                                        </section>
                                    ))
                                }
                            </section>
                        </>
                    )
                }
                <section className="button-grid__container">
                    <SubmitButton
                        buttonText='Editar material'
                        className='card__edit-button'
                        onClick={() => handleEdit(material)}
                    />
                    <SubmitButton
                        buttonText='Borrar material'
                        className='card__delete-button'
                        onClick={() => handleDeleteMaterial(material.id)}
                    />
                </section>
            </section>
        </>
    )
}

export default MaterialItem