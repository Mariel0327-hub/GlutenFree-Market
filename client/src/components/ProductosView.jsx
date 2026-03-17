import React, { useState, useContext } from "react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function ProductosView() {
  const { categoria } = useParams();
  const { products, searchTerm } = useContext(ProductContext);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // Cantidad de productos por página



  // Resetear a la página 1 cuando cambia la categoría o la búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, [categoria, searchTerm]);

  // 1. Filtrar productos por categoría y término de búsqueda
  // El filtrado ahora usa el searchTerm que viene desde el Navbar
  const filteredProducts = products.filter((p) => {
    const matchCategory = categoria
      ? p.category.toLowerCase() === categoria.toLowerCase()
      : true;

    const matchSearch = p.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchCategory && matchSearch;
  });
  // 2. Calculamos la paginación SOBRE los productos filtrados
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const productsToShow = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  // 3. Generar números de página
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Container className="my-5 pt-5">
      <h2 className="titles-font mb-4 text-center" style={{ color: "#3e2723" }}>
        {categoria ? `Categoría: ${categoria}` : "Nuestro Catálogo Completo"}
      </h2>
      {searchTerm && (
        <p className="text-center text-muted">
          Resultados para: "<strong>{searchTerm}</strong>"
        </p>
      )}
      <Row className="gy-4">
        {productsToShow.length > 0 ? (
          productsToShow.map((product) => (
            <Col key={product.product_id} sm={12} md={6} lg={4}>
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <Col className="text-center py-5">
            <p className="lead text-muted">
              No hay productos que coincidan con "{searchTerm}" en esta
              categoría.
            </p>
          </Col>
        )}
      </Row>

      {/* MENÚ DE PAGINACIÓN (Solo si hay más de una página) */}
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
  );
}
