#ifndef LUD_H
#define LUD_H

#include <stdio.h>
#include <unistd.h>
#include <getopt.h>
#include <stdlib.h>
#include <assert.h>
#include "common.h"

static int do_verify = 0;

extern void lud_base(double *m, int matrix_dim);

// Function signatures
int lud(int matrix_dim_arg);

#endif
