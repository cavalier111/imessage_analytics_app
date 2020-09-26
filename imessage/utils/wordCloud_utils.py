import numpy as np
import pandas as pd
from collections import Counter
import nltk
from nltk.corpus import stopwords
import os
import re
import emoji
from textblob import TextBlob


def getTextFrequencyDictForText(texts, isEmoji = False):
    stop_words = getStopWords()
    alphaNumeric = lambda ini_string: re.sub('[\W_]+', '', ini_string)
    wordsList = []
    if not isEmoji:
        for text in texts:
            wordsList += [removeEmoji(alphaNumeric(word).lower()) for word in text['text'].split()]
    else:
        for text in texts:
            wordsList += [char for char in text['text'] if char in emoji.UNICODE_EMOJI]
    if '' in wordsList: wordsList.remove('')
    fullTermsDict = Counter(wordsList)
    frequencyList = []
    for key, value in fullTermsDict.items():
        if key in stop_words:
            continue
        else:
            sentiment = TextBlob(key).sentiment
            frequencyList.append(dict({"text": key,"value": value, "subjectivity": sentiment[1], "polarity": sentiment[0]}))
    return sorted(frequencyList, key=lambda word: word["value"], reverse=True)

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

def removeEmoji(string):
    emoji_pattern = re.compile("["
                           u"\U0001F600-\U0001F64F"  # emoticons
                           u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                           u"\U0001F680-\U0001F6FF"  # transport & map symbols
                           u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                           u"\U00002702-\U000027B0"
                           u"\U000024C2-\U0001F251"
                           "]+", flags=re.UNICODE)
    return emoji_pattern.sub(r'', string)
