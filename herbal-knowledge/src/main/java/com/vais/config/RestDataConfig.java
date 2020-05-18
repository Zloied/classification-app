package com.vais.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import com.vais.entities.Category;
import com.vais.entities.Flower;

@Configuration
public class RestDataConfig implements RepositoryRestConfigurer {

	private EntityManager entityManager;

	@Autowired
	public RestDataConfig(EntityManager theEntityManager) {
		entityManager = theEntityManager;
	}

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {

		HttpMethod[] unsupportedActions = { HttpMethod.DELETE, HttpMethod.PUT, HttpMethod.POST };

		// disable HTTP defined methods for Flower and Category entities
		config.getExposureConfiguration().forDomainType(Flower.class)
				.withItemExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedActions))
				.withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedActions));

		config.getExposureConfiguration().forDomainType(Category.class)
				.withItemExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedActions))
				.withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedActions));

		// call an internal helper method
		exposeIds(config);
	}
	
	/**
	 * Retrieve all entity types presented in domain model and expose their id as parameters.
	 * @param config 
	 */
	@SuppressWarnings("rawtypes")
	private void exposeIds(RepositoryRestConfiguration config) {

		Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
		List<Class> entityClasses = new ArrayList<>();

		// retrieve the entity types for the entities
		for (EntityType<?> entityType : entities) {
			entityClasses.add(entityType.getJavaType());
		}

		// expose the entity ids for the array of entity/domain types
		Class[] domainTypes = entityClasses.toArray(new Class[0]);
		config.exposeIdsFor(domainTypes);
	}
}
