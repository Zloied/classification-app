package com.vais.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import com.vais.entities.Flower;

@Repository
@Transactional
@CrossOrigin("http://localhost:4200")
public interface FlowerRepository extends JpaRepository<Flower, Long>{
	
	Page<Flower> findByCategory(@RequestParam("id") Long id, Pageable pegeable);
	
	Page<Flower> findByNameContaining(@RequestParam("name") String name, Pageable peeable);
}
