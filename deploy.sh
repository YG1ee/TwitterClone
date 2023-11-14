#!/bin/bash

npm run build && zip chil -r .next && scp chil.zip ora:~/twitter

