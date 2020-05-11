package com.vais.imageclassification;

import static spark.Spark.*;

import java.awt.image.BufferedImage;
import org.eclipse.jetty.http.HttpMethod;

import com.google.gson.Gson;
import com.vais.imageclassification.entities.EncodedFile;
import com.vais.imageclassification.nn.inference.Inference;
import com.vais.imageclassification.response.StandardResponse;
import com.vais.imageclassification.response.StatusResponse;
import com.vais.imageclassification.utils.DecodingUtils;

public class ClassificationServiceApplication {
	

	private final static String origin = DecodingUtils.getPropertyByName("origin.url");

	public static void main(String[] args) {
		
		Inference inference = new Inference();
		
		post("/classification", (request, response) -> {
			response.type("application/json");
			
			//retrieving img data from json in Base64 format
			EncodedFile encodedFile = new Gson().fromJson(request.body(), EncodedFile.class);
			String encodedString = encodedFile.getData();
			BufferedImage img = DecodingUtils.decodeBase64ToImg(encodedString);
			System.out.println("image " + img);
			
			// process received image with and send a response based on the classification outcome in case of successful classification send 3 best matches
			if (img != null) {
				return new Gson().toJson(new StandardResponse(StatusResponse.SUCCESS, new Gson().toJsonTree(inference.predict(img).topK(3))));
			} else {
				return new Gson().toJson(new StandardResponse(StatusResponse.ERROR,
						new Gson().toJson("Recieved file is not an image")));
			}
		});

		before((request, response) -> {
			response.header("Access-Control-Allow-Origin", origin);
			response.header("Access-Control-Request-Method", HttpMethod.POST.toString());
			response.type("application/json");
		});

		notFound((req, res) -> {
			res.type("application/json");
			return "{\"message\":\"No match found 404\"}";
		});
		
		options("/*", (req, res) -> {
			String accessControlRequestHeaders = req.headers("Access-Control-Request-Headers");
			if (accessControlRequestHeaders != null) {
				res.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
			}

			String accessControlRequestMethod = req.headers("Access-Control-Request-Method");
			if (accessControlRequestMethod != null) {
				res.header("Access-Control-Allow-Methods", accessControlRequestMethod);
			}

	        return "OK";
		});
	}

}
