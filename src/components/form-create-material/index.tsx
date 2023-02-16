import { Formik } from 'formik'

import { MaterialNameDTO } from '../../interfaces/material'

const FormCreateMaterial = ({ initialValues, onSubmit, updating }: { initialValues: MaterialNameDTO, onSubmit: Function, updating: boolean }) => {
    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                onSubmit(values);
                resetForm()
                setSubmitting(false)
            }}
            validate={(values) => {
                let errors = {}
                if (!values.name) {
                    errors = { ...errors, name: 'Requerido' }
                }
                return errors
            }}
        >
            {({
                values,
                touched,
                errors,
                handleSubmit,
                handleChange,
                handleBlur
            }) => (
                <form onSubmit={handleSubmit} className="form__container">
                    <section className="form__field">
                        <label htmlFor="name">Material</label>
                        <input type="text" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} />
                        {
                            errors.name && touched.name && (
                                <section className='validation-error'>
                                    <p>{errors.name}</p>
                                </section>
                            )
                        }
                    </section>
                    <button type="submit" className='form__submit-button'>{updating ? 'Actualizar Material' : 'Crear Material'}</button>
                </form>
            )}

        </Formik>
    )
}

export default FormCreateMaterial