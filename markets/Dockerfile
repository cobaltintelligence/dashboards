FROM rocker/shiny
MAINTAINER Yuan Wang
ENV http_proxy “”
ENV https_proxy “”
WORKDIR /app
COPY install_packages.R /app/install_packages.R
RUN mkdir /out
RUN Rscript /app/install_packages.R
COPY . /app
RUN Rscript app.R
EXPOSE 3838