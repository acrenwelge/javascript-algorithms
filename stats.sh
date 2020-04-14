#!/bin/bash

# run this to find how long it took me to complete each challenge
find easy medium hard -not -type d | xargs tail -1 | grep // -B 1
