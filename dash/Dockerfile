FROM fnndsc/ubuntu-python3
COPY requirements.txt /app/requirements.txt
WORKDIR /app
RUN mkdir /out
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . /app

CMD ["/app/app.py"]