/**
 * Highlighter module for Rangy, a cross-browser JavaScript range and selection library
 * https://github.com/timdown/rangy
 *
 * Depends on Rangy core, TextRange and CssClassApplier modules.
 *
 * Copyright 2014, Tim Down
 * Licensed under the MIT license.
 * Version: 1.3.0-alpha.20140921
 * Build date: 21 September 2014
 */
!function(e,t){"function"==typeof define&&define.amd?define(["./rangy-core"],e):"undefined"!=typeof module&&"object"==typeof exports?module.exports=e(require("rangy")):e(t.rangy)}(function(e){e.createModule("Highlighter",["ClassApplier"],function(e){function t(e,t){return e.characterRange.start-t.characterRange.start}function n(e,t){this.type=e,this.converterCreator=t}function r(e,t){f[e]=new n(e,t)}function i(e){var t=f[e];if(t instanceof n)return t.create();throw new Error("Highlighter type '"+e+"' is not valid")}function a(e,t){this.start=e,this.end=t}function s(e,t,n,r,i,a){i?(this.id=i,p=Math.max(p,i+1)):this.id=p++,this.characterRange=t,this.doc=e,this.classApplier=n,this.converter=r,this.containerElementId=a||null,this.applied=!1}function h(e,t){t=t||"textContent",this.doc=e||document,this.classAppliers={},this.highlights=[],this.converter=i(t)}var o=e.dom,c=o.arrayContains,l=o.getBody,g=e.util.createOptions,u=[].forEach?function(e,t){e.forEach(t)}:function(e,t){for(var n=0,r=e.length;r>n;++n)t(e[n])},p=1,f={};n.prototype.create=function(){var e=this.converterCreator();return e.type=this.type,e},e.registerHighlighterType=r,a.prototype={intersects:function(e){return this.start<e.end&&this.end>e.start},isContiguousWith:function(e){return this.start==e.end||this.end==e.start},union:function(e){return new a(Math.min(this.start,e.start),Math.max(this.end,e.end))},intersection:function(e){return new a(Math.max(this.start,e.start),Math.min(this.end,e.end))},getComplements:function(e){var t=[];if(this.start>=e.start){if(this.end<=e.end)return[];t.push(new a(e.end,this.end))}else t.push(new a(this.start,Math.min(this.end,e.start))),this.end>e.end&&t.push(new a(e.end,this.end));return t},toString:function(){return"[CharacterRange("+this.start+", "+this.end+")]"}},a.fromCharacterRange=function(e){return new a(e.start,e.end)};var d={rangeToCharacterRange:function(e,t){var n=e.getBookmark(t);return new a(n.start,n.end)},characterRangeToRange:function(t,n,r){var i=e.createRange(t);return i.moveToBookmark({start:n.start,end:n.end,containerNode:r}),i},serializeSelection:function(e,t){for(var n=e.getAllRanges(),r=n.length,i=[],a=1==r&&e.isBackward(),s=0,h=n.length;h>s;++s)i[s]={characterRange:this.rangeToCharacterRange(n[s],t),backward:a};return i},restoreSelection:function(e,t,n){e.removeAllRanges();for(var r,i,a,s=e.win.document,h=0,o=t.length;o>h;++h)i=t[h],a=i.characterRange,r=this.characterRangeToRange(s,i.characterRange,n),e.addRange(r,i.backward)}};r("textContent",function(){return d}),r("TextRange",function(){var t;return function(){if(!t){var n=e.modules.TextRange;if(!n)throw new Error("TextRange module is missing.");if(!n.supported)throw new Error("TextRange module is present but not supported.");t={rangeToCharacterRange:function(e,t){return a.fromCharacterRange(e.toCharacterRange(t))},characterRangeToRange:function(t,n,r){var i=e.createRange(t);return i.selectCharacters(r,n.start,n.end),i},serializeSelection:function(e,t){return e.saveCharacterRanges(t)},restoreSelection:function(e,t,n){e.restoreCharacterRanges(n,t)}}}return t}}()),s.prototype={getContainerElement:function(){return this.containerElementId?this.doc.getElementById(this.containerElementId):l(this.doc)},getRange:function(){return this.converter.characterRangeToRange(this.doc,this.characterRange,this.getContainerElement())},fromRange:function(e){this.characterRange=this.converter.rangeToCharacterRange(e,this.getContainerElement())},getText:function(){return this.getRange().toString()},containsElement:function(e){return this.getRange().containsNodeContents(e.firstChild)},unapply:function(){this.classApplier.undoToRange(this.getRange()),this.applied=!1},apply:function(){this.classApplier.applyToRange(this.getRange()),this.applied=!0},getHighlightElements:function(){return this.classApplier.getElementsWithClassIntersectingRange(this.getRange())},toString:function(){return"[Highlight(ID: "+this.id+", class: "+this.classApplier.className+", character range: "+this.characterRange.start+" - "+this.characterRange.end+")]"}},h.prototype={addClassApplier:function(e){this.classAppliers[e.className]=e},getHighlightForElement:function(e){for(var t=this.highlights,n=0,r=t.length;r>n;++n)if(t[n].containsElement(e))return t[n];return null},removeHighlights:function(e){for(var t,n=0,r=this.highlights.length;r>n;++n)t=this.highlights[n],c(e,t)&&(t.unapply(),this.highlights.splice(n--,1))},removeAllHighlights:function(){this.removeHighlights(this.highlights)},getIntersectingHighlights:function(e){{var t=[],n=this.highlights;this.converter}return u(e,function(e){u(n,function(n){e.intersectsRange(n.getRange())&&!c(t,n)&&t.push(n)})}),t},highlightCharacterRanges:function(t,n,r){var i,h,o,c=this.highlights,l=this.converter,p=this.doc,f=[],d=t?this.classAppliers[t]:null;r=g(r,{containerElementId:null,exclusive:!0});var v,R,m,C=r.containerElementId,w=r.exclusive;C&&(v=this.doc.getElementById(C),v&&(R=e.createRange(this.doc),R.selectNodeContents(v),m=new a(0,R.toString().length)));var E,y,x,I,T,A;for(i=0,h=n.length;h>i;++i)if(E=n[i],T=[],m&&(E=E.intersection(m)),E.start!=E.end){for(o=0;o<c.length;++o)x=!1,C==c[o].containerElementId&&(y=c[o].characterRange,I=d==c[o].classApplier,A=!I&&w,(y.intersects(E)||y.isContiguousWith(E))&&(I||A)&&(A&&u(y.getComplements(E),function(e){T.push(new s(p,e,c[o].classApplier,l,null,C))}),x=!0,I&&(E=y.union(E)))),x?(f.push(c[o]),c[o]=new s(p,y.union(E),d,l,null,C)):T.push(c[o]);d&&T.push(new s(p,E,d,l,null,C)),this.highlights=c=T}u(f,function(e){e.unapply()});var H=[];return u(c,function(e){e.applied||(e.apply(),H.push(e))}),H},highlightRanges:function(t,n,r){var i=[],a=this.converter;r=g(r,{containerElement:null,exclusive:!0});var s,h=r.containerElement,o=h?h.id:null;return h&&(s=e.createRange(h),s.selectNodeContents(h)),u(n,function(e){var t=h?s.intersection(e):e;i.push(a.rangeToCharacterRange(t,h||l(e.getDocument())))}),this.highlightCharacterRanges(t,i,{containerElementId:o,exclusive:r.exclusive})},highlightSelection:function(t,n){var r=this.converter,i=t?this.classAppliers[t]:!1;n=g(n,{containerElementId:null,selection:e.getSelection(),exclusive:!0});var s=n.containerElementId,h=n.exclusive,o=n.selection,c=o.win.document,p=s?c.getElementById(s):l(c);if(!i&&t!==!1)throw new Error("No class applier found for class '"+t+"'");var f=r.serializeSelection(o,p),d=[];u(f,function(e){d.push(a.fromCharacterRange(e.characterRange))});var v=this.highlightCharacterRanges(t,d,{containerElementId:s,exclusive:h});return r.restoreSelection(o,f,p),v},unhighlightSelection:function(t){t=t||e.getSelection();var n=this.getIntersectingHighlights(t.getAllRanges());return this.removeHighlights(n),t.removeAllRanges(),n},getHighlightsInSelection:function(t){return t=t||e.getSelection(),this.getIntersectingHighlights(t.getAllRanges())},selectionOverlapsHighlight:function(e){return this.getHighlightsInSelection(e).length>0},serialize:function(e){var n=this.highlights;n.sort(t);var r=["type:"+this.converter.type];return e=g(e,{serializeHighlightText:!1}),u(n,function(t){var n=t.characterRange,i=[n.start,n.end,t.id,t.classApplier.className,t.containerElementId];e.serializeHighlightText&&i.push(t.getText()),r.push(i.join("$"))}),r.join("|")},deserialize:function(e){var t,n,r,h=e.split("|"),o=[],c=h[0],g=!1;if(!c||!(t=/^type:(\w+)$/.exec(c)))throw new Error("Serialized highlights are invalid.");n=t[1],n!=this.converter.type&&(r=i(n),g=!0),h.shift();for(var u,p,f,d,v,R,m=h.length;m-->0;){if(R=h[m].split("$"),f=new a(+R[0],+R[1]),d=R[4]||null,v=d?this.doc.getElementById(d):l(this.doc),g&&(f=this.converter.rangeToCharacterRange(r.characterRangeToRange(this.doc,f,v),v)),u=this.classAppliers[R[3]],!u)throw new Error("No class applier found for class '"+R[3]+"'");p=new s(this.doc,f,u,this.converter,parseInt(R[2]),d),p.apply(),o.push(p)}this.highlights=o}},e.Highlighter=h,e.createHighlighter=function(e,t){return new h(e,t)}})},this);