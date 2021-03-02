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

func index(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, filepath.Join(dir, "index.html"))
}

func stub(w http.ResponseWriter, r *http.Request) {
	elem := []string{dir}
	elem = append(elem, "static")
	elem = append(elem, "stubs")
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

	// index
	router.HandlerFunc("GET", "/", index)
	router.HandlerFunc("GET", "/index.html", index)

	// search
	router.HandlerFunc("GET", "/search/products", stub)

	// stripe
	router.HandlerFunc("GET", "/stripe/v1/products", stub)
	router.HandlerFunc("GET", "/stripe/v1/prices", stub)
	router.HandlerFunc("POST", "/stripe/v1/orders", stub)

	// Static content
	//router.NotFound = http.HandlerFunc(notFound)
	router.ServeFiles("/static/*filepath", http.Dir("static"))

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
