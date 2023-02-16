import 'normalize.scss/normalize.scss'
import './index.scss'

import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'

import NavigationButton from '../components/navigation-button'
import VersionLabel from '../components/version-label'
import BudgetMaterialPage from '../pages/budgets/budget-material'
import BudgetPage from '../pages/budgets/create-budget'
import ShowBudget from '../pages/budgets/show-budget'
import DimensionPage from '../pages/dimensions'
import HomePage from '../pages/home'
import MaterialPage from '../pages/materials/create-material'
import AddDimensionToMaterialPage from '../pages/materials/material-dimension'

const App = () => {
    return (
        <Router>
            <section className="container">
                <aside className="navigation-container">
                    <nav className="navigation-bar">
                        <NavigationButton
                            link="/"
                            routeName="Inicio"
                            className="navigation-bar__link"
                        />
                        <NavigationButton
                            link="/budgets"
                            routeName="Presupuestos"
                            className="navigation-bar__link"
                        />
                        <NavigationButton
                            link="/materials"
                            routeName="Materiales"
                            className="navigation-bar__link"
                        />
                        <NavigationButton
                            link="/dimensions"
                            routeName="Dimensiones"
                            className="navigation-bar__link"
                        />
                        <NavigationButton
                            link="/budget-materials"
                            routeName="Agregar material a presupuesto"
                            className="navigation-bar__link"
                        />
                        <NavigationButton
                            link="/materials-dimensions"
                            routeName="Agregar dimension a material"
                            className="navigation-bar__link"
                        />
                    </nav>
                    <VersionLabel />
                </aside>
                <main>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/budget-show/:budgetId" component={ShowBudget} />
                        <Route exact path="/budgets" component={BudgetPage} />
                        <Route exact path="/materials" component={MaterialPage} />
                        <Route exact path="/budget-materials" component={BudgetMaterialPage} />
                        <Route exact path="/dimensions" component={DimensionPage} />
                        <Route exact path="/materials-dimensions" component={AddDimensionToMaterialPage} />
                    </Switch>
                </main>
            </section>
        </Router>
    )
}

export default App