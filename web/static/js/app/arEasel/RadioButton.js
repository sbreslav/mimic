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
// http://opensource.org/licenses/MIT// namespace:this.arEasel = this.arEasel||{};(function() {// define a new RadioButton class that extends Text, and handles drawing a hit area// and implementing a hover color.var RadioButton = function(text, style) {	this.initialize(text, style);}RadioButton.prototype = new createjs.Text(); // extend Text.// save off initialize method from Text so we can call it from our own:RadioButton.prototype.Text_initialize = RadioButton.prototype.initialize;// overwrite Text's initialize method with our own:RadioButton.prototype.initialize = function(text, style) {	this.Text_initialize("     "+text, style.font, style.color); 	this.hoverColor = style.hoverColor;	this.hover = false;	this.selected = false;	this.hitArea = new createjs.Shape();	this.textBaseline = "top";	this.BulletRadius = this.getMeasuredHeight()/2.0;	this.cursor = "pointer";	this.value = text;	}// use the same approach with draw:RadioButton.prototype.Text_draw = RadioButton.prototype.draw;RadioButton.prototype.draw = function(ctx, ignoreCache) {	// save default color, and overwrite it with the hover color if appropriate:	var color = this.color;	if (this.hover) { this.color = this.hoverColor; }		circle = new createjs.Shape();	    circle.graphics.beginFill(this.color).drawCircle(this.BulletRadius, this.BulletRadius, this.BulletRadius);	circle.draw(ctx, ignoreCache);	if (!this.selected){		circle.graphics.beginFill("white").drawCircle(this.BulletRadius, this.BulletRadius, this.BulletRadius/2.0);		circle.draw(ctx, ignoreCache);	}	// call Text's drawing method to do the real work of drawing to the canvas:	this.Text_draw(ctx, ignoreCache);		// restore the default color value:	this.color = color;		// update hit area so the full text area is clickable, not just the characters:	this.hitArea.graphics.clear().beginFill("#FFF").drawRect(0,0,this.lineWidth||this.getMeasuredWidth(), this.getMeasuredHeight());}// set up the handlers for mouseover / out:RadioButton.prototype.onMouseOver = function() {	this.hover = true;}RadioButton.prototype.onMouseOut = function() {	this.hover = false;}RadioButton.prototype.setSelection = function(s) {	this.selected = s;}RadioButton.prototype.onClick = function() {	if (this.parent && this.parent.clearSelection){		this.parent.clearSelection();	}		this.selected = !this.selected;	//alert("RadioButton was clicked");}arEasel.RadioButton = RadioButton;}());