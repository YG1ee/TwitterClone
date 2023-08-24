#!/bin/bash

npm run build && zip chil -r .next && scp chil.zip nav:~/twitter

