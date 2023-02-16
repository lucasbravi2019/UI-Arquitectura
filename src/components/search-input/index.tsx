import './index.scss'

import {
    useEffect,
    useState,
} from 'react'

const SearchInput = ({ dispatch }: { dispatch: Function }) => {
    const [search, setSearch] = useState('')

    useEffect(() => {
        dispatch(search)
    }, [search])

    return (
        <section className="search-input__container">
            <input
                placeholder="Filtrar"
                className="search-input__input"
                type="text"
                onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
            />
        </section>
    )
}

export default SearchInput