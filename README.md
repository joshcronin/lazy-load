# Lazy Load
JavaScript library to lazy load images, background images and videos.
## Setup
Add the class of `pos-no-js` to the `<html>` tag and add the following script  and style to the beginning of the `<head>` tag:
`<script>document.documentElement.classList.remove("pos-no-js");</script>`
`<style>.pos-no-js  img[data-pos-src],.pos-no-js  video[data-pos-lzy]{display:none;}</style>`
## Include the library
There are two options, you can either require the library within your JavaScript or link using a script tag.
### Require
Add the following line in your JavaScript:
`import PositiveLazyLoad from 'positive-lazy-load';`
### Script tag
Add the following script tag to the end of the body:
`<script src="[path-to-library]/dist/positive-lazy-load.js" defer></script>`
## Usage
Once the library has been included in the page, it will automatically lazy load elements with matching attributes.
### `<img>` tag
To lazy load an image tag, specify the `data-pos-src` attribute on any `<img>` tag with the value being the URL of the image to display.
You can leave the `src` attribute blank, however this is not valid HTML.  Using a base64 data URL will prevent a network request, we recommend setting the `src` attribute to `data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw` as this is the smallest invisible image that can be generated. 
### Background images
To lazy load a background image, specify the `data-pos-bg-src` on any element you want to apply the image to.  The value of this attribute can either be a URL of the image to display or a JSON string containing multiple images with breakpoints.
The format of the JSON string should be:
`[
	{
		"bp": 0,
		"url": "[mobile-image-url-here]"
	},
	{
		"bp": 768,
		"url": "[tablet-image-url-here]"
	},
	{
		"bp": 991,
		"url": "[desktop-image-url-here]"
	}
]`
Each item in the array has a `bp` and `url` property.
The `bp` value is the minimum screen width to display the image, it should be an integer.
The `url` value is the URL of the image, it should be a string.
You can add as many items as you want to the array.
When encoding the JSON string, replace `"` with `&quot;`.
### Videos
To lazy load a video you need to add the `data-pos-lzy` attribute and the `preload="none"` attribute to the `<video>` element.
For each `<source>` element replace the `src` attribute with the `data-pos-src` attribute.
If you have a fallback `<img>` element in the video too, replace the `src` attribute with `data-pos-src`.