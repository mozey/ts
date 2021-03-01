package main

import (
	"fmt"
	"github.com/julienschmidt/httprouter"
	"github.com/rs/cors"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

var dir string
var port string

func stub(w http.ResponseWriter, r *http.Request) {
	elem := []string{dir}
	elem = append(elem, "api")
	elem = append(elem, strings.Split(r.URL.Path, "/")...)
	elem = append(elem, fmt.Sprintf("%s.json", r.Method))
	http.ServeFile(w, r, filepath.Join(elem...))
}

func main() {
	dir = os.Getenv("APP_DIR")
	if dir == "" {
		log.Fatal("invalid APP_DIR")
	}
	port = os.Getenv("APP_PORT")
	if dir == "" {
		log.Fatal("invalid APP_PORT")
	}

	// Routes...................................................................
	var srv http.Server
	router := httprouter.New()

	// search
	router.HandlerFunc("GET", "/search/products", stub)

	// src
	router.Handler("GET", "/src/",
		// Explanation of StripPrefix here
		// https://stackoverflow.com/a/27946132/639133
		http.StripPrefix("/src/",
			http.FileServer(http.Dir(filepath.Join(dir, "src")))))

	// static
	router.Handler("GET", "/",
		http.FileServer(http.Dir(filepath.Join(dir, "static"))))

	// stripe
	router.HandlerFunc("GET", "/stripe/v1/products", stub)
	router.HandlerFunc("GET", "/stripe/v1/prices", stub)
	router.HandlerFunc("POST", "/stripe/v1/orders", stub)

	srv.Handler = router

	// Middleware...............................................................

	// CORS
	srv.Handler = cors.Default().Handler(srv.Handler)

	// Start....................................................................
	srv.Addr = fmt.Sprintf("localhost:%s", port)
	log.Println(fmt.Sprintf("Listening on %s...", srv.Addr))
	err := srv.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}
