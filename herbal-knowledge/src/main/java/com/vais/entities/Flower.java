package com.vais.entities;

import java.io.Serializable;
import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.EqualsAndHashCode;

@Entity
@EqualsAndHashCode
@Table( name = "flower", schema = "herbal")
public class Flower implements Serializable{
	
	private static final long serialVersionUID = -1655225078737481548L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "flower_seq")
	@SequenceGenerator(name = "flower_seq", sequenceName = "herbal.flower_seq")
	@Column(name ="id", updatable = false, nullable = false)
	private Long id;
	
	@Column(name = "name", unique = true, nullable = false)	
	private String name;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "category_id")
	private Long category;
	
	
	@Column(name = "picture_url")
	private String pictureUrl;
	
	@CreationTimestamp
	@Column(name = "date_created")
	private Date dateCreated;
	
	@UpdateTimestamp
	@Column(name = "date_updated")
	private Date dateUpdated;

	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * @return the category
	 */
	public Long getCategory() {
		return category;
	}

	/**
	 * @param category the category to set
	 */
	public void setCategory(Long category) {
		this.category = category;
	}

	/**
	 * @return the pictureUrl
	 */
	public String getPictureUrl() {
		return pictureUrl;
	}

	/**
	 * @param pictureUrl the pictureUrl to set
	 */
	public void setPictureUrl(String pictureUrl) {
		this.pictureUrl = pictureUrl;
	}

	/**
	 * @return the dateCreated
	 */
	public Date getDateCreated() {
		return dateCreated;
	}

	/**
	 * @param dateCreated the dateCreated to set
	 */
	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}

	/**
	 * @return the dateUpdated
	 */
	public Date getDateUpdated() {
		return dateUpdated;
	}

	/**
	 * @param dateUpdated the dateUpdated to set
	 */
	public void setDateUpdated(Date dateUpdated) {
		this.dateUpdated = dateUpdated;
	}

	/**
	 * @return the serialversionuid
	 */
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
