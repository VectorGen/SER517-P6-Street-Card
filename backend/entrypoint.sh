#!/bin/bash

# Start Celery Workers
celery -A api worker -l info &

# Run backend server
python3 manage.py runserver 0.0.0.0:8000