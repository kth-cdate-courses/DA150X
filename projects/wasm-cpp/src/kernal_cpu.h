#ifndef __KERNEL_CPU_H__
#define __KERNEL_CPU_H__

#include "./lavamd.h" // (in the main program folder)	needed to recognized input variables

#ifdef __cplusplus
extern "C"
{
#endif

	//========================================================================================================================================================================================================200
	//	KERNEL_CPU HEADER
	//========================================================================================================================================================================================================200

	void kernel_cpu(par_str par,
					dim_str dim,
					box_str *box,
					FOUR_VECTOR *rv,
					fp *qv,
					FOUR_VECTOR *fv);

#ifdef __cplusplus
}
#endif
#endif