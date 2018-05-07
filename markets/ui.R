#
# This is a Shiny web application. You can run the application by clicking
# the 'Run App' button above.
#
# Find out more about building applications with Shiny here:
#
#    http://shiny.rstudio.com/
#

library(dygraphs)
lungDeaths <- cbind(mdeaths, fdeaths)
dygraph(lungDeaths)

# Define UI for application that draws a histogram
ui <- fluidPage(theme = shinytheme("simplex"),
   
   # Application title
   titlePanel("Dashboard Boilerplate"),
   tabsetPanel(
      tabPanel("Timeseries", 
         dygraphOutput("dygraph"),
         
         dygraph(lungDeaths) %>% 
            dyOptions(stackedGraph = TRUE) %>%
            dyRangeSelector()
      ),
      tabPanel("Plot", 
         sidebarLayout(
            sidebarPanel(
               sliderInput("bins",
                           "Number of bins:",
                           min = 1,
                           max = 50,
                           value = 30)
            ),
            
            # Show a plot of the generated distribution
            mainPanel(
               plotOutput("distPlot")
            )
         )


      ),
      tabPanel("Summary", verbatimTextOutput("summary")),
      tabPanel("Table", tableOutput("table"))
   )
   
   # Sidebar with a slider input for number of bins 
   
)