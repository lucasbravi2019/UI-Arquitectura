import './index.scss'

import { Link } from 'react-router-dom'

const NavigationButton = ({ link, routeName, className }: { link: string, routeName: string, className: string }) => {
    return (
        <Link
            className={`link ${className}`}
            to={link}
        >{routeName}</Link>
    )
}

export default NavigationButton