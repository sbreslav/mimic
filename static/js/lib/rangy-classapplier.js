/**
 * Class Applier module for Rangy.
 * Adds, removes and toggles classes on Ranges and Selections
 *
 * Part of Rangy, a cross-browser JavaScript range and selection library
 * https://github.com/timdown/rangy
 *
 * Depends on Rangy core.
 *
 * Copyright 2014, Tim Down
 * Licensed under the MIT license.
 * Version: 1.3.0-alpha.20140921
 * Build date: 21 September 2014
 */
!function(e,t){"function"==typeof define&&define.amd?define(["./rangy-core"],e):"undefined"!=typeof module&&"object"==typeof exports?module.exports=e(require("rangy")):e(t.rangy)}(function(e){e.createModule("ClassApplier",["WrappedSelection"],function(e,t){function n(e,t){for(var n in e)if(e.hasOwnProperty(n)&&t(n,e[n])===!1)return!1;return!0}function r(e){return e.replace(/^\s\s*/,"").replace(/\s\s*$/,"")}function i(e,t){return e.className&&new RegExp("(?:^|\\s)"+t+"(?:\\s|$)").test(e.className)}function o(e,t){e.className?i(e,t)||(e.className+=" "+t):e.className=t}function s(e){return e&&e.split(/\s+/).sort().join(" ")}function a(e){return s(e.className)}function l(e,t){return a(e)==a(t)}function f(e,t,n,r,i){var o=e.node,s=e.offset,a=o,l=s;o==r&&s>i&&++l,o!=t||s!=n&&s!=n+1||(a=r,l+=i-n),o==t&&s>n+1&&--l,e.node=a,e.offset=l}function d(e,t,n){e.node==t&&e.offset>n&&--e.offset}function u(e,t,n,r){-1==n&&(n=t.childNodes.length);for(var i,o=e.parentNode,s=M.getNodeIndex(e),a=0;i=r[a++];)f(i,o,s,t,n);t.childNodes.length==n?t.appendChild(e):t.insertBefore(e,t.childNodes[n])}function p(e,t){for(var n,r=e.parentNode,i=M.getNodeIndex(e),o=0;n=t[o++];)d(n,r,i);e.parentNode.removeChild(e)}function c(e,t,n,r,i){for(var o,s=[];o=e.firstChild;)u(o,t,n++,i),s.push(o);return r&&p(e,i),s}function h(e,t){return c(e,e.parentNode,M.getNodeIndex(e),!0,t)}function g(e,t){var n=e.cloneRange();n.selectNodeContents(t);var r=n.intersection(e),i=r?r.toString():"";return""!=i}function m(e){for(var t,n=e.getNodes([3]),r=0;(t=n[r])&&!g(e,t);)++r;for(var i=n.length-1;(t=n[i])&&!g(e,t);)--i;return n.slice(r,i+1)}function N(e,t){if(e.attributes.length!=t.attributes.length)return!1;for(var n,r,i,o=0,s=e.attributes.length;s>o;++o)if(n=e.attributes[o],i=n.name,"class"!=i){if(r=t.attributes.getNamedItem(i),null===n!=(null===r))return!1;if(n.specified!=r.specified)return!1;if(n.specified&&n.nodeValue!==r.nodeValue)return!1}return!0}function v(e,t){for(var n,r=0,i=e.attributes.length;i>r;++r)if(n=e.attributes[r].name,(!t||!j(t,n))&&e.attributes[r].specified&&"class"!=n)return!0;return!1}function y(e,t){return n(t,function(t,n){if("object"==typeof n){if(!y(e[t],n))return!1}else if(e[t]!==n)return!1})}function C(e){var t;return e&&1==e.nodeType&&((t=e.parentNode)&&9==t.nodeType&&"on"==t.designMode||$(e)&&!$(e.parentNode))}function T(e){return($(e)||1!=e.nodeType&&$(e.parentNode))&&!C(e)}function E(e){return e&&1==e.nodeType&&!U.test(H(e,"display"))}function b(e){if(0==e.data.length)return!0;if(V.test(e.data))return!1;var t=H(e.parentNode,"whiteSpace");switch(t){case"pre":case"pre-wrap":case"-moz-pre-wrap":return!1;case"pre-line":if(/[\r\n]/.test(e.data))return!1}return E(e.previousSibling)||E(e.nextSibling)}function A(e){var t,n,r=[];for(t=0;n=e[t++];)r.push(new L(n.startContainer,n.startOffset),new L(n.endContainer,n.endOffset));return r}function S(e,t){for(var n,r,i,o=0,s=e.length;s>o;++o)n=e[o],r=t[2*o],i=t[2*o+1],n.setStartAndEnd(r.node,r.offset,i.node,i.offset)}function x(e,t){return M.isCharacterDataNode(e)?0==t?!!e.previousSibling:t==e.length?!!e.nextSibling:!0:t>0&&t<e.childNodes.length}function R(e,n,r,i){var o,s,a=0==r;if(M.isAncestorOf(n,e))return e;if(M.isCharacterDataNode(n)){var l=M.getNodeIndex(n);if(0==r)r=l;else{if(r!=n.length)throw t.createError("splitNodeAt() should not be called with offset in the middle of a data node ("+r+" in "+n.data);r=l+1}n=n.parentNode}if(x(n,r)){o=n.cloneNode(!1),s=n.parentNode,o.id&&o.removeAttribute("id");for(var f,d=0;f=n.childNodes[r];)u(f,o,d++,i);return u(o,s,M.getNodeIndex(n)+1,i),n==e?o:R(e,s,M.getNodeIndex(o),i)}if(e!=n){o=n.parentNode;var p=M.getNodeIndex(n);return a||p++,R(e,o,p,i)}return e}function w(e,t){return e.namespaceURI==t.namespaceURI&&e.tagName.toLowerCase()==t.tagName.toLowerCase()&&l(e,t)&&N(e,t)&&"inline"==H(e,"display")&&"inline"==H(t,"display")}function P(e){var t=e?"nextSibling":"previousSibling";return function(n,r){var i=n.parentNode,o=n[t];if(o){if(o&&3==o.nodeType)return o}else if(r&&(o=i[t],o&&1==o.nodeType&&w(i,o))){var s=o[e?"firstChild":"lastChild"];if(s&&3==s.nodeType)return s}return null}}function O(e){this.isElementMerge=1==e.nodeType,this.textNodes=[];var t=this.isElementMerge?e.lastChild:e;t&&(this.textNodes[0]=t)}function I(e,t,i){var o,s,a,l,f=this;f.cssClass=f.className=e;var d=null,u={};if("object"==typeof t&&null!==t){for(i=t.tagNames,d=t.elementProperties,u=t.elementAttributes,s=0;l=F[s++];)t.hasOwnProperty(l)&&(f[l]=t[l]);o=t.normalize}else o=t;f.normalize="undefined"==typeof o?!0:o,f.attrExceptions=[];var p=document.createElement(f.elementTagName);f.elementProperties=f.copyPropertiesToElement(d,p,!0),n(u,function(e){f.attrExceptions.push(e)}),f.elementAttributes=u,f.elementSortedClassName=f.elementProperties.hasOwnProperty("className")?f.elementProperties.className:e,f.applyToAnyTagName=!1;var c=typeof i;if("string"==c)"*"==i?f.applyToAnyTagName=!0:f.tagNames=r(i.toLowerCase()).split(/\s*,\s*/);else if("object"==c&&"number"==typeof i.length)for(f.tagNames=[],s=0,a=i.length;a>s;++s)"*"==i[s]?f.applyToAnyTagName=!0:f.tagNames.push(i[s].toLowerCase());else f.tagNames=[f.elementTagName]}function W(e,t,n){return new I(e,t,n)}var M=e.dom,L=M.DomPosition,j=M.arrayContains,z=M.isHtmlNamespace,B="span",D=function(){function e(e,t,n){return t&&n?" ":""}return function(t,n){t.className&&(t.className=t.className.replace(new RegExp("(^|\\s)"+n+"(\\s|$)"),e))}}(),H=M.getComputedStyleProperty,$=function(){var e=document.createElement("div");return"boolean"==typeof e.isContentEditable?function(e){return e&&1==e.nodeType&&e.isContentEditable}:function(e){return e&&1==e.nodeType&&"false"!=e.contentEditable?"true"==e.contentEditable||$(e.parentNode):!1}}(),U=/^inline(-block|-table)?$/i,V=/[^\r\n\t\f \u200B]/,k=P(!1),q=P(!0);O.prototype={doMerge:function(e){var t=this.textNodes,n=t[0];if(t.length>1){for(var r,i,o,s,a=M.getNodeIndex(n),l=[],f=0,d=0,u=t.length;u>d;++d){if(r=t[d],i=r.parentNode,d>0&&(i.removeChild(r),i.hasChildNodes()||i.parentNode.removeChild(i),e))for(o=0;s=e[o++];)s.node==r&&(s.node=n,s.offset+=f),s.node==i&&s.offset>a&&(--s.offset,s.offset==a+1&&u-1>d&&(s.node=n,s.offset=f));l[d]=r.data,f+=r.data.length}n.data=l.join("")}return n.data},getLength:function(){for(var e=this.textNodes.length,t=0;e--;)t+=this.textNodes[e].length;return t},toString:function(){for(var e=[],t=0,n=this.textNodes.length;n>t;++t)e[t]="'"+this.textNodes[t].data+"'";return"[Merge("+e.join(",")+")]"}};var F=["elementTagName","ignoreWhiteSpace","applyToEditableOnly","useExistingElements","removeEmptyElements","onElementCreate"],G={};I.prototype={elementTagName:B,elementProperties:{},elementAttributes:{},ignoreWhiteSpace:!0,applyToEditableOnly:!1,useExistingElements:!0,removeEmptyElements:!0,onElementCreate:null,copyPropertiesToElement:function(e,t,n){var r,i,a,l,f,d,u={};for(var p in e)if(e.hasOwnProperty(p))if(l=e[p],f=t[p],"className"==p)o(t,l),o(t,this.className),t[p]=s(t[p]),n&&(u[p]=t[p]);else if("style"==p){i=f,n&&(u[p]=a={});for(r in e[p])i[r]=l[r],n&&(a[r]=i[r]);this.attrExceptions.push(p)}else t[p]=l,n&&(u[p]=t[p],d=G.hasOwnProperty(p)?G[p]:p,this.attrExceptions.push(d));return n?u:""},copyAttributesToElement:function(e,t){for(var n in e)e.hasOwnProperty(n)&&t.setAttribute(n,e[n])},hasClass:function(e){return 1==e.nodeType&&j(this.tagNames,e.tagName.toLowerCase())&&i(e,this.className)},getSelfOrAncestorWithClass:function(e){for(;e;){if(this.hasClass(e))return e;e=e.parentNode}return null},isModifiable:function(e){return!this.applyToEditableOnly||T(e)},isIgnorableWhiteSpaceNode:function(e){return this.ignoreWhiteSpace&&e&&3==e.nodeType&&b(e)},postApply:function(e,t,n,r){for(var i,o,s,a=e[0],l=e[e.length-1],f=[],d=a,u=l,p=0,c=l.length,h=0,g=e.length;g>h;++h)o=e[h],s=k(o,!r),s?(i||(i=new O(s),f.push(i)),i.textNodes.push(o),o===a&&(d=i.textNodes[0],p=d.length),o===l&&(u=i.textNodes[0],c=i.getLength())):i=null;var m=q(l,!r);if(m&&(i||(i=new O(l),f.push(i)),i.textNodes.push(m)),f.length){for(h=0,g=f.length;g>h;++h)f[h].doMerge(n);t.setStartAndEnd(d,p,u,c)}},createContainer:function(e){var t=e.createElement(this.elementTagName);return this.copyPropertiesToElement(this.elementProperties,t,!1),this.copyAttributesToElement(this.elementAttributes,t),o(t,this.className),this.onElementCreate&&this.onElementCreate(t,this),t},applyToTextNode:function(e){var t=e.parentNode;if(1==t.childNodes.length&&this.useExistingElements&&z(t)&&j(this.tagNames,t.tagName.toLowerCase())&&y(t,this.elementProperties))o(t,this.className);else{var n=this.createContainer(M.getDocument(e));e.parentNode.insertBefore(n,e),n.appendChild(e)}},isRemovable:function(e){return z(e)&&e.tagName.toLowerCase()==this.elementTagName&&a(e)==this.elementSortedClassName&&y(e,this.elementProperties)&&!v(e,this.attrExceptions)&&this.isModifiable(e)},isEmptyContainer:function(e){var t=e.childNodes.length;return 1==e.nodeType&&this.isRemovable(e)&&(0==t||1==t&&this.isEmptyContainer(e.firstChild))},removeEmptyContainers:function(e){for(var t,n=this,r=e.getNodes([1],function(e){return n.isEmptyContainer(e)}),i=[e],o=A(i),s=0;t=r[s++];)p(t,o);S(i,o)},undoToTextNode:function(e,t,n,r){if(!t.containsNode(n)){var i=t.cloneRange();i.selectNode(n),i.isPointInRange(t.endContainer,t.endOffset)&&(R(n,t.endContainer,t.endOffset,r),t.setEndAfter(n)),i.isPointInRange(t.startContainer,t.startOffset)&&(n=R(n,t.startContainer,t.startOffset,r))}this.isRemovable(n)?h(n,r):D(n,this.className)},applyToRange:function(e,t){t=t||[];var n=A(t||[]);e.splitBoundariesPreservingPositions(n),this.removeEmptyElements&&this.removeEmptyContainers(e);var r=m(e);if(r.length){for(var i,o=0;i=r[o++];)this.isIgnorableWhiteSpaceNode(i)||this.getSelfOrAncestorWithClass(i)||!this.isModifiable(i)||this.applyToTextNode(i,n);i=r[r.length-1],e.setStartAndEnd(r[0],0,i,i.length),this.normalize&&this.postApply(r,e,n,!1),S(t,n)}},applyToRanges:function(e){for(var t=e.length;t--;)this.applyToRange(e[t],e);return e},applyToSelection:function(t){var n=e.getSelection(t);n.setRanges(this.applyToRanges(n.getAllRanges()))},undoToRange:function(e,t){t=t||[];var n=A(t);e.splitBoundariesPreservingPositions(n),this.removeEmptyElements&&this.removeEmptyContainers(e,n);var r,i,o=m(e),s=o[o.length-1];if(o.length){for(var a=0,l=o.length;l>a;++a)r=o[a],i=this.getSelfOrAncestorWithClass(r),i&&this.isModifiable(r)&&this.undoToTextNode(r,e,i,n),e.setStartAndEnd(o[0],0,s,s.length);this.normalize&&this.postApply(o,e,n,!0),S(t,n)}},undoToRanges:function(e){for(var t=e.length;t--;)this.undoToRange(e[t],e);return e},undoToSelection:function(t){var n=e.getSelection(t),r=e.getSelection(t).getAllRanges();this.undoToRanges(r),n.setRanges(r)},isAppliedToRange:function(e){if(e.collapsed||""==e.toString())return!!this.getSelfOrAncestorWithClass(e.commonAncestorContainer);var t=e.getNodes([3]);if(t.length)for(var n,r=0;n=t[r++];)if(!this.isIgnorableWhiteSpaceNode(n)&&g(e,n)&&this.isModifiable(n)&&!this.getSelfOrAncestorWithClass(n))return!1;return!0},isAppliedToRanges:function(e){var t=e.length;if(0==t)return!1;for(;t--;)if(!this.isAppliedToRange(e[t]))return!1;return!0},isAppliedToSelection:function(t){var n=e.getSelection(t);return this.isAppliedToRanges(n.getAllRanges())},toggleRange:function(e){this.isAppliedToRange(e)?this.undoToRange(e):this.applyToRange(e)},toggleSelection:function(e){this.isAppliedToSelection(e)?this.undoToSelection(e):this.applyToSelection(e)},getElementsWithClassIntersectingRange:function(e){var t=[],n=this;return e.getNodes([3],function(e){var r=n.getSelfOrAncestorWithClass(e);r&&!j(t,r)&&t.push(r)}),t},detach:function(){}},I.util={hasClass:i,addClass:o,removeClass:D,hasSameClasses:l,replaceWithOwnChildren:h,elementsHaveSameNonClassAttributes:N,elementHasNonClassAttributes:v,splitNodeAt:R,isEditableElement:$,isEditingHost:C,isEditable:T},e.CssClassApplier=e.ClassApplier=I,e.createCssClassApplier=e.createClassApplier=W})},this);