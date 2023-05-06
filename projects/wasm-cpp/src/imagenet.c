
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include "common_rand.h"
#include "imagenet.h"

void load(BPNN *net)
{
	float *units;
	int nr, nc, imgsize, i, j, k;

	nr = layer_size;

	imgsize = nr * nc;
	units = net->input_units;

	k = 1;
	for (i = 0; i < nr; i++)
	{
		units[k] = common_randJS();
		k++;
	}
}