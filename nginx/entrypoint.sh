#!/bin/sh

set -e

# pm2-docker --max-memory-restart 300M --deep-monitoring start "npm start" & nginx


pm2-runtime ecosystem.config.js & nginx
