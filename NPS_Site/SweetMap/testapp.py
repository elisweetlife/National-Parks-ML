from flask import Flask, request, url_for, redirect
from flask import render_template
from flask import jsonify
import pandas as pd
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors
from fuzzywuzzy import fuzz
from scipy.sparse import csr_matrix

df_parks = pd.read_csv("resources/nationalparks.csv")
df_ratings = pd.read_csv('resources/parkRatings.csv')

park_user_mat = df_ratings.pivot(
    index='nationalpark_id',
    columns='user_id',
    values='rating').fillna(0)


        #map movie titles to images
parks_to_idx = {
    parks: i for i, parks in 
    enumerate(list(df_parks.set_index('nationalpark_id').loc[park_user_mat.index].park_name))
}


park_user_mat_sparse = csr_matrix(park_user_mat.values)

        # define model
model_knn = NearestNeighbors(metric='cosine', algorithm='brute', n_neighbors=20, n_jobs=-1)
        # fit
model_knn.fit(park_user_mat_sparse)   

def make_recommendation(model_knn, data, mapper, fav_parks, n_recommendations):
    """
    return top n similar parks recommendations based on user's input park


    Parameters
    ----------
    model_knn: sklearn model, knn model

    data: park-user matrix

    mapper: dict, map park name to index of the park in data

    fav_parks: str, name of user input park

    n_recommendations: int, top n recommendations

    Return
    ------
    list of top n similar park recommendations
    """
    # fit
    model_knn.fit(data)
    # get input park index
    #print('You have input movie:', fav_parks)
    idx = fuzzy_matching(mapper, fav_parks, verbose=True)
    
    #print('Recommendation system start to make inference')
    #print('......\n')
    distances, indices = model_knn.kneighbors(data[idx], n_neighbors=n_recommendations+1)
    
    raw_recommends = \
        sorted(list(zip(indices.squeeze().tolist(), distances.squeeze().tolist())), key=lambda x: x[1])[:0:-1]
    # get reverse mapper
    reverse_mapper = {v: k for k, v in mapper.items()}
    # print recommendations
    allrecs = []
    for i, (idx, dist) in enumerate(raw_recommends):
        allrecs.append([reverse_mapper[idx], dist])
    return allrecs



def fuzzy_matching(mapper, fav_parks, verbose=True):
    """
    return the closest match via fuzzy ratio. 
    
    Parameters
    ----------    
    mapper: dict, map park name to index of the park in data

    fav_parks: str, name of user input park
    
    verbose: bool, print log if True

    Return
    ------
    index of the closest match
    """
    match_tuple = []
    # get match
    for title, idx in mapper.items():
        ratio = fuzz.ratio(title.lower(), fav_parks.lower())
        if ratio >= 100:
            match_tuple.append((title, idx, ratio))
    # sort
    match_tuple = sorted(match_tuple, key=lambda x: x[2])[::-1]
    if not match_tuple:
        #print('Oops! No match is found')
        return
    if verbose:
        #print('Found possible matches in our database: {0}\n'.format([x[0] for x in match_tuple]))
        return match_tuple[0][1]
def precise(x):
    Number = x
    return Number.parseFloat(x).toPrecision(3)

 


app = Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html') 
@app.route('/index.html')
def homepage():
    return render_template('index.html')
@app.route('/map.html')
def map():
    return  render_template('map.html')
@app.route('/landscape')
def landscape():
    return render_template('landscape.html')
@app.route('/landscape-beach.html')
def beach():
    return render_template('landscape-beach.html')
@app.route('/landscape-desert.html')
def desert():
    return render_template('landscape-desert.html')
@app.route('/landscape-forest.html')
def forest():
    return render_template('landscape-forest.html')
@app.route('/landscape-mountain.html')
def mountain():
    return render_template('landscape-mountain.html')
@app.route('/climate')
def climate():
    return render_template('climate.html')
@app.route('/climate-hot.html')
def hot():
    return render_template('climate-hot.html')
@app.route('/climate-cold.html')
def cold():
    return render_template('climate-cold.html')
@app.route('/climate-rain.html')
def rain():
    return render_template('climate-rain.html')
@app.route('/climate-snow.html')
def snow():
    return render_template('climate-snow.html')
@app.route('/activities')
def activities():
    return render_template('activity.html')
@app.route('/activity-extreme.html')
def extreme():
    return render_template('activity-extreme.html')
@app.route('/activity-land.html')
def land():
    return render_template('activity-land.html')
@app.route('/activity-leisure.html')
def leisure():
    return render_template('activity-leisure.html')
@app.route('/activity-water.html')
def water():
    return render_template('activity-water.html')
@app.route('/data.html')
def data():
    return render_template('data.html')
@app.route('/comparison.html')
def comparison():
    return render_template('comparison.html')
@app.route('/recommendation.html')
def recommendation():
    return render_template('recommendation.html')



@app.route('/recommended',methods=['GET', 'POST'])
def recommendedparks():
    if request.method == "POST":
        park = request.form.get("parks", None)
        if park !=None:
            parks = park
            output = make_recommendation(
                model_knn=model_knn,
                data=park_user_mat_sparse,
                fav_parks=park,
                mapper=parks_to_idx,
                n_recommendations = 10)
            for i in output: 
                url = df_parks.loc[df_parks['park_name']== i[0]]
                url2 = url.url.to_string().split()[1]
                i.append(url2)
                #i[1] = float(i[1])
                i[1] = round(i[1], 3)
                i[1] = i[1] * 100
                i[1] = round(i[1], 2)
                fullname = df_parks.loc[df_parks['park_name']== i[0]]
                i[0] = ' '.join(fullname.fullName.to_string().split()[1:])
                
                
                
                
            return render_template("map2.html", output = output, parks = parks)
    return render_template('map.html')
 

if __name__ == '__main__':
    app.run(debug=True)
