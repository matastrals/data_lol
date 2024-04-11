import pandas as pd
import flask as fk, jsonify, requests
from flask_cors import CORS

app = fk.Flask(__name__, static_url_path='/static')
CORS(app)

df = pd.read_csv("./lol.csv", index_col=0, sep=";")


@app.route("/role")
def pourcent_role():
    role_counts = df['Role'].value_counts()
    total_entries = len(df)
    role_percentages = (role_counts / total_entries) * 100
    role_percentages_rounded = role_percentages.round(1)
    role_percentages_formatted = role_percentages_rounded.apply(lambda x: f"{x:.1f}%")
    return role_percentages_formatted.to_json()


@app.route("/class")
def class_percentages():
    class_counts = df['Class'].value_counts()
    total_entries = len(df)
    class_percentages = (class_counts / total_entries) * 100
    class_percentages_rounded = class_percentages.round(1)
    class_percentages_formatted = class_percentages_rounded.apply(lambda x: f"{x:.1f}%")
    return class_percentages_formatted.to_json()


@app.route("/role/tier/<role>")
def role_tier(role):
    top_roles = df[df['Role'] == role.upper()]
    tier_categories = pd.CategoricalDtype(categories=['God', 'S', 'A', 'B', 'C', 'D'], ordered=True)
    top_roles['Tier'] = top_roles['Tier'].astype(tier_categories)
    top_roles_sorted = top_roles.sort_values(by='Tier')
    names_tiers = top_roles_sorted[['Name', 'Tier']]
    return names_tiers.to_json(orient='records')


@app.route("/class/role")
def class_role_percentages():
    class_role_counts = df.groupby(['Class', 'Role']).size().reset_index(name='Count')
    class_counts = df['Class'].value_counts()
    total_entries = len(df)
    class_percentages = (class_counts / total_entries) * 100
    class_percentages_df = class_percentages.reset_index()
    class_percentages_df.columns = ['Class', 'Class Percentage']
    merged_df = pd.merge(class_role_counts, class_percentages_df, on='Class')
    merged_df['Role Percentage'] = (merged_df['Count'] / total_entries) * 100
    class_roles = merged_df.groupby('Class').apply(lambda x: [[role, round(percentage / x['Role Percentage'].sum() * 100, 1)] for role, percentage in zip(x['Role'], x['Role Percentage'])])
    class_role_percentages_formatted = class_roles.to_dict()
    return class_role_percentages_formatted


@app.route("/pickrate")
def pourcent_pickrate():
    df['Pick %'] = df['Pick %'].astype(str).str.rstrip('%').astype(float)
    moyenne_pickrate_df = df.groupby('Name')['Pick %'].mean().reset_index().round(2)
    moyenne_pickrate_df.rename(columns={'Pick %': 'Pick %'}, inplace=True)
    return moyenne_pickrate_df.to_json(orient='records')


@app.route("/pickrate/<role>")
def pourcent_pickrate_par_role(role):
    df['Pick %'] = df['Pick %'].astype(str).str.rstrip('%').astype(float)
    role_df = df[df['Role'] == role.upper()]
    return role_df[['Name', 'Pick %']].to_json(orient='records')


@app.route("/winrate")
def pourcent_winrate():
    df['Win %'] = df['Win %'].astype(str).str.rstrip('%').astype(float)
    sorted_df = df.sort_values(by='Name')
    names_win_percentage = sorted_df[['Name', 'Win %']]
    return names_win_percentage.to_json(orient='records')


@app.route("/winrate/role")
def winrate_by_role():
    df['Win %'] = df['Win %'].astype(str).str.rstrip('%').astype(float)
    winrate_percentages = df.groupby('Role')['Win %'].mean()
    winrate_percentages = winrate_percentages.apply(lambda x: f"{x:.2f}%")
    return winrate_percentages.to_json()

if __name__ == "__main__":
    app.run(debug=True)
