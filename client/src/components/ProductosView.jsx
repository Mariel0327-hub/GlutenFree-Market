import React, { useState, useContext } from "react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ProductFilters from "../components/ProductFilters";

export default function ProductosView() {
  const location = useLocation();
  const { categoria } = useParams();
  // Traemos los productos ya filtrados por el componente ProductFilters desde el Context
  const { filteredProducts, filters, setFilters, getCategoryName } =
    useContext(ProductContext);

  const queryParams = new URLSearchParams(location.search);

  const searchParam = queryParams.get("search");

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  // Resetear a la página 1 cuando cambian los filtros o la categoría
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      // Si hay categoría en la URL la usa, si no, "all"
      category: categoria || "all",
      // Si hay búsqueda la usa, si no, limpia el campo
      searchTerm: searchParam ? searchParam.toLowerCase() : "",
    }));

    // Reset de paginación
    setCurrentPage(1);
  }, [categoria, searchParam, setFilters]);

  // Calculamos los índices necesarios para el slice (Esto corrige los errores rojos)
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Productos finales que se renderizarán en la vista actual
  const productsToShow = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const displayTitle = searchParam
    ? `Resultados para: "${searchParam}"`
    : categoria
      ? `Categoría: ${getCategoryName(categoria)}`
      : "Nuestro Catálogo Completo";
  return (
    <>
      <div className="banner-divider-card"></div>
      <Container className="my-5 ">
        <div className="text-center mb-5">
          <h2 className="titles-font fw-bold">{displayTitle}</h2>
        </div>

        <Row
          className="mb-4 justify-content-center g-4"
          xs={1}
          sm={1}
          md={1}
          lg={4}
        >
          <Col lg={11}>
            <ProductFilters />
          </Col>
        </Row>

        <Row
          className="mb-4 justify-content-center g-4 "
          xs={1}
          sm={2}
          md={2}
          lg={3}
        >
          {productsToShow.length > 0 ? (
            productsToShow.map((product) => (
              <Col key={product.product_id} sm={12} md={6} lg={3}>
                <ProductCard product={product} />
              </Col>
            ))
          ) : (
            <Col className="text-center py-5">
              <p className="lead text-muted">
                No encontramos productos con esos filtros.
              </p>
            </Col>
          )}
        </Row>

        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-5">
            <Pagination>
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              />
              {pageNumbers.map((number) => (
                <Pagination.Item
                  key={number}
                  active={number === currentPage}
                  onClick={() => setCurrentPage(number)}
                >
                  {number}
                </Pagination.Item>
              ))}
              <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              />
            </Pagination>
          </div>
        )}
      </Container>
    </>
  );
}
