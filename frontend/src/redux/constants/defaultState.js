export const defaultState = {
  freuquencyLists: {
    words: [],
    emojis: [],
    links: [],
  },
  unfilteredFreuquencyLists: {
    words: [],
    emojis: [],
    links: [],
  },
  wordcloudLayout: {
    words: null,
    emojis: null,
    links: null,
  },
  dataType: 'words',
  vizType: 'wordcloud',
  filters: {
    words: {
      startEnd: [1,1],
      maxEnd: 1,
      polarity: [-1,1],
      subjectivity:[0,1],
      stopWordsEnabled: true,
      stopWordsUser:[],
      stopWordsDefault:[]
    },
    emojis: {
      startEnd: [1,1],
      maxEnd: 1,
      polarity: [-1,1],
      subjectivity:[0,1],
    },
    links: {
      startEnd: [1,1],
      maxEnd: 1,
    }
  },
  styles : {
    words: {
      wordcloud: {
        colorCodedBy: 'none',
        color: 'rainbow',
        font: 'monospace',
      },
      bargraph: {
        colorCodedBy: 'none',
        color: '#007bff',
        font: 'monospace',
      },
    },
    emojis: {
      wordcloud: {
        colorCodedBy: 'none',
      },
      bargraph: {
        colorCodedBy: 'none',
        color: '#007bff',
      },
    },
    links: {
      wordcloud: {
        color: 'rainbow',
        font: 'monospace',
      },
      bargraph: {
        color: '#007bff',
        font: 'monospace',
      },
    }
  },
};