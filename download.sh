#!/bin/sh

WGET='wget -nH -rLA '''*.html''' -P hasgluten.github.io'
HOST="http://127.0.0.1:3000"
PAGES="index.html about.html support.html"
LANGS="it fr de es"

for p in $PAGES; do
    $WGET "$HOST/$p"
    for l in $LANGS; do
        $WGET "$HOST/$l/$p"
    done
done
