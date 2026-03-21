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
  const { filteredProducts, filters, setFilters } = useContext(ProductContext);

  const queryParams = new URLSearchParams(location.search);

  const searchParam = queryParams.get("search");

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  // Resetear a la página 1 cuando cambian los filtros o la categoría
  useEffect(() => {
    // 1. Sincronizamos la Categoría (URL params)
    if (categoria) {
      setFilters((prev) => ({ ...prev, category: categoria.toLowerCase() }));
    } else {
      // Si entramos a /productos sin categoría, reseteamos a "all"
      setFilters((prev) => ({ ...prev, category: "all" }));
    }

    // 2. Sincronizamos la Búsqueda (Query params del Navbar)
    if (searchParam) {
      setFilters((prev) => ({
        ...prev,
        searchTerm: searchParam.toLowerCase(),
      }));
    } else {
      // Si no hay búsqueda en la URL, limpiamos el filtro de texto
      setFilters((prev) => ({ ...prev, searchTerm: "" }));
    }

    // 3. Reset de paginación para evitar quedar en una página inexistente
    setCurrentPage(1);
  }, [categoria, searchParam, setFilters]);

  // --- LÓGICA DE PAGINACIÓN ---
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

  // 2. Agrege un título dinámico que REACCIONE al cambio de filtro
  // Si la categoría es 'all', mostramos "Catálogo Completo", sino, el nombre de la categoría
  const displayTitle = searchParam
    ? `Resultados para: "${searchParam}"`
    : filters.category === "all" || filters.category === "All"
      ? "Nuestro Catálogo Completo"
      : `Categoría: ${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)}`;

  return (
    <>
      <div className="banner-divider-card"></div>
      <Container className="my-5">
        <div className="text-center mb-5">
          <h2 className="titles-font fw-bold">{displayTitle}</h2>
        </div>

        {/* FILTROS EN BARRA SUPERIOR */}
        <Row className="mb-4 justify-content-center">
          <Col lg={11}>
            <ProductFilters />
          </Col>
        </Row>

        {/* GRILLA DE PRODUCTOS ANCHO COMPLETO */}
        <Row className="gy-4">
          {productsToShow.length > 0 ? (
            productsToShow.map((product) => (
              <Col key={product.product_id} sm={12} md={6} lg={3}>
                {" "}
                {/* 4 productos por fila */}
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
        {/* Menú de Paginación Reactivo  */}
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
