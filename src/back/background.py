from __future__ import print_function
import weatherapi
from weatherapi.rest import ApiException
from pprint import pprint
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
app = Flask(__name__)
CORS(app)  # Esto habilita CORS para todas las rutas
# Configure API key authorization: ApiKeyAuth
configuration = weatherapi.Configuration()
configuration.api_key['key'] = '3f4ab77a30fb43df8a2204047251004'
PEXELS_API_KEY = 'h2xOEdYr6EKVMiPDqIAbJxIxGeXvzyu8THF3fDWWPmCZqvGhNx7Q2AJT'

@app.route('/api/background', methods=['GET'])
def get_background():
    city = request.args.get('city', '')

    if not city:
        return jsonify({'error': 'Missing city parameter'}), 400

    url = 'https://api.pexels.com/v1/search'
    headers = {
        'Authorization': PEXELS_API_KEY
    }
    params = {
        'query': city,
        'per_page': 1
    }

    print(f"Buscando imagen de: {city}")

    response = requests.get(url, headers=headers, params=params)

    #print(f"Status code de Pexels: {response.status_code}")
    #print(f"Respuesta de Pexels: {response.text}")

    if response.status_code != 200:
        return jsonify({'error': 'Failed to fetch image'}), 500

    data = response.json()

    if data['photos']:
        image_url = data['photos'][0]['src']['landscape']
    else:
        image_url = 'https://source.unsplash.com/1600x900/?nature'
    
    #print(f"Imagen obtenida: {image_url}")
    
    return jsonify({'image_url': image_url})
@app.route('/api/weather', methods=['GET'])
def get_forecast():
    city = request.args.get('city', '')
    days = request.args.get('days', 1, type=int)
    api_instance=weatherapi.APIsApi(weatherapi.ApiClient(configuration))
    
    if not city:
        return jsonify({'error': 'Missing city parameter'}), 400

    try:
        api_response = api_instance.forecast_weather(city, days, alerts='yes', aqi='yes')
        # Guardar los datos en un archivo JSON
        with open("weather_data.json", "w") as json_file:
            json.dump(api_response, json_file, indent=4)
        return jsonify(api_response)
    except ApiException as e:
        return jsonify({'error': str(e)}), 500
@app.route('/api/weather/week', methods=['GET'])
def get_forecast_weekly():
    city = request.args.get('city', '')
    api_instance=weatherapi.APIsApi(weatherapi.ApiClient(configuration))
    if not city:
        return jsonify({'error': 'Missing city parameter'}), 400

    try:
        api_response = api_instance.forecast_weather(city, days=7, alerts="yes", aqi="yes")
        # Guardar los datos en un archivo JSON
        with open("weather_data.json", "w") as json_file:
            json.dump(api_response, json_file, indent=4)
        return jsonify(api_response)
    except ApiException as e:
        return jsonify({'error': str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True, port=5000)