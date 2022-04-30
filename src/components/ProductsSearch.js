import { tagsPath } from "../apiPaths"
import { useFetch } from "../hooks/UseFetch"

export const ProductsSearch = ({ search, onSearchChange, onTagChange }) => {
    const { responseData: tags, isLoading } = useFetch({url: tagsPath})

    return <div style={{ border: "solid 1px green", padding: 10, margin: 10 }}>
        <input value={search} onChange={onSearchChange} />
        <select onChange={onTagChange} defaultValue={0}>
            {!tags && isLoading && <option>Loading tags...</option>}
            {tags && <option value={0}>Select tag</option>}
            {tags && tags.map(({title, key}) => (
                <option key={key} value={key}>{title}</option>
            ))}
        </select>
    </div>
}