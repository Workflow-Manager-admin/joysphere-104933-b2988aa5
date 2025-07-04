#!/bin/bash
cd /home/kavia/workspace/code-generation/joysphere-104933-b2988aa5/funbase_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

