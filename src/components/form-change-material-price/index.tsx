import { Formik } from 'formik'

import { MaterialPriceDTO } from '../../interfaces/material'

const FormChangeMaterialPrice = ({ initialValues, onSubmit }: { initialValues: MaterialPriceDTO, onSubmit: Function }) => {
    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                onSubmit(values)
                resetForm()
                setSubmitting(false)
            }}
            validate={(values) => {
                let errors = {}
                if (!values.dimensionId) {
                    errors = { ...errors, packageId: 'Requerido' }
                }
                if (!values.price) {
                    errors = { ...errors, price: 'Debe ser mayor a 0' }
                }
                return errors;
            }}
        >
            {({
                values,
                errors,
                touched,
                handleSubmit,
                handleChange,
                handleBlur
            }) => (
                <form className="form__container" onSubmit={handleSubmit}>
                    <section className="form__field">
                        <label htmlFor="price">Precio</label>
                        <input name="price" type="number" step={0.01} value={values.price} onChange={handleChange} onBlur={handleBlur} />
                        {
                            errors.price && touched.price && (
                                <section className="validation-error">
                                    <p>{errors.price}</p>
                                </section>
                            )
                        }
                    </section>
                    <section className="form__field">
                        <input type="hidden" name="id" value={values.dimensionId} />
                        {
                            errors.dimensionId && touched.dimensionId && (
                                <section className="validation-error">
                                    <p>{errors.dimensionId}</p>
                                </section>
                            )
                        }
                    </section>
                    <button type="submit" className='form__submit-button'>Cambiar precio</button>
                </form>
            )}
        </Formik>
    )
}

export default FormChangeMaterialPrice