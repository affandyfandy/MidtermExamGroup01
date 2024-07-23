package com.fpt.MidtermG1.service;

import com.fpt.MidtermG1.common.Status;
import com.fpt.MidtermG1.data.entity.Product;
import com.fpt.MidtermG1.data.repository.ProductRepository;
import com.fpt.MidtermG1.dto.InvoiceProductDTO;
import com.fpt.MidtermG1.dto.ProductDTO;
import com.fpt.MidtermG1.exception.ResourceNotFoundException;
import com.fpt.MidtermG1.specifications.ProductSpecificationsBuilder;
import com.fpt.MidtermG1.util.ExcelUtil;
import lombok.AllArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductService {
    @Autowired
    private final ProductRepository productRepository;

    public Page<ProductDTO> listAllProduct(Pageable pageable, String search) {
        ProductSpecificationsBuilder builder = new ProductSpecificationsBuilder();
        Pattern pattern = Pattern.compile("(\\w+?)(:|<|>)(\\w+?),");
        Matcher matcher = pattern.matcher(search + ",");
        while (matcher.find()) {
            builder.with(matcher.group(1), matcher.group(2), matcher.group(3));
        }

        Specification<Product> spec = builder.build();
        Page<Product> products = productRepository.findAll(spec, pageable);
        return products.map(Product::toDTO);
    }

    public Optional<ProductDTO> findProductById(int id){
        Optional<Product> productOpt = productRepository.findById(id);
        if (productOpt.isEmpty()){
            throw new ResourceNotFoundException("Product not found for this id : " + id);
        }
        return productOpt.map(Product::toDTO);
    }

    public ProductDTO saveProduct(ProductDTO productDTO){
        Product savedProduct = productRepository.save(productDTO.toEntity());
        return savedProduct.toDTO();
    }

    public Optional<ProductDTO> updateProduct(int id, ProductDTO productDTO){
        Optional<Product> productOpt = productRepository.findById(id);
        if (productOpt.isEmpty()){
            throw new ResourceNotFoundException("Product not found for this id : " + id);
        }
        else{
            Product product = productOpt.get();
            product.setName(productDTO.getName());
            product.setPrice(productDTO.getPrice());
            product.setStatus(productDTO.getStatus());
            product.setCreatedTime(productDTO.getCreatedTime());
            product.setUpdatedTime(productDTO.getUpdatedTime());

            if (productDTO.getInvoiceProducts() != null){
                product.setInvoiceProducts(productDTO.getInvoiceProducts().stream()
                        .map(InvoiceProductDTO::toEntity)
                        .collect(Collectors.toSet()));
            }

            Product updatedProduct = productRepository.save(product);
            return Optional.of(updatedProduct.toDTO());
        }
    }

    public void importExcel(InputStream inputStream) throws IOException {
        List<Product> products = ExcelUtil.parseProductFile(inputStream);
        productRepository.saveAll(products);
    }
}
