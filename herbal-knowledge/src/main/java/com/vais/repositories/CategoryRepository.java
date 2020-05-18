package com.vais.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.vais.entities.Category;

@Repository
@Transactional
@CrossOrigin("http://localhost:4200")
public interface CategoryRepository extends JpaRepository<Category, Long>{

}
