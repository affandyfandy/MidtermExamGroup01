package com.fpt.MidtermG1.service;

import java.io.InputStream;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.fpt.MidtermG1.dto.ProductDTO;

public interface ProductService {
    Page<ProductDTO> listAllProduct(Pageable pageable, String search);
    Optional<ProductDTO> findProductById(int id);
    ProductDTO saveProduct(ProductDTO productDTO);
    ProductDTO activateProduct(int id);
    ProductDTO deactivateProduct(int id);
    Optional<ProductDTO> updateProduct(int id, ProductDTO productDTO);
    void importExcel(InputStream inputStream) throws Exception;
}
