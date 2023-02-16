import {
    Field,
    Formik,
} from 'formik'

import { DimensionField } from '../../interfaces/dimension'
import {
    MaterialDimensionDTO,
    MaterialFieldDTO,
} from '../../interfaces/material'

const FormMaterialDimension = ({ initialValues, materials, dimensions, onSubmit }:
    { initialValues: MaterialDimensionDTO, materials: MaterialFieldDTO[], dimensions: DimensionField[], onSubmit: Function }) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                onSubmit(values)
                resetForm()
                setSubmitting(false)
            }}
            validate={(values) => {
                let errors = {}
                if (!values.materialId) {
                    errors = { ...errors, materialId: 'Requerido' }
                }
                if (!values.dimensionId) {
                    errors = { ...errors, dimensionId: 'Requerido' }
                }
                if (values.price === 0) {
                    errors = { ...errors, price: 'Debe ser un valor mayor que 0' }
                }
                return errors
            }}
        >
            {({
                values,
                errors,
                touched,
                isSubmitting,
                handleSubmit,
                handleChange,
                handleBlur
            }) => (
                <form onSubmit={handleSubmit} className="form__container">
                    <section className="form__field">
                        <label htmlFor="materialId">Material</label>
                        <Field as="select" name="materialId" >
                            <option value="" disabled>-- Seleccione un Material --</option>
                            {
                                materials.map(material => (
                                    <option key={material.id} value={material.id}>{material.name}</option>
                                ))
                            }
                        </Field>
                        {
                            errors.materialId && touched.materialId && (
                                <section className='validation-error'>
                                    <p>{errors.materialId}</p>
                                </section>
                            )
                        }
                    </section>
                    <section className="form__field">
                        <label htmlFor="dimensionId">Dimensión</label>
                        <Field as="select" name="dimensionId" >
                            <option value="" disabled>-- Seleccione una Dimensión --</option>
                            {
                                dimensions.map(dimension => (
                                    <option key={dimension.id} value={dimension.id}>{dimension.name}</option>
                                ))
                            }
                        </Field>
                        {
                            errors.dimensionId && touched.dimensionId && (
                                <section className='validation-error'>
                                    <p>{errors.dimensionId}</p>
                                </section>
                            )
                        }
                    </section>
                    <section className="form__field">
                        <label htmlFor="price">Precio</label>
                        <input type="number" name="price" value={values.price} onChange={handleChange} onBlur={handleBlur} />
                        {
                            errors.price && touched.price && (
                                <section className='validation-error'>
                                    <p>{errors.price}</p>
                                </section>
                            )
                        }
                    </section>
                    <button type="submit" className='form__submit-button' disabled={isSubmitting}>Agregar Dimensión</button>
                </form>
            )}


        </Formik>
    )
}

export default FormMaterialDimension