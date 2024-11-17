#!/bin/bash

# Get the input file path from the first argument
INPUT_FILE="$1"

# Create the output directory path by appending to the input file path (without extension)
OUTPUT_DIR="${INPUT_FILE%.*}"

# Create the output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Now run the FFmpeg command with simpler parameters
ffmpeg -i "$INPUT_FILE" \
    -c:v libx264 -c:a aac \
    -b:v 2500k -b:a 128k \
    -hls_time 4 \
    -hls_playlist_type vod \
    -hls_segment_filename "$OUTPUT_DIR/segment_%03d.ts" \
    "$OUTPUT_DIR/playlist.m3u8"

# Check if the conversion was successful
if [ $? -eq 0 ]; then
    echo "Conversion completed successfully"
    exit 0
else
    echo "Conversion failed!"
    exit 1
fi

