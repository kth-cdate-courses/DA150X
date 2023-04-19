## Prerequisites

- npm
- pnpm
- nrwl/nx [(https://nx.dev)](https://nx.dev)
- just https://github.com/casey/just

## Getting started

Install submodules:

1. Goto projects/emsdk
2. Run `git submodule update --init --recursive`
3. Run `./emsdk install latest`
4. Run `./emsdk activate latest`
5. Source emscc by following instructions in the console

## Running

0. Once per session run `just source`, copy the command and run it in your shell. This will link the emsdk to your shell.
1. Build system `just build`
2. Run `just start`

### Credits

Algorithms used in this project are derived from https://github.com/Sable/Ostrich
