package com.vais.imageclassification.nn.model;

import ai.djl.Model;

import ai.djl.ndarray.types.Shape;
import ai.djl.nn.Block;

import ai.djl.zoo.cv.classification.ResNetV1;


public class Models {
	
	/**
	 * Returns an instance of Resnet NN model with 50 layers and defined outputs, image height and width. Can be used for colored images. 
	 * @param outputNumber - number of possible classes (categories)
	 * @param height - image height in pixels
	 * @param width - image width in pixels
	 * @return an instance of ai.djl.Model class
	 */
	public static Model getResnetModel(int outputNumber, int height, int width) {
		Model model = Model.newInstance();
		
		//configure structure parameters
		Block block = new ResNetV1.Builder()
				.setImageShape(new Shape(3, height, width))
				.setNumLayers(50)
				.setOutSize(outputNumber)
				.build();
		
		model.setBlock(block);
		return model;
	}
	
}

