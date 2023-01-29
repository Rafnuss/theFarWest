from http.server import BaseHTTPRequestHandler, HTTPServer

class webServerHandler(BaseHTTPRequestHandler):
	"""docstring for webserverHandler"""

	def do_GET(self):
		path = self.path
		print(path)
		return
	

port = 8080
server = HTTPServer(('', port), webServerHandler)
print ("Web Server running on port", port)
server.serve_forever()