function AnchorBullets(){
	this.pi = Math.PI * 2;
	this.anchorRadius = 6;
	this.anchorDiameter = Math.pow(this.anchorRadius, 2);
}

AnchorBullets.prototype.drawDragAnchor = function(startPoint, endPoint, canvas) {
	canvas.beginPath();
	canvas.arc(startPoint, endPoint, this.anchorRadius, 0, this.pi, false);
	canvas.closePath();
	canvas.fill();
};