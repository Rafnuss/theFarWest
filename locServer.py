import csv
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs

class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/locations" or self.path == "/locations.csv":
            self.send_response(200)
            self.send_header('Content-type', 'text/csv')
            self.end_headers()
            with open('locations.csv', 'rb') as f:
                self.wfile.write(f.read())
        else:
            self.send_response(404)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(b'404 Not Found')

    def do_POST(self):
        if self.path == "/":
            print("here")
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')
            data = post_data.strip().split(',')
            if len(data) == 3:
                timestamp, latitude, longitude = data
                with open('locations.csv', 'a', newline='') as f:
                    writer = csv.writer(f)
                    writer.writerow([timestamp, latitude, longitude])
                self.send_response(200)
                self.send_header('Content-type', 'text/plain')
                self.end_headers()
                self.wfile.write(b'OK')
                return
        self.send_response(400)
        self.send_header('Content-type', 'text/plain')
        self.end_headers()
        self.wfile.write(b'Bad Request')

def run():
    print('Starting server...')
    server_address = ('', 8080)
    httpd = HTTPServer(server_address, RequestHandler)
    print('Server started!')
    httpd.serve_forever()

if __name__ == '__main__':
    run()