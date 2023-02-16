import {
    Field,
    Formik,
} from 'formik'

import { metrics } from '../../api/config'
import { DimensionDTO } from '../../interfaces/dimension'

const FormCreateDimension = ({ initialValues, onSubmit }: { initialValues: DimensionDTO, onSubmit: Function }) => {
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
                if (!values.metric) {
                    errors = { ...errors, metric: 'Requerido' }
                }
                if (!values.quantity) {
                    errors = { ...errors, quantity: 'Debe ser un valor mayor a 0' }
                }
                return errors
            }}

        >
            {({
                values,
                errors,
                touched,
                handleSubmit,
                handleChange,
                handleBlur,
                isSubmitting
            }) => (
                <form onSubmit={handleSubmit} className="form__container">
                    <section className="form__field">
                        <label htmlFor="metric">Unidad</label>
                        <Field
                            name="metric" as="select"
                        >
                            <option value="" disabled>-- Seleccione una unidad --</option>
                            {
                                metrics.map(metric => (
                                    <option key={metric} value={metric}>{metric}</option>
                                ))
                            }
                        </Field>
                        {
                            errors.metric && touched.metric && (
                                <section className='validation-error'>
                                    <p>{errors.metric}</p>
                                </section>
                            )
                        }
                    </section>
                    <section className="form__field">
                        <label htmlFor="quantity">Cantidad</label>
                        <input step={0.01} name="quantity" type="number" value={values.quantity} onChange={handleChange} onBlur={handleBlur} />
                        {
                            errors.quantity && touched.quantity && (
                                <section className='validation-error'>
                                    <p>{errors.quantity}</p>
                                </section>
                            )
                        }
                    </section>
                    <button className='form__submit-button' type="submit" disabled={isSubmitting}>Crear envase</button>
                </form>
            )}
        </Formik>
    )
}

export default FormCreateDimension