const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number(process.argv[2] || 4177);
const root = path.resolve(__dirname);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg"
};

http.createServer((request, response) => {
  let pathname = decodeURIComponent((request.url || "/").split("?")[0]);
  if (pathname === "/") pathname = "/index.html";

  const filePath = path.resolve(root, `.${pathname}`);
  const relativePath = path.relative(root, filePath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": types[path.extname(filePath)] || "text/plain; charset=utf-8"
    });
    response.end(data);
  });
}).listen(port, "127.0.0.1", () => {
  console.log(`TravelSync aberto em http://127.0.0.1:${port}/index.html`);
});
