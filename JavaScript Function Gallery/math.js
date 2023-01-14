/*
 * @description
 * @params
 * @return
 */
function dotproduct(a, b) {
    var ret = 0;
    for (let i = 0; i < a.length; i++) {
        ret += a[i] * b[i];
    }

    return ret;
}

/*
 * @description
 * @params
 * @return
 */
function matmul(m, x, vl) {
  var ret = [];
  var res_l = m.length / vl;
  for (var vi = 0; vi < x.length / vl; vi++) {  //vector index
    for (var r = 0; r < m.length / vl; r++) {  //row of matrix
      ret[vi * res_l + r] = 0;
      for (var i = 0; i < vl; i++) {
        ret[vi * res_l + r] += m[r * vl + i] * x[vi * vl + i];
      }
    }
  }
  return ret;
}

/*
 * @description
 * @params
 * @return
 */
function matmul2(m, x, vl) {
  var ret = [];
  var rows = m.length / vl;
  var cols = x.length / vl;
  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < cols; c++) {
      ret[r * cols + c] = 0;
      for (var i = 0; i < vl; i++) {
        ret[r * cols + c] += m[r * vl + i] * x[i * cols + c];
      }
    }
  }
  return ret;
}

/*
 * @description
 * @params
 * @return
 */
function vector4to3(v) {
  var ret = [];
  for (var i = 0; i < v.length; i++) {
    if ((i + 1) % 4 != 0) {
      ret.push(v[i]);
    }
  }
  return ret;
}

/*
 * @description
 * @params
 * @return
 */
function vector_range(v) {
  if (v.length === 0) {
    return null;
  }
  var min, max;
  min = [...v[0]];
  max = [...v[0]];

  for (var i = 1; i < v.length; ++i) {
    for (var j = 0; j < min.length; ++j) {
      if (min[j] > v[i][j]) {
        min[j] = v[i][j];
      }
      if (max[j] < v[i][j]) {
        max[j] = v[i][j];
      }
    }
  }
  return {
     min: min,
     max: max,
  }
}

/*
 * @description
 * @params
 * @return
 */
function array_as_vector_range(v, vl) {
  var n = v.length / vl;
  var min, max;
  if (n === 0) {
    return null;
  } else {
    min = v.slice(0, vl);
    max = v.slice(0, vl);
  }
  for (var i = 1; i < n; ++i) {
    for (var j = 0; j < vl; ++j) {
      if (min[j] > v[i * vl + j]) {
        min[j] = v[i * vl + j];
      }
      if (max[j] < v[i * vl + j]) {
        max[j] = v[i * vl + j];
      }
    }
  }
  return {
    min: min,
    max: max,
  }
}
