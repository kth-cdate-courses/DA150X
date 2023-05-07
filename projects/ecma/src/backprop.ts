/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2014, Erick Lavoie, Faiz Khan, Sujay Kathrotia, Vincent
 * Foley-Bourgon, Laurie Hendren
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { commonRandomJS } from "./lud.js"

/*** The squashing function.  Currently, it's a sigmoid. ***/
Math.random = () => commonRandomJS.next().value

function squash(x: number) {
  return 1.0 / (1.0 + Math.exp(-x))
}

type Net = ReturnType<typeof bpnn_internal_create>

function bpnn_internal_create(n_in: number, n_hidden: number, n_out: number) {
  //var newnet = Object.create(BPNN);

  return {
    input_n: n_in,
    hidden_n: n_hidden,
    output_n: n_out,
    input_units: new Float64Array(n_in + 1),
    hidden_units: new Float64Array(n_hidden + 1),
    output_units: new Float64Array(n_out + 1),
    hidden_delta: new Float64Array(n_hidden + 1),
    output_delta: new Float64Array(n_out + 1),
    target: new Float64Array(n_out + 1),
    input_weights: new Float64Array((n_in + 1) * (n_hidden + 1)),
    hidden_weights: new Float64Array((n_hidden + 1) * (1 + n_out)),
    input_prev_weights: new Float64Array((n_in + 1) * (n_hidden + 1)),
    hidden_prev_weights: new Float64Array((n_hidden + 1) * (1 + n_out)),
  }
}

function bpnn_randomize_array(w: Float64Array, m: number, n: number) {
  var i = 0,
    l = (m + 1) * (n + 1)

  for (i = 0; i < l; i++) {
    w[i] = Math.random()
  }
}

function loadInput(w: Float64Array, m: number, n: number) {
  var i = 1,
    l = (m + 1) * (n + 1)

  for (i = 1; i < l; i++) {
    w[i] = Math.random()
  }
}

function bpnn_randomize_row(w: Float64Array, m: number) {
  for (var i = 0; i <= m; i++) {
    w[i] = 0.1
  }
}

function bpnn_create(n_in: number, n_hidden: number, n_out: number) {
  var newnet = bpnn_internal_create(n_in, n_hidden, n_out)

  bpnn_randomize_array(newnet.input_weights, n_in, n_hidden)
  bpnn_randomize_array(newnet.hidden_weights, n_hidden, n_out)
  bpnn_randomize_row(newnet.target, n_out)

  // Load input image with random values
  loadInput(newnet.input_units, n_in, 1)

  return newnet
}

function bpnn_train_kernel(net: Net) {
  var inp, hid, out
  var out_err, hid_err

  inp = net.input_n
  hid = net.hidden_n
  out = net.output_n

  bpnn_layerforward(
    net.input_units,
    net.hidden_units,
    net.input_weights,
    inp,
    hid
  )
  bpnn_layerforward(
    net.hidden_units,
    net.output_units,
    net.hidden_weights,
    hid,
    out
  )

  out_err = bpnn_output_error(
    net.output_delta,
    net.target,
    net.output_units,
    out
  )
  hid_err = bpnn_hidden_error(
    net.hidden_delta,
    hid,
    net.output_delta,
    out,
    net.hidden_weights,
    net.hidden_units
  )

  bpnn_adjust_weights(
    net.output_delta,
    out,
    net.hidden_units,
    hid,
    net.hidden_weights,
    net.hidden_prev_weights
  )
  bpnn_adjust_weights(
    net.hidden_delta,
    hid,
    net.input_units,
    inp,
    net.input_weights,
    net.input_prev_weights
  )
}

function bpnn_layerforward(
  l1: Float64Array,
  l2: Float64Array,
  conn: Float64Array,
  n1: number,
  n2: number
) {
  var sum
  var j, k

  var nc = n2 + 1,
    nr = n1 + 1

  /*** Set up thresholding unit ***/
  l1[0] = 1.0
  /*** For each unit in second layer ***/
  for (j = 1; j < nc; j++) {
    /*** Compute weighted sum of its inputs ***/
    sum = 0.0
    for (k = 0; k < nr; k++) {
      sum += conn[k * nc + j] * l1[k]
    }
    l2[j] = squash(sum)
  }
}

//extern "C"
function bpnn_output_error(
  delta: Float64Array,
  target: Float64Array,
  output: Float64Array,
  nj: number
) {
  var o, t, errsum
  errsum = 0.0
  for (var j = 1; j <= nj; j++) {
    o = output[j]
    t = target[j]
    delta[j] = o * (1.0 - o) * (t - o)
    errsum += Math.abs(delta[j])
  }
  return errsum
}

function bpnn_hidden_error(
  delta_h: Float64Array,
  nh: number,
  delta_o: Float64Array,
  no: number,
  who: Float64Array,
  hidden: Float64Array
) {
  var j, k
  var h, sum, errsum

  var nr = nh + 1,
    nc = no + 1

  errsum = 0.0
  for (j = 1; j < nr; j++) {
    h = hidden[j]
    sum = 0.0
    for (k = 1; k < nc; k++) {
      sum += delta_o[k] * who[j * no + k]
    }
    delta_h[j] = h * (1.0 - h) * sum
    errsum += Math.abs(delta_h[j])
  }
  return errsum
}

function bpnn_adjust_weights(
  delta: Float64Array,
  ndelta: number,
  ly: Float64Array,
  nly: number,
  w: Float64Array,
  oldw: Float64Array
) {
  var new_dw
  var k, j
  var nr = nly + 1,
    nc = ndelta + 1
  ly[0] = 1.0
  for (j = 1; j < nc; j++) {
    for (k = 0; k < nr; k++) {
      new_dw = ETA * delta[j] * ly[k] + MOMENTUM * oldw[k * nc + j]
      w[k * nc + j] += new_dw
      oldw[k * nc + j] = new_dw
    }
  }
}

//var layer_size = 0;
var ETA = 0.3 //eta value
var MOMENTUM = 0.3 //momentum value

function backprop_face(layer_size: number) {
  var net
  var out_err, hid_err
  var time0, time1
  var expected_layer_size = 2850000
  var expected_sum_of_hidden_weights = 10.855641469359398
  var eps = 0.00001
  net = bpnn_create(layer_size, 16, 1) // (16, 1 can not be changed)
  //entering the training kernel, only one iteration
  time0 = performance.now()
  bpnn_train_kernel(net)
  time1 = performance.now()

  /* if (layer_size === expected_layer_size) {
    var sum_of_hidden_weights = 0
    for (var i = 1; i <= net.hidden_n; ++i) {
      for (var j = 1; j <= net.output_n; ++j) {
        sum_of_hidden_weights += net.hidden_weights[i * (net.output_n + 1) + j]
      }
    }
    if (
      !(
        expected_sum_of_hidden_weights - eps < sum_of_hidden_weights &&
        sum_of_hidden_weights < expected_sum_of_hidden_weights + eps
      )
    ) {
      throw new Error(
        "ERROR: expected a sum of hidden weights of '" +
          expected_sum_of_hidden_weights +
          "'" +
          " for an input size of '" +
          expected_layer_size +
          "'" +
          " but got '" +
          sum_of_hidden_weights +
          "' instead"
      )
    }
  } else {
    console.log(
      "WARNING: no self-checking for input size of '" + layer_size + "'"
    )
  } */

  //console.log("Output: " + net.output_units[1].toFixed(4) + "\t" + net.output_delta[1].toFixed(4));
  net = null
  /* console.log("Computation time: " + (time1 - time0) / 1000 + " s\n") */
  return time1 - time0
  /*   return {
    status: 1,
    options: "runBackProp(" + layer_size + ")",
    time: (time1 - time0) / 1000,
  } */
}

export function runBackProp(nb_input_elems: number) {
  return backprop_face(nb_input_elems)
}
