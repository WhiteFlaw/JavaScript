Object.prototype.equals = function(object2) {
  //For the first loop, we only check for types
  for (propName in this) {
    //Check for inherited methods and properties - like .equals itself
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
    //Return false if the return value is different
    if (this.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
      return false;
    } else if (typeof this[propName] != typeof object2[propName]) {
      //Different types => not equal
      return false;
    }
  }
  //Now a deeper check using other objects property names
  for(propName in object2) {
    //We must check instances anyway, there may be a property that only exists in object2
    //I wonder, if remembering the checked values from the first loop would be faster or not 
    if (this.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
      return false;
    } else if (typeof this[propName] != typeof object2[propName]) {
      return false;
    }
    //If the property is inherited, do not check any more (it must be equa if both objects inherit it)
    if(!this.hasOwnProperty(propName)) continue;
    //Now the detail check and recursion
    //This returns the script back to the array comparing
    /**REQUIRES Array.equals**/
    if (this[propName] instanceof Array && object2[propName] instanceof Array) {
      // recurse into the nested arrays
      if (!this[propName].equals(object2[propName])) return false;
    } else if (this[propName] instanceof Object && object2[propName] instanceof Object) {
      // recurse into another objects
      //console.log("Recursing to compare ", this[propName],"with",object2[propName], " both named \""+propName+"\"");
      if (!this[propName].equals(object2[propName])) return false;
    } else if(this[propName] != object2[propName]) {
      return false;
    }
  }
  //If everything passed, let's say YES
  return true;
}  
