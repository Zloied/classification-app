
package com.vais.imageclassification.nn.inference;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.vais.imageclassification.nn.model.Models;
import com.vais.imageclassification.utils.DecodingUtils;

import ai.djl.MalformedModelException;
import ai.djl.Model;
import ai.djl.ModelException;
import ai.djl.inference.Predictor;
import ai.djl.modality.Classifications;
import ai.djl.modality.cv.transform.Resize;
import ai.djl.modality.cv.transform.ToTensor;
import ai.djl.modality.cv.util.BufferedImageUtils;
import ai.djl.modality.cv.util.NDImageUtils;
import ai.djl.ndarray.NDArray;
import ai.djl.ndarray.NDList;
import ai.djl.translate.Pipeline;
import ai.djl.translate.TranslateException;
import ai.djl.translate.Translator;
import ai.djl.translate.TranslatorContext;

/**
 * 
 * @author Eduard
 *
 */
public class Inference {
	
	private static final Logger logger = LoggerFactory.getLogger(Inference.class);

	// values must match settings used during training
	// the number of classification labels

	private static int NUM_OF_OUTPUT;

	// the height and width for pre-processing of the image
	private static  int HEIGHT;
	private static int WIDTH;

	private List<String> classes =  Arrays.asList(DecodingUtils.getPropertyByName("output.classes").split(", ")); 

	private static String MODEL_PATH;// = "build/model";
	private static String MODEL_NAME; // = "flower-recognition_v1";

	private static Translator<BufferedImage, Classifications> translator;

	private static Model model;

	static {
		MODEL_PATH = DecodingUtils.getPropertyByName("model.path");
		MODEL_NAME = DecodingUtils.getPropertyByName("model.name");
		NUM_OF_OUTPUT = Integer.parseInt(DecodingUtils.getPropertyByName("output.number"));
		HEIGHT =  Integer.parseInt(DecodingUtils.getPropertyByName("input.heigh"));
		WIDTH =  Integer.parseInt(DecodingUtils.getPropertyByName("input.width"));	
	}
	
	public Inference()  {

		Inference.translator = new ImageTranslator();
		
		Inference.model = Models.getResnetModel(NUM_OF_OUTPUT, HEIGHT, WIDTH);
		try {
			System.out.println("Model Path " + MODEL_PATH);
			Inference.model.load(Paths.get(MODEL_PATH), MODEL_NAME);
		} catch (MalformedModelException|IOException e) {
			
			logger.error("Error loading model.", e);
		}
		 
	}
	
	/**
	 * Classifies object with certain accuracy from provided image
	 * 
	 * @return Classifications object which contain possible objects. Each record
	 *         has possibility in percentage.
	 * @throws IOException
	 * @throws ModelException
	 * @throws TranslateException
	 */
	public Classifications predict(BufferedImage img) throws IOException, ModelException, TranslateException {

		Classifications predictResult;
		
			Translator<BufferedImage, Classifications> translator = new ImageTranslator();
			try (Predictor<BufferedImage, Classifications> predictor = model.newPredictor(translator)) {
				predictResult = predictor.predict(img);
			}
		
		return predictResult;
	}
	
	/**
	 * User to transform incoming image to appropriate size and then to NDList in order pass through created Model and parse outcomes.
	 * @author Eduard
	 *
	 */
	private final class ImageTranslator implements Translator<BufferedImage, Classifications> {

		// private List<String> classes;

		@Override
		public NDList processInput(TranslatorContext ctx, BufferedImage input) {
			NDArray array = BufferedImageUtils.toNDArray(ctx.getNDManager(), input, NDImageUtils.Flag.COLOR);
			Pipeline pipeline = new Pipeline().add(new Resize(HEIGHT, WIDTH)).add(new ToTensor());
			return pipeline.transform(new NDList(array));
		}

		@Override
		public Classifications processOutput(TranslatorContext ctx, NDList list) {
			NDArray probabilities = list.singletonOrThrow().softmax(0);
			return new Classifications(classes, probabilities);
		}
	}

}

