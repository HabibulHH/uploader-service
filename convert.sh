#!/bin/bash

# Get the input file path from the first argument
INPUT_FILE="$1"

# Create the output directory path by appending to the input file path (without extension)
OUTPUT_DIR="${INPUT_FILE%.*}"

# Create the output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Now run FFmpeg command with corrected DASH paths
ffmpeg -i "$INPUT_FILE" \
    -c:v libx264 -c:a aac \
    -b:v 2500k -b:a 128k \
    -f dash \
    -init_seg_name "init-stream\$RepresentationID\$.m4s" \
    -media_seg_name "chunk-stream\$RepresentationID\$-\$Number%05d\$.m4s" \
    -adaptation_sets "id=0,streams=v id=1,streams=a" \
    "$OUTPUT_DIR/manifest.mpd"

# Check if the conversion was successful
if [ $? -eq 0 ]; then
    echo "Conversion completed successfully"
    exit 0
else
    echo "Conversion failed!"
    exit 1
fi
