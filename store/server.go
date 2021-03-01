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

// NotFound serves static files if the path matches, or 404 if not.
// Using this approach instead of `router.ServeFiles` to get the path right
func notFound(w http.ResponseWriter, r *http.Request) {
	p := r.URL.Path
	parts := strings.Split(p, "/")
	switch parts[1] {
	case "src":
		http.ServeFile(w, r, filepath.Join(parts...))
		return
	default:
		parts = append([]string{"static"}, parts...)
		http.ServeFile(w, r, filepath.Join(parts...))
		return
	}
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

	// stripe
	router.HandlerFunc("GET", "/stripe/v1/products", stub)
	router.HandlerFunc("GET", "/stripe/v1/prices", stub)
	router.HandlerFunc("POST", "/stripe/v1/orders", stub)

	// Static content
	router.NotFound = http.HandlerFunc(notFound)

	// Middleware...............................................................

	// CORS
	srv.Handler = cors.Default().Handler(srv.Handler)

	// Start....................................................................
	srv.Handler = router
	srv.Addr = fmt.Sprintf("localhost:%s", port)
	log.Println(fmt.Sprintf("Listening on %s...", srv.Addr))
	err := srv.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}
