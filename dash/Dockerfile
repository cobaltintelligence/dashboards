FROM python:3
COPY requirements.txt /app/requirements.txt
WORKDIR /app
RUN mkdir /out
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . /app

RUN python app.py