import numpy as np
import pandas as pd
from collections import Counter
import nltk
from nltk.corpus import stopwords
import os
import re


def getTextFrequencyDictForText(texts):
    stop_words = getStopWords()
    alphaNumeric = lambda ini_string: re.sub('[\W_]+', '', ini_string)
    wordsList = []
    for text in texts:
        wordsList += [alphaNumeric(word).lower() for word in text['text'].split()]
    # for word in genExample():
    #     wordsList.append(alphaNumeric(word).lower())
    wordsList.remove('')
    fullTermsDict = Counter(wordsList)
    frequencyList = []
    for key, value in fullTermsDict.items():
        if key in stop_words:
            continue
        else:
            frequencyList.append([key,value])
    print(texts, frequencyList)
    return frequencyList

def getStopWords():
    #get list stop words txt file
    module_dir = os.path.dirname(__file__)   #get current directory
    stop_words_file_path = os.path.join(module_dir, 'terrier-stop.txt') 

    #combine nltk stop wirds with extra stop words from text file
    stop_words_punctuation=set(stopwords.words("english")) | set(open(stop_words_file_path, "r").read().split())

    #replace stop words with alphanumeric version
    alphaNumeric = lambda ini_string: re.sub('[\W_]+', '', ini_string)
    stop_words = set()
    for word in stop_words_punctuation:
        stop_words.add(alphaNumeric(word))

    #join stop words with some more
    extra_stop_words = {"a","the","an","the","to","in","for","of","or","by","with","is","on","that","be","was","this","it","said","from","have","get","yea",
                       "gonna", "going", "ok"}
    stop_words |= extra_stop_words
    return stop_words





