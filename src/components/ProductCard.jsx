import "../styles/Product.css"
import PriceHistoryChart from "./PriceHistoryChart";

function ProductCard({product}) {
    return (
        <div className="product-card product-hover">
            <div className="product-image">
                <img src={product.stocks[0].photo} alt={product.name}></img>
            </div>
            <div className="product-info">
                <img src={product.stocks[0].store.logo} alt={product.stocks[0].store.name} className="store-logo"></img>
                <p><strong>Nome:</strong> {product.name}</p>
                <p><strong>Preço:</strong> {product.stocks[0].price}</p>
                {product.stocks[0].isAvailable ? (
                    <p><strong>Produto disponível</strong></p>
                ) : (
                    <p><strong>Produto indisponível</strong></p>
                )}
                <p><strong>Categoria:</strong> {product.stocks[0].category} - {product.stocks[0].sub_group}</p>
                <div>
                    <a href={product.stocks[0].url} className="btn btn-primary">Ir para o site</a>
                </div>
            </div>
            <div className="product-graph">
                {product.stocks[0].history && product.stocks[0].history.length > 0 && (
                    <PriceHistoryChart stock={product.stocks[0]} />
                )}
            </div>
        </div>
    )
}

export default ProductCard