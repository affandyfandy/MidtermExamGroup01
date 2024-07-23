package com.fpt.MidtermG1.data.repository;

import com.fpt.MidtermG1.data.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
}
