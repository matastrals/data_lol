import pandas as pd
import flask as fk

app = fk(__name__, static_url_path='/static')


df = pd.read_csv("lol.csv", index_col=0, sep=";")
# print(df.head(10))

@app.route("/")


