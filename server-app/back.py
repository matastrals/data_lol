import pandas as pd
import flask as fk

app = fk.Flask(__name__, static_url_path='/static')

df = pd.read_csv("lol.csv", index_col=0, sep=";")


@app.route("/role")
def pourcentOfRole():
    role_counts = df['Role'].value_counts()
    total_entries = len(df)
    role_percentages = (role_counts / total_entries) * 100
    role_percentages_rounded = role_percentages.round(1)
    role_percentages_formatted = role_percentages_rounded.apply(lambda x: f"{x:.1f}%")
    json_result = role_percentages_formatted.to_json(orient='index')
    return json_result


@app.route("/class")
def class_percentages():
    class_counts = df['Class'].value_counts()
    total_entries = len(df)
    class_percentages = (class_counts / total_entries) * 100
    class_percentages_rounded = class_percentages.round(1)
    class_percentages_formatted = class_percentages_rounded.apply(lambda x: f"{x:.1f}%")
    json_result = class_percentages_formatted.to_json(orient='index')
    return json_result

if __name__ == "__main__":
    app.run(debug=True)
