# app.py

import dash
import dash_core_components as dcc
import dash_html_components as html
from dash.dependencies import Input, Output
import pandas as pd

df = pd.read_csv(
    'https://gist.githubusercontent.com/chriddyp/'
    'c78bf172206ce24f77d6363a2d754b59/raw/'
    'c353e8ef842413cae56ae3920b8fd78468aa4cb2/'
    'usa-agricultural-exports-2011.csv')

def generate_table(dataframe, max_rows=10):
    return html.Table(
        # Header
        [html.Tr([html.Th(col) for col in dataframe.columns])] +

        # Body
        [html.Tr([
            html.Td(dataframe.iloc[i][col]) for col in dataframe.columns
        ]) for i in range(min(len(dataframe), max_rows))]
    )

def update_output_div(input_value):
    return 'You\'ve entered "{}"'.format(input_value)

app = dash.Dash()


app.layout = html.Div(children=[
    html.H1(children='Dash Exploratory'),
    dcc.Input(id='my-id', value='initial value', type='text'),
    html.Div(children=[
	    html.Label('Market'),
	    dcc.Dropdown(
	        options=[
	            {'label': 'New York City', 'value': 'NYC'},
	            {'label': 'Montreal', 'value': 'MTL'},
	            {'label': 'San Francisco', 'value': 'SF'}
	        ],
	        value=None,
	        multi=False
	    )
	]),

    dcc.Graph(
        id='example-graph',
        figure={
            'data': [
                {'x': [1, 2, 3], 'y': [4, 1, 2], 'type': 'bar', 'name': 'SF'},
                {'x': [1, 2, 3], 'y': [2, 4, 5], 'type': 'bar', 'name': 'Montreal'},
            ],
            'layout': {
                'title': 'Dash Data Visualization'
            }
        }
    ),

    html.H4(children='US Agriculture Exports (2011)'),
    generate_table(df)
])


app.css.append_css({"external_url": "https://codepen.io/chriddyp/pen/bWLwgP.css"})

if __name__=="__main__":
    app.run_server(debug = True, port = 8080, host = '0.0.0.0')