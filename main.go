package main

import (
	"fmt"
	"io/ioutil"
	"os"

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
		createScreenShotPNG(&data)

		createCardList(screenshotFilename)

		// Nはカードの枚数
		cardFilesInHand, _ := ioutil.ReadDir(cardInHandDir)
		N := len(cardFilesInHand)
		cardNumberList := make([]int, N)

		// ここから文字認識
		for i, cardfile := range cardFilesInHand {
			cardInHandFilename := cardInHandDir + "/" + cardfile.Name()
			cardInHandImage, _ := createImage(cardInHandFilename)
			cardInHandDest := getGrayScale(&cardInHandImage)

			cardNumberList[i] = getFileNumber(kNN(cardInHandDest))

			// 使ったresultファイルは削除
			os.Remove(cardInHandFilename)
		}

		os.Remove(screenshotFilename)

		fmt.Println(cardNumberList)
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
