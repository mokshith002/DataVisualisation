# DataVisualisation

## To run the code

<br>

### First clone the repository using <br>
    git clone https://github.com/mokshith002/DataVisualisation.git 
<br>

<!-- <details> -->
### Running React app
<br>
Go to the terminal or the command line and navigate to the project directory. Once there run the following

```
npm install

npm start
```

<br> 

### Running the Flask app
<ol>
<br>
<li>
Once you are in the project directory, navigate to the backend 

```
cd backend
```
</li>
<br>
<li>
To install the required dependencies, it is recommended to use a virtual environment. See below on how to create and run a virtual environment

<details open>
<summary>For Windows</summary>
<pre>
# Creating the virtual env. 
py -3 -m venv .venv<br>
# Running the virtual env.
.venv/Scripts/activate
</pre>
</details>


<details>
<summary>For Linux</summary>
<pre>
# Creating the virtual env. 
python3 -m venv .venv<br>
# Running the virtual env.
source .venv/bin/activate
</pre>
</details>
</li>
<br>
<li>

Once you have the virtual env ready, install all the required dependencies by

```
pip3 install -r requirements.txt
```
</li>

<br>

<li>
Finally, to the sart the flask app run 

```
flask run
```
</li>


</ol>



