import pyrebase

config = {
  "apiKey": "AIzaSyB850NRNu_ogKZd0uW5WZKMH6fQV9TwTNM",
  "authDomain": "data-visualization-e51bf.firebaseapp.com",
  "databaseURL": "",
  "projectId": "data-visualization-e51bf",
  "storageBucket": "data-visualization-e51bf.appspot.com",
  "messagingSenderId": "70203839271",
  "appId": "1:70203839271:web:2d1144d9a15637f0784f02",
  "measurementId": "G-RH79CW07D6"
}

firebase = pyrebase.initialize_app(config)
storage = firebase.storage()