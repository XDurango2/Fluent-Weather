import requests
import json
from pathlib import Path

def test_weekly_forecast():
    """Test the weekly forecast endpoint"""
    try:
        # Make the API request
        response = requests.get('http://localhost:5000/api/weather/week?city=London')
        
        # Check if request was successful
        response.raise_for_status()
        
        # Get the JSON data
        data = response.json()
        
        # Save response to file
        output_path = Path('weather_data_week.json')
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4)
            
        print(f"Status code: {response.status_code}")
        print(f"Data saved to {output_path.absolute()}")
        
        return data
        
    except requests.RequestException as e:
        print(f"Error making request: {e}")
        print(f"URL attempted: {e.request.url}")  # Added for debugging
    except json.JSONDecodeError as e:
        print(f"Error decoding response: {e}")
    except IOError as e:
        print(f"Error saving file: {e}")

if __name__ == "__main__":
    test_weekly_forecast()