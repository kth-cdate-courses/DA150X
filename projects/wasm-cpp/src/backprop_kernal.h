#ifndef _BACKPROP_KERNAL_H_
#define _BACKPROP_KERNAL_H_

#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <math.h>
#include <sys/time.h>

#include "backprop_a.h"

////////////////////////////////////////////////////////////////////////////////

extern void bpnn_layerforward(float *l1, float *l2, float **conn, int n1, int n2);

extern void bpnn_output_error(float *delta, float *target, float *output, int nj, float *err);

extern void bpnn_hidden_error(float *delta_h, int nh, float *delta_o, int no, float **who, float *hidden, float *err);

extern void bpnn_adjust_weights(float *delta, int ndelta, float *ly, int nly, float **w, float **oldw);

extern float **alloc_2d_dbl(int m, int n);

extern float squash(float x);

long long gettime();

void bpnn_train_kernel(BPNN *net, float *eo, float *eh);
#endif