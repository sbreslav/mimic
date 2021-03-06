// The MIT License (MIT)
//
// Copyright (c) 2014 Autodesk, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// http://opensource.org/licenses/MIT

// namespace:
this.arEasel = this.arEasel||{};

(function() {


var PushButton = function(text, style) {
	this.initialize(text, style);
}
PushButton.prototype = new createjs.Container(); // extend Text.

// save off initialize method from Text so we can call it from our own:
PushButton.prototype.Container_initialize = PushButton.prototype.initialize;

// overwrite Text's initialize method with our own:
PushButton.prototype.initialize = function(text, style) {
	this.Container_initialize();
	
	this.padding = style.padding;
	this.textColor = style.textColor;
	this.textHoverColor = style.textHoverColor;
	
	this.backgroundColor = style.backgroundColor;
	this.backgroundHoverColor = style.backgroundHoverColor;

	
	this.textLabel = new createjs.Text(text, style.font, style.textColor);
	this.addChild(this.textLabel);
	this.textLabel.x = this.padding;
	this.textLabel.y = this.padding;
	
	this.hover = false;

	this.hitArea = new createjs.Shape();
	
	this.width = this.textLabel.lineWidth||this.textLabel.getMeasuredWidth() + 2 * this.padding;
	this.height = this.textLabel.getMeasuredHeight() + 2 * this.padding;
	this.cornerRadius = style.cornerRadius;
	
	this.cursor = "pointer";
	

}

// use the same approach with draw:
PushButton.prototype.Container_draw = PushButton.prototype.draw;
PushButton.prototype.draw = function(ctx, ignoreCache) {
	// save default color, and overwrite it with the hover color if appropriate:
	var textColor = this.textColor;
	var backgroundColor = this.backgroundColor;
	
	if (this.hover) { this.textColor = this.textHoverColor; this.backgroundColor = this.backgroundHoverColor;}
	
	this.hitArea.graphics.clear().f(this.backgroundColor).rr(0,0,this.width, this.height, this.cornerRadius).draw(ctx, ignoreCache);
	
	this.textLabel.color = this.textColor;
	
	// call Text's drawing method to do the real work of drawing to the canvas:
	this.Container_draw(ctx, ignoreCache);
	
	// restore the default color value:
	this.textColor = textColor;
	this.backgroundColor = backgroundColor;
	
	// update hit area so the full text area is clickable, not just the characters:
	this.hitArea.graphics.clear().beginFill("#FFF").drawRect(0,0,this.width , this.height);
	
	
}

// set up the handlers for mouseover / out:
PushButton.prototype.onMouseOver = function() {
	this.hover = true;
}
PushButton.prototype.onMouseOut = function() {
	this.hover = false;
}

PushButton.prototype.updateText = function(t){
	this.textLabel.text = t;
	this.width = this.textLabel.lineWidth||this.textLabel.getMeasuredWidth() + 2 * this.padding;
	this.height = this.textLabel.getMeasuredHeight() + 2 * this.padding;
}

PushButton.prototype.onClick = function() {

	if (this.parent && this.parent.clearSelection){
		this.parent.clearSelection();
	}	
	this.selected = !this.selected;
	//alert("PushButton was clicked");
}

arEasel.PushButton = PushButton;
}());