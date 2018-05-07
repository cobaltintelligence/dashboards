# install_packages.R

packages <- c(
	'shiny',
	'shinythemes',
	'dygraphs'
)

hard_packages <- c(
	'dplyr', 
	'RMySQL',
	'RPostgreSQL'
)

install.packages(
	packages, 
	dependencies=TRUE, 
	repos = 'http://cran.rstudio.com/'
)