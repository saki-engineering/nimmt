package main

import (
	"encoding/base64"
	"fmt"
	"os"
	"strings"

	"github.com/leaanthony/mewn"
	"github.com/wailsapp/wails"
)

func basic() string {
	return "World!"
}

type MyStruct struct {
	runtime *wails.Runtime
}

func (s *MyStruct) WailsInit(runtime *wails.Runtime) error {
	s.runtime = runtime
	fmt.Println("WailsInit is carried out.")

	runtime.Events.On("getImage", func(data ...interface{}) {
		fmt.Println("received getImage event")

		receivedData := ""
		for _, d := range data {
			if dd, ok := d.(string); ok {
				receivedData += string(dd)
			}
		}
		receivedDataArray := strings.Split(receivedData, ",")

		decoded, _ := base64.StdEncoding.DecodeString(receivedDataArray[1])
		file, _ := os.Create("encode_and_decord.png")
		defer file.Close()

		file.Write(decoded)
	})
	return nil
}

func main() {

	js := mewn.String("./frontend/build/static/js/main.js")
	css := mewn.String("./frontend/build/static/css/main.css")

	app := wails.CreateApp(&wails.AppConfig{
		Width:  1024,
		Height: 768,
		Title:  "nimmt",
		JS:     js,
		CSS:    css,
		Colour: "#131313",
	})

	item := &MyStruct{}
	app.Bind(basic)
	app.Bind(item)
	app.Run()
}
