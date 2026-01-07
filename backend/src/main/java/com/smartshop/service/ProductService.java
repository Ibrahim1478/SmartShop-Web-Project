package com.smartshop.service;

import com.smartshop.model.Product;
import com.smartshop.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAll() {
        // sort by id for stable output
        return productRepository.findAll().stream()
                .sorted(Comparator.comparing(Product::getId))
                .toList();
    }

    public List<Product> getFeatured() {
        // first 6 products
        return getAll().stream().limit(6).toList();
    }

    public Product getById(Long id) {
        return productRepository.findById(id).orElse(null);
    }
}
