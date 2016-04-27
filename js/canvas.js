function Canvas(canvas) {
	this.canvas = canvas;
	this.offsetX = this.canvas.offsetLeft;
	this.offsetY = this.canvas.offsetTop;
	this.draggingImage = false;
	this.dragAnchor;
	this.imageRectangle = new ImageRectangle(canvas);
	this.imageRectangle.loadImg();
}

Canvas.prototype.handleMouseDown = function(event){
	event = event || window.event;
	
	mouseStartX = parseInt(event.clientX - this.offsetX);
	mouseStartY = parseInt(event.clientY - this.offsetY);
	
	this.dragAnchor = this.anchorClicked(mouseStartX, mouseStartY);
	this.draggingImage = (this.dragAnchor < 0 && this.imgClicked());
};

Canvas.prototype.handleMouseUp = function(){
	this.draggingImage = false;
	this.dragAnchor = -1;
	this.imageRectangle.drawImage(true, false);
};

Canvas.prototype.handleMouseMove = function(event){
	event = event || window.event;
	var mouseX, mouseY, dragX, dragY;
	
	if (this.draggingImage) {
		mouseX = parseInt(event.clientX - this.offsetX);
		mouseY = parseInt(event.clientY - this.offsetY);
		
		dragX = mouseX - mouseStartX;
		dragY = mouseY - mouseStartY;

		this.imageRectangle.imageX += dragX;
		this.imageRectangle.imageFullWidth += dragX;
		this.imageRectangle.imageY += dragY;
		this.imageRectangle.imageFullHeight += dragY;

		mouseStartX = mouseX;
		mouseStartY = mouseY;

		this.imageRectangle.drawImage(false, true);
	} else if (this.dragAnchor > 0) {
		mouseX = parseInt(event.clientX - this.offsetX);
		mouseY = parseInt(event.clientY - this.offsetY);
		switch (this.dragAnchor) {
			case 1:
				//top-left anchor
				this.imageRectangle.imageX = mouseX;
				this.imageRectangle.imageY = mouseY;
				this.imageRectangle.imageHeight = this.imageRectangle.imageFullHeight - mouseY;
				this.imageRectangle.imageWidth = this.imageRectangle.imageFullWidth - mouseX;
				break;
			case 2:
				//top-right anchor
				this.imageRectangle.imageY = mouseY;
				this.imageRectangle.imageHeight = this.imageRectangle.imageFullHeight - mouseY;
				this.imageRectangle.imageWidth = mouseX - this.imageRectangle.imageX;
				break;
			case 3:
				//bottom-left anchor
				this.imageRectangle.imageX = mouseX;
				this.imageRectangle.imageWidth = this.imageRectangle.imageFullWidth - mouseX;
				this.imageRectangle.imageHeight = mouseY - this.imageRectangle.imageY;
				break;
			case 4:
				//bottom-right anchor
				this.imageRectangle.imageHeight = mouseY - this.imageRectangle.imageY;
				this.imageRectangle.imageWidth = mouseX - this.imageRectangle.imageX;
				break;
		}

		this.imageRectangle.imageFullWidth = this.imageRectangle.imageWidth + this.imageRectangle.imageX;
		this.imageRectangle.imageFullHeight = this.imageRectangle.imageHeight + this.imageRectangle.imageY;
		this.imageRectangle.drawImage(true, true);
	}
};

Canvas.prototype.handleMouseOut = function(){
	this.handleMouseUp();
};

Canvas.prototype.anchorClicked = function(mouseX, mouseY){
	var positionX, positionY;
	
	//check if mouse is on top-left anchor
	positionX = mouseX - this.imageRectangle.imageX;
	positionY = mouseY - this.imageRectangle.imageY;
	//we use positionX * positionX and positionY * positionY because we need to know if the mouse is also in the other half of the bullet
	if((Math.pow(positionX, 2) + Math.pow(positionY, 2)) <= this.imageRectangle.anchorBullets.anchorDiameter){
		return 1;
	}
	
	//check if mouse is on top-right anchor
	positionX = mouseX - this.imageRectangle.imageFullWidth;
	positionY = mouseY - this.imageRectangle.imageY;
	if((Math.pow(positionX, 2) + Math.pow(positionY, 2)) <= this.imageRectangle.anchorBullets.anchorDiameter){
		return 2;
	}
	
	//check if mouse is on bottom-left anchor
	positionX = mouseX - this.imageRectangle.imageX;
	positionY = mouseY - this.imageRectangle.imageFullHeight;
	if((Math.pow(positionX, 2) + Math.pow(positionY, 2)) <= this.imageRectangle.anchorBullets.anchorDiameter){
		return 3;
	}
	
	//check if mouse is on bottom-right anchor
	positionX = mouseX - this.imageRectangle.imageFullWidth;
	positionY = mouseY - this.imageRectangle.imageFullHeight;
	if((Math.pow(positionX, 2) + Math.pow(positionY, 2)) <= this.imageRectangle.anchorBullets.anchorDiameter){
		return 4;
	}
//	console.log("positionX " + positionX + " positionY " + positionY);
	return -1;
};

Canvas.prototype.imgClicked = function(){
	//check if mouse click is in range of image size
	return mouseStartX > this.imageRectangle.imageX && mouseStartX < this.imageRectangle.imageFullWidth && mouseStartY > this.imageRectangle.imageY && mouseStartY < this.imageRectangle.imageFullHeight;
};