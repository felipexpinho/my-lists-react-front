import "../styles/Product.css"
import "../styles/Base.css"
import ProductCard from "../components/ProductCard"
import SideBar from "../components/SideBar";
import CustomPagination from "../components/Pagination";
import { useState, useEffect } from "react"
import { getProducts } from "../services/api"

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    
    const [products, setProducts] = useState([]);
    
    const [pageObj, setPageObj] = useState({
        page: 1,
        start_index: 0,
        end_index: 0,
        page_size: 5,
        max_products: 0,
        paginator: {
            num_pages: 1,
            current_page: 1,
        }
    });

    const loadProducts = async () => {
        try {
            const data = await getProducts({ page: pageObj.page, page_size: pageObj.page_size });
            console.log(data.results)
            setProducts(data.results);

            setPageObj({
                ...pageObj,
                start_index: 1,
                end_index: data.results.length,
                max_products: data.count,
                paginator: {
                    num_pages: Math.ceil(data.count / data.results.length),
                    current_page: 1
                }
            });
        } catch (err) {
            console.error("Erro ao buscar produtos:", err);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        const data = await getProducts({ page: 1, page_size: pageObj.page_size, product_search: searchQuery });
        setProducts(data.results);
        setPageObj({
            ...pageObj,
            page: 1,
            start_index: 1,
            end_index: data.results.length,
            max_products: data.count,
            paginator: {
                num_pages: Math.ceil(data.count / data.results.length),
                current_page: 1
            }
        });
    };

    const handlePageChange = async (newPage) => {
        try {
            const data = await getProducts({ page: newPage, page_size: pageObj.page_size }); // API geralmente é zero-indexed
            setProducts(data.results);

            setPageObj((prev) => ({
                ...prev,
                page: newPage,
                start_index: (newPage - 1) * prev.page_size + 1,
                end_index: (newPage - 1) * prev.page_size + data.results.length,
                max_products: data.count, // total de produtos retornado pela API
                paginator: {
                    ...prev.paginator,
                    current_page: newPage,
                },
            }));
        } catch (err) {
            console.error("Erro ao buscar produtos:", err);
        }
    };

    return (
        <div className="app-container">
            <SideBar user={{ isAuthenticated: false, nickname: "Visitante" }} />
            <div className="home-content">
                <div className="product-card mt-5 d-flex flex-column justify-content-center align-items-center">
                    <h1 className="mb-3">Lista de Produtos</h1>
                    <h5>Mostrando {pageObj.start_index} - {pageObj.end_index} de um total de {pageObj.max_products} produtos</h5>
                </div>

                <div className="product-card d-flex justify-content-between align-items-center">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProductModal">
                        Adicionar Novo Produto
                    </button>
                    
                    <div>
                        <form onSubmit={handleSearch} className="input-group">
                            <input
                                className="form-control"
                                name="product_search"
                                type="text"
                                placeholder="Busque um produto"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="btn btn-primary" type="submit">Procurar</button>
                        </form>
                    </div>
                </div>

                <div>
                    {(products || []).map((product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </div>

                {pageObj.paginator.num_pages > 1 && (
                    <CustomPagination pageObj={pageObj} onPageChange={handlePageChange} />
                )}
            </div>
            
            <footer className="footer">
                Made with React + Django - v.0.0.1
            </footer>
        </div>
    )
}

export default Home