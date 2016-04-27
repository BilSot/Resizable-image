function ImageRectangle(canvas) {
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");

	this.imageX = 50;
	this.imageY = 50;
	this.imageWidth = this.imageHeight = this.imageFullWidth = this.imageFullHeight = 0;
	this.img = new Image();
	this.anchorBullets = new AnchorBullets();
}

ImageRectangle.prototype.loadImg = function () {
	this.img.src = "Chrysanthemum.jpg";
	this.imageWidth = this.img.width;
	this.imageHeight = this.img.height;
	this.imageFullWidth = this.imageX + this.imageWidth;
	this.imageFullHeight = this.imageY + this.imageHeight;
	this.drawImage(true, false);
};

ImageRectangle.prototype.drawImage = function(withAnchors, withBorders) {

	// clear the canvas
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

	// draw the image
	this.ctx.drawImage(this.img, this.imageX, this.imageY, this.imageWidth, this.imageHeight);

	// optionally draw the draggable anchors
	if (withAnchors) {
		//draw anchor top-left
		this.anchorBullets.drawDragAnchor(this.imageX, this.imageY, this.ctx);
		//draw anchor top-right
		this.anchorBullets.drawDragAnchor(this.imageFullWidth, this.imageY, this.ctx);
		//draw anchor bottom-right
		this.anchorBullets.drawDragAnchor(this.imageFullWidth, this.imageFullHeight, this.ctx);
		//draw anchor bottom-left
		this.anchorBullets.drawDragAnchor(this.imageX, this.imageFullHeight, this.ctx);
	}

	// optionally draw the connecting border lines
	if (withBorders) {
		this.ctx.beginPath();
		this.ctx.moveTo(this.imageX, this.imageY);
		this.ctx.lineTo(this.imageFullWidth, this.imageY);
		this.ctx.lineTo(this.imageFullWidth, this.imageFullHeight);
		this.ctx.lineTo(this.imageX, this.imageFullHeight);
		this.ctx.closePath();
		this.ctx.stroke();
	}

};