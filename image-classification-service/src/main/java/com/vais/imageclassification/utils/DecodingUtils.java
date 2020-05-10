package com.vais.imageclassification.utils;

import java.awt.image.BufferedImage;
import javax.imageio.*;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
import java.util.Properties;

public class DecodingUtils {
	
	/**
	 * Decodes inserted encoded in Base64 string into BufferedImage
	 * @param encodedImg - encoded Base64 file
	 * @return BufferedImage object
	 */
	public static BufferedImage decodeBase64ToImg(final String encodedImg) {
		BufferedImage img = null;

		if (encodedImg != null) {

			try {
				byte[] bytes = Base64.getDecoder().decode(encodedImg);
				
				ByteArrayInputStream bis = new ByteArrayInputStream(bytes);
				img = ImageIO.read(bis);
				bis.close();
				
			} catch (IOException | IllegalArgumentException ex) {
				ex.printStackTrace();
			}
		}

		return img;
	}

	/**
	 * Reads and retrieves values from property file based on specified parameter name
	 * @param propertyName - parameter name to read
	 * @return String value of the property
	 */
	public static String getPropertyByName( String propertyName) {
		String property = null;

		try  {
			InputStream input = DecodingUtils.class.getResourceAsStream("/config.properties");
			Properties prop = new Properties();

			prop.load(input);
			property = prop.getProperty(propertyName).trim();

		} catch (IOException ex) {
			ex.printStackTrace();
		}
		return property;
	}
}