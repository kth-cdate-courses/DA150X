

#ifndef imagenet_H
#define imagenet_H

#include "backprop_a.h"

#ifdef __cplusplus
extern "C"
{
#endif
	extern int layer_size;

	void load(BPNN *net);
#ifdef __cplusplus
}
#endif

#endif