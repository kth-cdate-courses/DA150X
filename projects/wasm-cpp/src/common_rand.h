#ifndef _COMMON_RAND_H_
#define _COMMON_RAND_H_

#include <stdlib.h>
#include <stdio.h>
#include <math.h>

#ifdef __cplusplus
extern "C"
{
#endif

#define MAXRND 0x7fffffff
	void common_srand(unsigned int seed);
	int common_rand();
	double common_randJS();
	double common_norm_rand();

#ifdef __cplusplus
}
#endif

#endif