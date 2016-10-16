@echo off
title Launching server
start "" http://localhost:3000/
cd C:\Users\Alexandre\Documents\GitHub\bomber_glyphe
set DEBUG=myapp:* & npm start

