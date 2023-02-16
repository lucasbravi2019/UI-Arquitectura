import {
    Field,
    Formik,
} from 'formik'

import {
    BudgetField,
    BudgetMaterialForm,
} from '../../interfaces/budget'
import { MaterialFieldDTO } from '../../interfaces/material'

const FormBudgetMaterial = ({ initialValues, onSubmit, budgets, materials, packageSelector }:
    { initialValues: BudgetMaterialForm, onSubmit: Function, budgets: BudgetField[], materials: MaterialFieldDTO[], packageSelector: Function }) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                onSubmit(values);
                resetForm()
                setSubmitting(false)
            }}
            validate={(values) => {
                let errors = {}
                if (!values.budgetId) {
                    errors = { ...errors, budgetId: 'Requerido' }
                }
                if (!values.materialId) {
                    errors = { ...errors, materialId: 'Requerido' }
                }
                if (!values.metric) {
                    errors = { ...errors, metric: 'Requerido' }
                }
                if (!values.quantity) {
                    errors = { ...errors, quantity: 'Requerido' }
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
                        <label htmlFor="budgetId">Nombre presupuesto</label>
                        <Field name="budgetId" as="select">
                            <option value="" disabled>-- Seleccione un presupuesto --</option>
                            {
                                budgets.map(budget => (
                                    <option key={budget.id} value={budget.id}>{budget.name}</option>
                                ))
                            }
                        </Field>
                        {
                            errors.budgetId && touched.budgetId && (
                                <section className='validation-error'>
                                    <p>{errors.budgetId}</p>
                                </section>
                            )
                        }
                    </section>
                    <section className="form__field">
                        <label htmlFor="ingredientId">Nombre material</label>
                        <Field name="ingredientId" as="select">
                            <option value="" disabled>-- Seleccione un material --</option>
                            {
                                materials.map(material => (
                                    <option key={material.id} value={material.id}>{material.name}</option>
                                ))
                            }
                        </Field>
                        {
                            errors.materialId && touched.materialId && (
                                <section className="validation-error">
                                    <p>{errors.materialId}</p>
                                </section>
                            )
                        }
                    </section>
                    <section className="form__field">
                        <label htmlFor="metric">Unidad</label>
                        <Field name="metric" as="select">
                            <option value="" disabled>-- Seleccione una dimension --</option>
                            {
                                packageSelector(values.materialId, materials).map((envase: any) => (
                                    <option key={envase.id} value={envase.id}>{envase.name}</option>
                                ))
                            }
                        </Field>
                        {
                            errors.metric && touched.metric && (
                                <section className="validation-error">
                                    <p>{errors.metric}</p>
                                </section>
                            )
                        }
                    </section>
                    <section className="form__field">
                        <label htmlFor="quantity">Cantidad</label>
                        <input step={0.01} type="number" name='quantity' onChange={handleChange} onBlur={handleBlur} value={values.quantity} />
                        {
                            errors.quantity && touched.quantity && (
                                <section className="validation-error">
                                    <p>{errors.quantity}</p>
                                </section>
                            )
                        }
                    </section>
                    <button type="submit" disabled={isSubmitting} className='form__submit-button'>Crear presupuesto</button>
                </form>
            )}

        </Formik>
    )
}

export default FormBudgetMaterial