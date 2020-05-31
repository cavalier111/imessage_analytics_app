import numpy as np
import pandas as pd
from collections import Counter
import nltk
from nltk.corpus import stopwords
import os
import re


def getTextFrequencyDictForText(sentence):
    stop_words = getStopWords();
    fullTermsDict = Counter(sentence.lower().split())
    returnDict = {}
    for key, value in fullTermsDict.items():
        if key in stop_words:
            continue
        else:
            returnDict[key] = value
    return returnDict

def getStopWords():
    alphaNumeric = lambda ini_string: re.sub('[\W_]+', '', ini_string)
    module_dir = os.path.dirname(__file__)   #get current directory
    file_path = os.path.join(module_dir, 'terrier-stop.txt') 
    stop_words_punctuation=set(stopwords.words("english")) | set(open(file_path, "r").read().split())
    stop_words = set()
    for word in stop_words_punctuation:
        stop_words.add(alphaNumeric(word))
    extra_stop_words = {"a","the","an","the","to","in","for","of","or","by","with","is","on","that","be","was","this","it","said","from","have","get","yea",
                       "gonna", "going", "ok"}
    stop_words |= extra_stop_words
    return stop_words
