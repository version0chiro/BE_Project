from flask import Flask, jsonify, make_response
from sklearn.feature_extraction.text import TfidfVectorizer
from functools import reduce
from operator import add
import pandas as pd
import numpy as np
import re
import spacy
import json

app = Flask(__name__)
series = pd.read_csv('./tokenized_text.csv',
                     header=None, index_col=0, squeeze=True)
tokenized_text = series.to_list()
tokenized_text.pop(0)

recipes = pd.read_csv('./tagged_recipes_df.csv')
recipes = recipes.drop(['Unnamed: 0'], axis=1)


def qweight_array(query_length, qw_array=[1]):
    '''Returns descending weights for ranked query ingredients'''
    if query_length > 1:
        to_split = qw_array.pop()
        split = to_split/2
        qw_array.extend([split, split])
        return qweight_array(query_length - 1, qw_array)
    else:
        return np.array(qw_array)


def ranked_query(query):
    '''Called if query ingredients are ranked in order of importance.
    Weights and adds each ranked query ingredient vector.'''
    query = [[q] for q in query]      # place words in seperate documents
    q_vecs = [vectorizer.transform(q) for q in query]
    qw_array = qweight_array(len(query), [1])
    q_weighted_vecs = q_vecs * qw_array
    q_final_vector = reduce(np.add, q_weighted_vecs)
    return q_final_vector


def overall_scores(query_vector):
    '''Calculates Query Similarity Scores against recipe title, instructions, and keywords.
    Then returns weighted averages of similarities for each recipe.'''
    final_scores = title_tfidf*query_vector.T*w_title
    final_scores += text_tfidf*query_vector.T*w_text
    final_scores += tags_tfidf*query_vector.T*w_categories
    return final_scores


def print_recipes(index, query, recipe_range):
    '''Prints recipes according to query similary ranks'''
    ans = ""
    print('Search Query: {}\n'.format(query))
    for i, index in enumerate(index, recipe_range[0]):
        ans += str(recipes.loc[index, 'title']) + ' ^^^^ \n' + str(recipes.loc[index, 'ingredient_text']
                                                                   
                                                                   ) + '^^^^ \n ' + str(recipes.loc[index, 'instructions'])+" |---|||||---| "
        print('Recipe Rank: {}\t'.format(i+1),
              recipes.loc[index, 'title'], '\n')
        print('Ingredients:\n{}\n '.format(
            recipes.loc[index, 'ingredient_text']))
        print('Instructions:\n{}\n'.format(recipes.loc[index, 'instructions']))
    return ans


def Search_Recipes(query, query_ranked=False, recipe_range=(0, 5)):
    '''Master Recipe Search Function'''
    if query_ranked == True:
        q_vector = ranked_query(query)
    else:
        q_vector = vectorizer.transform([' '.join(query)])
    recipe_scores = overall_scores(q_vector)
    sorted_index = pd.Series(recipe_scores.toarray().T[0]).sort_values(
        ascending=False)[recipe_range[0]:recipe_range[1]].index
    return print_recipes(sorted_index, query, recipe_range)


# Creating TF-IDF Matrices and recalling text dependencies

'''import text_tokenized.csv here'''
# print (df)
# TF-IDF vectorizer instance
vectorizer = TfidfVectorizer(lowercase=True,
                             ngram_range=(1, 1))

text_tfidf = vectorizer.fit_transform(tokenized_text)
title_tfidf = vectorizer.transform(recipes['title'])
# text_tfidf    <== Variable with recipe ingredients and instructions
tags_tfidf = vectorizer.transform(recipes['tags'].values.astype('U'))
# recipes   <== DataFrame; For indexing and printing recipes

# Query Similarity Weights
w_title = .2
w_text = .3
w_categories = .5


@app.route('/<items>')
def home(items):
    query = items.split('&&')
    return make_response(jsonify({
        "ans": str(Search_Recipes(query, query_ranked=True, recipe_range=(0, 3)))
    }), 200)

    # return "Home"


if __name__ == '__main__':
    app.run(debug=True)
