# Define server logic required to draw a histogram

library(datasets)
library(dygraphs)

server <- function(input, output, session) {
   
  output$distPlot <- renderPlot({
    # generate bins based on input$bins from ui.R
    x    <- faithful[, 2] 
    bins <- seq(min(x), max(x), length.out = input$bins + 1)
    
    # draw the histogram with the specified number of bins
    hist(x, breaks = bins, col = 'darkgray', border = 'white')
  })

  predicted <- reactive({
    hw <- HoltWinters(ldeaths)
    predict(hw, n.ahead = input$months, 
            prediction.interval = TRUE,
            level = as.numeric(input$interval))
  })


	series = read.csv("out/ohlcv_binance_ETHUSDT.csv")
  series$ts = as.Date(as.POSIXct(series$ts / 1000, origin="1970-01-01"))

  print(head(series))

  lungDeaths <- cbind(mdeaths, fdeaths)

  output$dygraph <- renderDygraph({
  	dygraph(series, 
  		main = "Charts") %>%
      dySeries(c("open"), label = "Open") %>%
      dySeries(c("close"), label = "Close") %>%
      dySeries(c("ts"), label = "Timestamp") %>%
      dySeries(c("high"), label = "High") %>%
      dySeries(c("low"), label = "Low") %>%
      dySeries(c("volume"), label = "Volume") %>%
      # dyRoller(rollPeriod = 100) %>%
      # dyCandlestick() %>%
      dyOptions(
    		drawGrid = input$showgrid, 
    		stackedGraph = TRUE) %>%
      dyRangeSelector()
  })
}