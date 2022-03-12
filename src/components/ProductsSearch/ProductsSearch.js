import {useNavigate} from "react-router-dom";

import './ProductsSearch.css'


export const ProductsSearch = ({query, handler}) => {
    const navigate = useNavigate();

    const handleOnChange = (event) => {
        handler(event.target.value);
    }

    return <form>
        <div className="form-group row search-form">
        <div className="col col-sm-9">
            <input placeholder="Search" class="form-control" value={query} onChange={handleOnChange}/>
        </div>
        <div className="col col-sm-3">
            <button
                type="button"
                onClick={() => navigate('/edit')}
                className="form-control btn btn-primary"
            >
                Добавить товар
            </button>
        </div>
    </div>
    </form>
}
