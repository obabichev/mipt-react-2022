export const ProductsSearch = ({ search, onChange }) => {
    return <div style={{ border: "solid 1px green", padding: 10, margin: 10 }}>
        <input value={search} onChange={onChange} />
        <b>{search}</b>
    </div>
}