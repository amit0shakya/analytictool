// helper functions

Array.prototype.contains = function(v) {
  for(var i = 0; i < this.length; i++) {
    if(this[i] === v) return true;
  }
  return false;
};
// to find unique elements in an array
Array.prototype.unique = function() {
  var arr = [];
  for(var i = 0; i < this.length; i++) {
    if(!arr.contains(this[i])) {
      arr.push(this[i]);
    }
  }
  return arr;
}

// total in count for an node : returns number
var get_in_count = function(in_data){
  var count = 0;
  for(var i=0;i<in_data.length;i++){
    console.log(in_data);
    count += in_data[i].y;
  }
  return count;
}

// total out count for an node : returns number
var get_out_count = function(out_data){
  var count = 0;
  for(var i=0;i<out_data.length;i++){
    count += out_data[i].y;
  }
  return count;
}

// lable for an activity : return string
var get_label_activity = function(unique_activity){
  var t = unique_activity.split('.');
  var t1 = t[t.length-1];
  return t1;
}

// id for an activity : returns string
var get_activity_id = function(unique_activity){
  var t = unique_activity.split('.');
  var str = '';
  for(var i=0;i<t.length;i++){
    str += t[i]+'_';
  }
  return str;
}


//  namespace for an activity : returns string
var get_namespace = function(unique_activity){
  return unique_activity;
}


// all out activity for a node : returns array
var out_data = function(unique_activity,data,key){
    var out_data = [];
    var total_out_count = 0;
    for(var j=0;j<data.length;j++){
      if(unique_activity === data[j].x2){
        out_data.push(data[j])
        total_out_count += data[j].y;
      }
    }
    if(key ==='data'){
      return out_data;
    }else{
      return total_out_count;
    }
  return null;
}

// all in activity for a node : returns array
var in_data = function(unique_activity,data,key){
  var in_data = [];
  var total_in_count = 0;
    for(var j=0;j<data.length;j++){
      if(unique_activity === data[j].x1){
        in_data.push(data[j]);
        total_in_count += data[j].y;
      }
    }
    if(key === 'data'){
      return in_data;
    }else{
      return total_in_count;
    }
  return null;
}
