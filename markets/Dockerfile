FROM rocker/shiny:latest

MAINTAINER Yuan Wang
# ENV http_proxy “”
# ENV https_proxy “”

RUN apt-get update && apt-get install -y \
    sudo \
    gdebi-core \
    pandoc \
    pandoc-citeproc \
    libcurl4-gnutls-dev \
    libcairo2-dev/unstable \
    libxt-dev \
    libssl-dev \
    gsl-bin \
    libgsl0-dev

# RUN mkdir /out

COPY shiny-server.conf  /etc/shiny-server/shiny-server.conf

COPY install_packages.R /srv/shiny-server/install_packages.R

RUN Rscript /srv/shiny-server/install_packages.R

COPY ./ /srv/shiny-server/

EXPOSE 80

COPY shiny-server.sh /usr/bin/shiny-server.sh

# RUN ls /usr/bin
CMD ['/usr/bin/shiny-server.sh']
# CMD ['/srv/shiny-server/shiny-server.sh']

# Download and install shiny server
# RUN wget --no-verbose https://s3.amazonaws.com/rstudio-shiny-server-os-build/ubuntu-12.04/x86_64/VERSION -O "version.txt" && \
#     VERSION=$(cat version.txt)  && \
#     wget --no-verbose "https://s3.amazonaws.com/rstudio-shiny-server-os-build/ubuntu-12.04/x86_64/shiny-server-$VERSION-amd64.deb" -O ss-latest.deb && \
#     gdebi -n ss-latest.deb && \
#     rm -f version.txt ss-latest.deb

# RUN sudo apt-get -y install default-jdk
# RUN r CMD javareconf
# RUN sudo apt-get -y install r-cran-rjava

# WORKDIR /app
# RUN sudo apt-get -y install r-cran-rmysql
# RUN sudo apt-get -y install libmysqlclient-dev
# RUN sudo apt-get install -y libxml2-dev libcurl4-openssl-dev

# COPY . /app
# RUN Rscript app.R
# EXPOSE 3838