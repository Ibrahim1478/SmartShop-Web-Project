package com.smartshop.controller;

import com.smartshop.model.Product;
import com.smartshop.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Map<String, Object>> getAll() {
        return productService.getAll().stream().map(ProductController::toDto).toList();
    }

    @GetMapping("/featured")
    public List<Map<String, Object>> getFeatured() {
        return productService.getFeatured().stream().map(ProductController::toDto).toList();
    }

    @GetMapping("/{id}")
    public Map<String, Object> getById(@PathVariable Long id) {
        Product p = productService.getById(id);
        if (p == null) return null;
        return toDto(p);
    }

    private static Map<String, Object> toDto(Product p) {
        String categoryName = (p.getCategory() != null) ? p.getCategory().getName() : "General";
        return Map.of(
                "id", p.getId(),
                "name", p.getName(),
                "description", p.getDescription(),
                "price", p.getPrice(),
                "inStock", p.isInStock(),
                "categoryName", categoryName
        );
    }
}
